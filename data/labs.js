// ─────────────────────────────────────────────────────────────
//  labs.js
//  To add a new lab: copy one line from below and fill it in.
//  URL format: https://cyberdefenders.org/blueteam-ctf-challenges/achievements/Afterguard/lab-name/
//  Categories: 'Network Forensics' | 'Endpoint Forensics' | 'Cloud Forensics' | 'Threat Hunting' | 'Threat Intel' | 'Detection Engineering'
//  Difficulty: 'Easy' | 'Medium' | 'Hard' | 'Extreme'
// ─────────────────────────────────────────────────────────────

const CD_LABS = [
    { name: 'T1595',                       url: 'https://cyberdefenders.org/blueteam-ctf-challenges/achievements/Afterguard/t1595/',                       category: 'Network Forensics',    difficulty: 'Easy',   completed: '3/27/2026' },
    { name: 'Tomcat Takeover',             url: 'https://cyberdefenders.org/blueteam-ctf-challenges/achievements/Afterguard/tomcat-takeover/',             category: 'Network Forensics',    difficulty: 'Easy',   completed: '3/24/2026' },
    { name: 'Web Investigation',           url: 'https://cyberdefenders.org/blueteam-ctf-challenges/achievements/Afterguard/web-investigation/',           category: 'Network Forensics',    difficulty: 'Easy',   completed: '3/23/2026' },
    { name: 'RetailBreach',                url: 'https://cyberdefenders.org/blueteam-ctf-challenges/achievements/Afterguard/retailbreach/',                category: 'Network Forensics',    difficulty: 'Easy',   completed: '3/22/2026' },
    { name: 'JetBrains',                   url: 'https://cyberdefenders.org/blueteam-ctf-challenges/achievements/Afterguard/jetbrains/',                   category: 'Network Forensics',    difficulty: 'Easy',   completed: '3/21/2026' },
    { name: 'Poisoned PyTorch',            url: 'https://cyberdefenders.org/blueteam-ctf-challenges/achievements/Afterguard/poisoned-pytorch/',           category: 'Threat Hunting',       difficulty: 'Medium', completed: '3/18/2026' },
    { name: 'ConsentStorm',                url: 'https://cyberdefenders.org/blueteam-ctf-challenges/achievements/Afterguard/consentstorm/',                category: 'Cloud Forensics',      difficulty: 'Medium', completed: '3/16/2026' },
    { name: 'XXE Infiltration',            url: 'https://cyberdefenders.org/blueteam-ctf-challenges/achievements/Afterguard/xxe-infiltration/',            category: 'Network Forensics',    difficulty: 'Easy',   completed: '3/15/2026' },
    { name: 'DanaBot',                     url: 'https://cyberdefenders.org/blueteam-ctf-challenges/achievements/Afterguard/danabot/',                     category: 'Network Forensics',    difficulty: 'Easy',   completed: '3/14/2026' },
    { name: 'CallMeOnTheChain - EtherRAT', url: 'https://cyberdefenders.org/blueteam-ctf-challenges/achievements/Afterguard/callmeonthechain-etherrat/',   category: 'Network Forensics',    difficulty: 'Medium', completed: '3/13/2026' },
    { name: 'Volatility Traces',           url: 'https://cyberdefenders.org/blueteam-ctf-challenges/achievements/Afterguard/volatility-traces/',           category: 'Endpoint Forensics',   difficulty: 'Easy',   completed: '3/12/2026' },
    { name: 'Perfect Survey',              url: 'https://cyberdefenders.org/blueteam-ctf-challenges/achievements/Afterguard/perfect-survey/',              category: 'Threat Hunting',       difficulty: 'Medium', completed: '3/11/2026' },
    { name: 'Stolen Time - HiddenTear',    url: 'https://cyberdefenders.org/blueteam-ctf-challenges/achievements/Afterguard/stolen-time-hiddentear/',      category: 'Threat Hunting',       difficulty: 'Medium', completed: '3/6/2026'  },
    { name: 'SigmaPredator',               url: 'https://cyberdefenders.org/blueteam-ctf-challenges/achievements/Afterguard/sigmapredator/',               category: 'Detection Engineering',difficulty: 'Easy',   completed: '3/5/2026'  },
    { name: 'RevengeHotels APT',           url: 'https://cyberdefenders.org/blueteam-ctf-challenges/achievements/Afterguard/revengehotels/',               category: 'Endpoint Forensics',   difficulty: 'Easy',   completed: '3/4/2026'  },
    { name: 'Rogue Azure',                 url: 'https://cyberdefenders.org/blueteam-ctf-challenges/achievements/Afterguard/rogue-azure/',                 category: 'Cloud Forensics',      difficulty: 'Easy',   completed: '3/4/2026'  },
    { name: 'DynamicEscalate',             url: 'https://cyberdefenders.org/blueteam-ctf-challenges/achievements/Afterguard/dynamicescalate/',             category: 'Cloud Forensics',      difficulty: 'Easy',   completed: '3/4/2026'  },
    { name: 'AbuSESer - Trufflenet',       url: 'https://cyberdefenders.org/blueteam-ctf-challenges/achievements/Afterguard/abuser-trufflenet/',           category: 'Cloud Forensics',      difficulty: 'Easy',   completed: '3/4/2026'  },
    { name: 'ContainerBreak - Rootkit Trail', url: 'https://cyberdefenders.org/blueteam-ctf-challenges/achievements/Afterguard/containerbreak-rootkit-trail/', category: 'Endpoint Forensics', difficulty: 'Easy', completed: '3/3/2026'  },
    { name: 'AWSWatcher',                  url: 'https://cyberdefenders.org/blueteam-ctf-challenges/achievements/Afterguard/awswatcher/',                  category: 'Cloud Forensics',      difficulty: 'Easy',   completed: '3/7/2026'  },
    { name: 'RediShell - Kinsing',         url: 'https://cyberdefenders.org/blueteam-ctf-challenges/achievements/Afterguard/redishell-kinsing/',           category: 'Network Forensics',    difficulty: 'Easy',   completed: '3/2/2026'  },
    { name: 'Maranhao',                    url: 'https://cyberdefenders.org/blueteam-ctf-challenges/achievements/Afterguard/maranhao/',                    category: 'Endpoint Forensics',   difficulty: 'Easy',   completed: '3/2/2026'  },
    { name: 'Openfire',                    url: 'https://cyberdefenders.org/blueteam-ctf-challenges/achievements/Afterguard/openfire/',                    category: 'Network Forensics',    difficulty: 'Easy',   completed: '3/2/2026'  },
    { name: 'Lockdown',                    url: 'https://cyberdefenders.org/blueteam-ctf-challenges/achievements/Afterguard/lockdown/',                    category: 'Network Forensics',    difficulty: 'Easy',   completed: '3/1/2026'  },
    { name: 'Tusk Infostealer',            url: 'https://cyberdefenders.org/blueteam-ctf-challenges/achievements/Afterguard/tusk-infostealer/',            category: 'Threat Intel',         difficulty: 'Easy',   completed: '3/9/2026'  },
    { name: 'XLMRat',                      url: 'https://cyberdefenders.org/blueteam-ctf-challenges/achievements/Afterguard/xlmrat/',                      category: 'Network Forensics',    difficulty: 'Easy',   completed: '1/15/2026' },
    { name: 'PsExec Hunt',                 url: 'https://cyberdefenders.org/blueteam-ctf-challenges/achievements/Afterguard/psexec-hunt/',                 category: 'Network Forensics',    difficulty: 'Easy',   completed: '1/15/2026' },
    { name: 'The Crime',                   url: 'https://cyberdefenders.org/blueteam-ctf-challenges/achievements/Afterguard/the-crime/',                   category: 'Endpoint Forensics',   difficulty: 'Easy',   completed: '1/15/2026' },
    { name: 'Lespion',                     url: 'https://cyberdefenders.org/blueteam-ctf-challenges/achievements/Afterguard/lespion/',                     category: 'Threat Intel',         difficulty: 'Easy',   completed: '1/13/2026' },
    { name: 'Amadey - APT-C-36',           url: 'https://cyberdefenders.org/blueteam-ctf-challenges/achievements/Afterguard/amadey-apt-c-36/',             category: 'Endpoint Forensics',   difficulty: 'Easy',   completed: '1/12/2026' },
    { name: 'Yellow RAT',                  url: 'https://cyberdefenders.org/blueteam-ctf-challenges/achievements/Afterguard/yellow-rat/',                  category: 'Threat Intel',         difficulty: 'Easy',   completed: '1/12/2026' },
    { name: 'PoisonedCredentials',         url: 'https://cyberdefenders.org/blueteam-ctf-challenges/achievements/Afterguard/poisonedcredentials/',         category: 'Network Forensics',    difficulty: 'Easy',   completed: '1/11/2026' },
    { name: 'Oski',                        url: 'https://cyberdefenders.org/blueteam-ctf-challenges/achievements/Afterguard/oski/',                        category: 'Threat Intel',         difficulty: 'Easy',   completed: '1/10/2026' },
    { name: 'WebStrike',                   url: 'https://cyberdefenders.org/blueteam-ctf-challenges/achievements/Afterguard/webstrike/',                   category: 'Network Forensics',    difficulty: 'Easy',   completed: '1/10/2026' },
];
