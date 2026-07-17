// ── Writeups Data ─────────────────────────────────────────────
//
// To add a new writeup, copy the template below and paste it into
// the WRITEUPS array. All fields except `content` are required.
//
// FIELD REFERENCE
// ───────────────
//   id          : unique number (increment from last entry)
//   title       : full display title
//   category    : e.g. 'OSINT', 'Forensics', 'Web', 'Network', 'Malware', 'CTF'
//   difficulty  : 'Easy' | 'Medium' | 'Hard' | 'Extreme'
//   date        : display string, e.g. 'Jun 2026'
//   summary     : one-sentence blurb shown on the list row
//   content     : array of blocks (see BLOCK TYPES below)
//
// BLOCK TYPES
// ───────────
//   { type: 'h2',     text: 'Section Heading' }
//   { type: 'h3',     text: 'Sub-section Heading' }
//   { type: 'p',      text: 'Paragraph of body text.' }
//   { type: 'ul',     items: ['bullet one', 'bullet two'] }
//   { type: 'ol',     items: ['step one', 'step two'] }
//   { type: 'code',   text: 'vol.py -f mem.raw windows.pstree' }
//   { type: 'note',   text: 'Tip or callout highlighted in a box.' }
//   { type: 'figure', src: 'assets/writeups/...', caption: 'Figure caption' }
//   { type: 'table',
//       headers: ['Column A', 'Column B', 'Column C'],
//       rows:    [['row1a', 'row1b', 'row1c'],
//                 ['row2a', 'row2b', 'row2c']] }

window.WRITEUPS = [
    {
        id: 1,
        title: 'Shadow Token Symphony — APT29 Azure Compromise',
        category: 'Cloud / DFIR',
        difficulty: 'Hard',
        date: 'Apr 2026',
        summary: 'Full attack-chain investigation of a multi-stage APT29-style Azure environment compromise — from on-premises brute force through Key Vault exfiltration — using Microsoft Sentinel.',
        content: [
            { type: 'h2', text: 'Overview' },
            { type: 'p',  text: 'InfiniteTechSolutions experienced a sophisticated, multi-stage cyber attack against their Azure environment in July 2025. The attack was detected by Microsoft Sentinel through anomalous login patterns, unauthorized service installations, and suspicious API calls targeting the Microsoft Graph endpoint.' },
            { type: 'p',  text: 'The threat actor executed a full attack chain beginning with on-premises reconnaissance and brute-force attacks, escalating to Azure AD credential compromise via password spray, followed by lateral movement, privilege escalation, persistence establishment, and culminating in data exfiltration from Azure Key Vaults.' },
            { type: 'table',
                headers: ['Field', 'Value'],
                rows: [
                    ['Incident Date', 'July 2025'],
                    ['Organization', 'InfiniteTechSolutions (infinitechsolutions.xyz)'],
                    ['Platform', 'Microsoft Azure / Microsoft Sentinel'],
                    ['Analyst', 'Johann Weingertner'],
                    ['Report Date', 'April 11, 2026'],
                    ['Lab Platform', 'CyberDefenders'],
                    ['Lab', 'Shadow Token Symphony - APT29'],
                ],
            },
            { type: 'figure', src: 'assets/writeups/soc-apt29/fig01-azure-topology.png', caption: 'Figure 1 — InfiniteTechSolutions Azure environment topology monitored by Microsoft Sentinel' },

            { type: 'h2', text: 'Attack Timeline' },
            { type: 'table',
                headers: ['Phase', 'Timestamp', 'Activity'],
                rows: [
                    ['1', 'Prior to 2025-07-01', 'Initial recon: login failures across 4 machines on-premises; ITWS01 primary target'],
                    ['2', 'Pre-compromise', "Malicious service 'c316a11' installed on ITWS01 using account 'infinitetechadmin'"],
                    ['3', 'Post-install', 'Password spray attack launched against Azure AD — 63 failed auth attempts'],
                    ['4', '2025-07-01 19:21', 'First successful Azure AD authentication — account Maya Wilson compromised'],
                    ['5', '2025-07-01 19:25', 'Non-interactive token auth (refreshToken) — 4 minutes after initial compromise'],
                    ['6', 'Ongoing', 'Graph API reconnaissance from 48.211.64.27 — user enumeration & org recon'],
                    ['7', 'Post-recon', "Azure Automation Account 'DAILYCHECKER' repurposed; runbook 'UsersReminders' created"],
                    ['8', 'Post-persistence', 'Privilege escalation — tom.clarkson@infinitechsolutions.xyz added as app owner (App ID: 9999-8888)'],
                    ['9', 'Post-escalation', 'Runbook updated from IP 35.158.160.255; Key Vault exfiltration begins'],
                    ['10', 'Final stage', 'Secrets extracted from CORP-KV-PROD, INFRA-BACKUP-KV, and FINANCE-KV-EU'],
                ],
            },

            { type: 'h2', text: '3. Initial Reconnaissance & Machine Compromise' },
            { type: 'h3', text: '3.1 Login Failure Analysis' },
            { type: 'p',  text: 'Analysis of Windows Event logs revealed that 4 distinct computer names experienced login failures during the initial reconnaissance phase. The volume and distribution of these failures indicate systematic brute-force activity across the on-premises environment.' },
            { type: 'ul', items: [
                'Distinct machines targeted: 4',
                'Primary target machine: ITWS01',
                'Basis for primary target determination: Highest volume of failed authentication attempts',
            ]},
            { type: 'figure', src: 'assets/writeups/soc-apt29/fig02-login-failures.png', caption: 'Figure 2 — Windows Event log showing failed authentication attempts across target machines (ITWS01: 17, HRWS02: 11, FINWS01: 10, ITWS03: 9)' },

            { type: 'h3', text: '3.2 Malicious Service Installation' },
            { type: 'p',  text: 'Following the successful compromise of ITWS01, the threat actor installed a malicious service to establish a foothold. The service installation event was recorded in the Windows Security Event logs.' },
            { type: 'table',
                headers: ['Field', 'Value'],
                rows: [
                    ['Malicious Service Name', 'c316a11'],
                    ['Target Machine', 'ITWS01'],
                    ['Account Used', 'infinitetechadmin'],
                    ['Account Type', 'Privileged (administrative)'],
                ],
            },
            { type: 'figure', src: 'assets/writeups/soc-apt29/fig03-malicious-service.png', caption: "Figure 3 — Windows Event log showing malicious service 'c316a11' installed on ITWS01" },
            { type: 'figure', src: 'assets/writeups/soc-apt29/fig04-service-privileged.png', caption: "Figure 4 — Windows Event log showing malicious service 'c316a11' installed by privileged account 'infinitetechadmin'" },

            { type: 'h2', text: '4. Password Spray Attack Detection & Analysis' },
            { type: 'h3', text: '4.1 Azure AD Failed Authentication Volume' },
            { type: 'p',  text: 'Following the on-premises service installation, the attacker pivoted to Azure AD and launched a password spray attack. A total of 63 failed authentication attempts were recorded in the Azure sign-in logs after the service installation event.' },
            { type: 'figure', src: 'assets/writeups/soc-apt29/fig05-password-spray-63.png', caption: 'Figure 5 — Azure AD sign-in logs showing 63 failed authentication attempts during password spray' },

            { type: 'h3', text: '4.2 Account Lockouts' },
            { type: 'p',  text: 'The repeated failed login attempts triggered account lockout policies for two user accounts. These accounts were identified through the Azure AD audit logs.' },
            { type: 'ul', items: ['Locked out accounts: Sarah Miles, Alice Jones'] },
            { type: 'figure', src: 'assets/writeups/soc-apt29/fig06-account-lockouts.png', caption: 'Figure 6 — Azure AD logs showing account lockout events for Sarah Miles and Alice Jones' },

            { type: 'h3', text: '4.3 Initial Successful Compromise' },
            { type: 'p',  text: 'The password spray attack ultimately succeeded in compromising one user account.' },
            { type: 'table',
                headers: ['Field', 'Value'],
                rows: [
                    ['Timestamp of first successful auth', '2025-07-01 19:21'],
                    ['Compromised account', 'Maya Wilson'],
                    ['User-Agent string', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko)'],
                ],
            },
            { type: 'figure', src: 'assets/writeups/soc-apt29/fig07-maya-wilson-auth.png', caption: 'Figure 7 — Azure AD sign-in log showing first successful authentication for account Maya Wilson at 19:21' },

            { type: 'h2', text: '5. Token Manipulation & Authentication Persistence' },
            { type: 'h3', text: '5.1 Non-Interactive Authentication Method' },
            { type: 'p',  text: 'After the initial successful authentication, the attacker transitioned to non-interactive authentication to maintain persistent access without requiring repeated credential entry. This method is commonly used by attackers to avoid triggering MFA prompts and reduce detection visibility.' },
            { type: 'ul', items: [
                'Authentication token type used: refreshToken',
                'Minutes elapsed between initial compromise and first non-interactive auth: 4 minutes',
            ]},
            { type: 'figure', src: 'assets/writeups/soc-apt29/fig08-refresh-token.png', caption: 'Figure 8 — Azure AD non-interactive sign-in logs showing refreshToken usage 4 minutes after initial compromise' },

            { type: 'h3', text: '5.2 Privilege Escalation via Token Abuse' },
            { type: 'p',  text: 'Investigation of the non-interactive authentication logs revealed suspicious activity from an additional privileged account, indicating the attacker leveraged stolen tokens to authenticate as a higher-privileged user.' },
            { type: 'ul', items: ['Additional compromised privileged account: Tom Clarkson'] },
            { type: 'figure', src: 'assets/writeups/soc-apt29/fig09-tom-clarkson.png', caption: 'Figure 9 — Non-interactive sign-in logs showing suspicious authentication activity from the same IP as Maya Wilson for Tom Clarkson' },

            { type: 'h2', text: '6. Lateral Movement & Reconnaissance Activities' },
            { type: 'h3', text: '6.1 Microsoft Graph API User Enumeration' },
            { type: 'p',  text: 'The attacker utilized the Microsoft Graph API to conduct bulk user enumeration, leveraging delta synchronization capabilities to harvest organizational user data efficiently.' },
            { type: 'table',
                headers: ['Field', 'Value'],
                rows: [
                    ['Graph API endpoint used', '/beta/users/microsoft.graph.delta()'],
                    ['Capability abused', 'Delta synchronization for bulk user enumeration'],
                ],
            },
            { type: 'figure', src: 'assets/writeups/soc-apt29/fig10-graph-enum.png', caption: 'Figure 10 — Graph API logs showing bulk user enumeration using the delta endpoint' },

            { type: 'h3', text: '6.2 Organizational Reconnaissance' },
            { type: 'p',  text: 'In addition to user enumeration, reconnaissance was also performed against a component of the Azure tenant.' },
            { type: 'ul', items: ['Secondary reconnaissance target: organization'] },
            { type: 'figure', src: 'assets/writeups/soc-apt29/fig11-org-recon.png', caption: 'Figure 11 — Graph API logs showing organizational data reconnaissance' },

            { type: 'h2', text: '7. Establishing Automated Persistence' },
            { type: 'h3', text: '7.1 Azure Automation Account Abuse' },
            { type: 'p',  text: "To establish long-term automated persistence, the attacker identified and repurposed an existing Azure Automation Account. Using this resource avoided the need to create new infrastructure, reducing the likelihood of detection through resource creation alerts." },
            { type: 'table',
                headers: ['Field', 'Value'],
                rows: [
                    ['Compromised Automation Account', 'DAILYCHECKER'],
                    ['Malicious Runbook Created', 'UsersReminders'],
                    ['Execution Schedule Name', 'DailyUsersReminder'],
                ],
            },
            { type: 'p',  text: "The schedule 'DailyUsersReminder' was linked to the malicious runbook to ensure regular automated execution, providing the attacker with persistent recurring access to the environment." },
            { type: 'figure', src: 'assets/writeups/soc-apt29/fig12-automation.png', caption: "Figure 12a — Azure Automation logs showing creation of malicious runbook 'UsersReminders' and associated schedule" },
            { type: 'figure', src: 'assets/writeups/soc-apt29/fig12b-automation-detail-a.png', caption: "Figure 12b — Azure Automation diagnostic detail confirming 'UsersReminders' runbook linked to DAILYCHECKER" },
            { type: 'figure', src: 'assets/writeups/soc-apt29/fig12b-automation-detail-b.png', caption: "Figure 12c — Azure Automation diagnostic detail confirming 'DailyUsersReminder' schedule linked to DAILYCHECKER" },

            { type: 'h2', text: '8. Privilege Escalation & Administrative Access' },
            { type: 'h3', text: '8.1 Application Ownership Escalation' },
            { type: 'p',  text: 'Several hours after the initial compromise, the attacker performed a significant privilege escalation action by adding a user as an owner of an Azure AD application. This granted the target account broad administrative capabilities over the application and its associated permissions.' },
            { type: 'table',
                headers: ['Field', 'Value'],
                rows: [
                    ['Administrative operation executed', 'Add owner to application'],
                    ['Account granted elevated permissions', 'tom.clarkson@infinitechsolutions.xyz'],
                    ['Target Application ID', '9999-8888'],
                ],
            },
            { type: 'figure', src: 'assets/writeups/soc-apt29/fig13-privesc.png', caption: "Figure 13 — Azure AD audit log showing suspicious operations after breach, culminating in 'Add owner to application' event for tom.clarkson@infinitechsolutions.xyz on app 9999-8888" },

            { type: 'h2', text: '9. Persistence Enhancement & Data Exfiltration' },
            { type: 'h3', text: '9.1 Runbook Modification' },
            { type: 'p',  text: 'After obtaining elevated privileges, the attacker modified the previously established persistence mechanism to enhance its capabilities.' },
            { type: 'table',
                headers: ['Field', 'Value'],
                rows: [
                    ['Azure resource type targeted for update', 'Runbook'],
                    ['Caller IP Address', '35.158.160.255'],
                ],
            },
            { type: 'figure', src: 'assets/writeups/soc-apt29/fig14-runbook-update.png', caption: 'Figure 14 — Azure Automation logs showing runbook update from IP 35.158.160.255' },

            { type: 'h3', text: '9.2 Azure Key Vault Exfiltration' },
            { type: 'p',  text: 'In the final stage of the attack, the threat actor accessed multiple Azure Key Vaults to extract secrets. The targeting of production, backup infrastructure, and financial Key Vaults indicates a deliberate effort to harvest high-value credentials, certificates, and sensitive configuration data.' },
            { type: 'ul', items: [
                'CORP-KV-PROD — Production environment secrets and credentials',
                'INFRA-BACKUP-KV — Infrastructure backup keys and access tokens',
                'FINANCE-KV-EU — Financial system secrets for EU operations',
            ]},
            { type: 'figure', src: 'assets/writeups/soc-apt29/fig15-keyvault.png', caption: 'Figure 15 — Key Vault diagnostic logs showing unauthorized secret access (SecretGet) across three vaults from IP 35.158.160.255' },

            { type: 'h2', text: '10. Indicators of Compromise (IOCs)' },
            { type: 'table',
                headers: ['IOC Type', 'Indicator Value', 'Why It Indicates Compromise'],
                rows: [
                    ['Malicious Service Name', 'c316a11', 'Rogue Windows service installed on ITWS01; not a legitimate system service'],
                    ['Malicious Executable', '\\\\127.0.0.1\\ADMINS\\c316a11.exe', 'Binary dropped by attacker; path confirms non-standard admin share delivery'],
                    ['Abused Graph Endpoint', '/beta/users/microsoft.graph.delta()', 'Beta API endpoint abused for silent bulk user enumeration via delta sync'],
                    ['Unusual Account Activity', 'maya.wilson@infinitechsolutions.xyz', 'Azure AD account successfully compromised via password spray attack'],
                    ['Unusual Account Activity', 'tom.clarkson@infinitechsolutions.xyz', 'Privileged account compromised via token abuse; later escalated to app owner'],
                    ['Unusual Account Activity', 'infinitetechadmin', 'Local admin account used to install malicious service; activity inconsistent with normal admin operations'],
                    ['Abused Token Type', 'refreshToken (non-interactive auth)', 'Non-interactive refresh token used to bypass MFA and maintain persistent access'],
                    ['Attacker IP', '48.211.64.27', 'Source of Graph API reconnaissance and user enumeration activity'],
                    ['Attacker IP', '35.158.160.255', 'Source of runbook modification and Key Vault secret extraction'],
                ],
            },

            { type: 'h2', text: '11. Recommendations' },
            { type: 'h3', text: 'Immediate Actions' },
            { type: 'ul', items: [
                'Revoke all active sessions and tokens for Maya Wilson and Tom Clarkson',
                "Disable and investigate the 'infinitetechadmin' account for further compromise",
                "Remove 'UsersReminders' runbook and 'DailyUsersReminder' schedule from the DAILYCHECKER automation account",
                'Block IP addresses 48.211.64.27 and 35.158.160.255 at the firewall/Conditional Access level',
                'Rotate all secrets in CORP-KV-PROD, INFRA-BACKUP-KV, and FINANCE-KV-EU immediately',
                'Remove tom.clarkson@infinitechsolutions.xyz as owner from application 9999-8888',
                "Remove malicious service 'c316a11' from ITWS01 and re-image the machine",
            ]},
            { type: 'h3', text: 'Short-Term Hardening' },
            { type: 'ul', items: [
                'Enforce MFA across all Azure AD accounts, especially privileged accounts',
                'Implement Conditional Access policies restricting non-interactive authentication from unknown IPs',
                'Enable Azure AD Identity Protection smart lockout and risky sign-in policies',
                'Audit and restrict Microsoft Graph API permissions — limit delta query access',
                'Review all Azure Automation Account permissions and enable change tracking on runbooks',
                'Implement Key Vault access policies with just-in-time (JIT) access requirements',
            ]},
            { type: 'h3', text: 'Long-Term Controls' },
            { type: 'ul', items: [
                'Deploy Microsoft Sentinel analytics rules for password spray detection with proper authenticationThreshold tuning',
                'Implement a Zero Trust architecture for all Azure resource access',
                'Conduct regular privileged access reviews for all Azure AD application owners',
                'Establish a formal incident response playbook for Azure AD compromise scenarios',
                'Implement User and Entity Behavior Analytics (UEBA) in Sentinel for anomaly detection',
            ]},
        ],
    },
];
