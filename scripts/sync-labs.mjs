#!/usr/bin/env node
/**
 * Pull completed CyberDefenders labs from the public profile API
 * and write data/labs.js for the GitHub Pages site.
 *
 *   node scripts/sync-labs.mjs
 *   CD_USERNAME=Afterguard node scripts/sync-labs.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const USERNAME = process.env.CD_USERNAME || 'Afterguard';
const ORIGIN = 'https://cyberdefenders.org';
const PAGE_SIZE = 100;
const UA = 'johannweingertner.github.io lab-sync (personal portfolio)';

const CATEGORY_ORDER = [
  'Network Forensics',
  'Endpoint Forensics',
  'Cloud Forensics',
  'Threat Hunting',
  'Threat Intel',
  'Detection Engineering',
];

function pickCategory(categories = []) {
  for (const wanted of CATEGORY_ORDER) {
    if (categories.includes(wanted)) return wanted;
  }
  return categories[0] || 'Threat Intel';
}

function titleDifficulty(value) {
  const raw = String(value || '').trim();
  if (!raw) return '';
  return raw.charAt(0).toUpperCase() + raw.slice(1).toLowerCase();
}

function completedDate(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return String(iso).slice(0, 10);
  return d.toISOString().slice(0, 10);
}

function achievementUrl(slug) {
  return `${ORIGIN}/blueteam-ctf-challenges/achievements/${USERNAME}/${slug}/`;
}

async function fetchPage(page) {
  const url = `${ORIGIN}/api/user/${encodeURIComponent(USERNAME)}/completed-challenges/?page=${page}&page_size=${PAGE_SIZE}`;
  const res = await fetch(url, {
    headers: { Accept: 'application/json', 'User-Agent': UA },
  });
  if (!res.ok) {
    throw new Error(`CyberDefenders ${res.status} ${res.statusText} for ${url}`);
  }
  return res.json();
}

async function fetchAll() {
  const first = await fetchPage(1);
  const rows = [...(first.data || [])];
  const totalPages = first.pagination?.total_pages || 1;
  for (let page = 2; page <= totalPages; page++) {
    const next = await fetchPage(page);
    rows.push(...(next.data || []));
  }
  return rows;
}

function toLab(row) {
  const slug = String(row.slug || '').trim();
  if (!slug) return null;
  return {
    name: String(row.name || slug).trim(),
    url: achievementUrl(slug),
    category: pickCategory(row.categories),
    difficulty: titleDifficulty(row.difficulty),
    completed: completedDate(row.completed_at),
  };
}

function jsString(value) {
  return JSON.stringify(String(value ?? ''));
}

function renderLabsJs(labs) {
  const lines = labs.map((lab) => {
    return `    { name: ${jsString(lab.name)}, url: ${jsString(lab.url)}, category: ${jsString(lab.category)}, difficulty: ${jsString(lab.difficulty)}, completed: ${jsString(lab.completed)} }`;
  });
  const stamp = new Date().toISOString();
  return `// ─────────────────────────────────────────────────────────────
//  labs.js  (generated — do not edit by hand)
//  Source: ${ORIGIN}/api/user/${USERNAME}/completed-challenges/
//  Synced: ${stamp}
//  ${labs.length} completed labs
// ─────────────────────────────────────────────────────────────

window.CD_LABS = [
${lines.join(',\n')}
];
`;
}

function bumpCacheQuery(htmlPath) {
  const stamp = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  let html = fs.readFileSync(htmlPath, 'utf8');
  const next = html.replace(/\/data\/labs\.js\?v=[^"']+/g, `/data/labs.js?v=${stamp}`);
  if (next === html) {
    console.warn('sync-labs: no labs.js cache query found in index.html');
    return false;
  }
  fs.writeFileSync(htmlPath, next);
  return true;
}

const rows = await fetchAll();
const labs = rows.map(toLab).filter(Boolean);
if (labs.length === 0) {
  console.error('sync-labs: API returned 0 labs — leaving data/labs.js unchanged');
  process.exit(1);
}

labs.sort((a, b) => String(b.completed).localeCompare(String(a.completed)) || a.name.localeCompare(b.name));

const outPath = path.join(root, 'data/labs.js');
fs.writeFileSync(outPath, renderLabsJs(labs));
const bumped = bumpCacheQuery(path.join(root, 'index.html'));
console.log(`sync-labs: wrote ${labs.length} labs to data/labs.js${bumped ? ' (cache query bumped)' : ''}`);
