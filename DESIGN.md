# Design tokens

Visual system for johannweingertner.github.io. Live values live in `assets/tokens.css`.

## Scene

Dark portfolio for cybersecurity / DFIR work. Restrained neutrals with a single red accent. Dense list layouts over card grids.

## Color

| Token | Role |
|-------|------|
| `--bg` / `--surface*` | Page and elevated surfaces |
| `--text` / `--text2` / `--muted` | Primary, secondary, tertiary text (`--muted` targets AA on `--bg`) |
| `--accent*` | Brand red, soft fills, borders, readable accent text |
| `--border*` | Hairline dividers |

Do not use pure `#000` / `#fff`. Prefer tinted neutrals already in the scale.

## Typography

- Sans: Inter (`--font-sans`)
- Mono: DM Mono (`--font-mono`) for code / tabular bits
- Content column: `--content-max` (720px)
- Body line-height: `--leading-body`

## Space & radius

Use `--space-1` … `--space-6` and `--radius-sm|md|lg` instead of one-off pixels where practical.

## Focus

Interactive elements use `:focus-visible` with `--focus-ring` / `--focus-offset`. Do not remove focus styles without a visible replacement.

## Motion

Tokens: `--ease-out-quint`, `--ease-out-expo`, `--dur-fast` / `--dur-med` / `--dur-enter`.

Use motion for route changes (`.page-enter`), list reveals (`.row-in`), nav underline scale, and hover feedback. Honor `prefers-reduced-motion`. Prefer opacity/transform; avoid layout animation and bounce/elastic easing.
