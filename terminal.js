(()=>{'use strict';
const root=document.querySelector('[data-portfolio-terminal]');if(!root)return;
const el=document.documentElement.lang==='el';
const output=root.querySelector('.terminal-output'),form=root.querySelector('form'),input=root.querySelector('input');
const t=el?{
welcome:'Καλώς ήρθατε στο portfolio του Μάριου! Πληκτρολογήστε help.',
help:'Εντολές: help, about, whoami, experience, skills, homelab, projects, education, certifications, languages, contact, cv, date, clear\nΠλοήγηση: open home | about | skills | experience | homelab | projects | contact | cv\nΙστορικό: ↑ / ↓ · Tab: συμπλήρωση εντολής',
about:'Μάριος-Άγγελος Πλάτων — Τεχνικός Υποστήριξης Πληροφορικής & Δικτύων. Εμπειρία IT Helpdesk 1ου/2ου επιπέδου και προσωπικό Proxmox home lab.',
experience:'CQS-PALADINO (06/2025–σήμερα): IT Helpdesk L1/L2, Windows, Active Directory, Microsoft 365, VMware vSphere.\nElpedison μέσω Befon (01/2025–06/2025): εξυπηρέτηση πελατών, Salesforce.\nΟικογενειακή επιχείρηση (05/2024–01/2025): διαχείριση περιπτέρου.\nVodafone (09/2023–12/2023): πωλήσεις.',
skills:'Συστήματα: Windows Client/Server, Linux Server · Virtualization: VMware vSphere, Proxmox VE · Δίκτυα: TCP/IP, DNS, DHCP, NAT · Διαχείριση: Active Directory, Microsoft 365 · Storage/Security: TrueNAS, BitLocker, LUKS · Self-hosting: Pi-hole, Uptime Kuma, Matrix/Synapse, Caddy, Cloudflare Tunnel · Dev: Python, C#, JavaScript, GDScript, HTML/CSS · DB: MySQL, MongoDB, SQLite.',
homelab:'Home Lab: Proxmox VE, TrueNAS (NAS), Pi-hole (DNS filtering), Uptime Kuma (monitoring), Matrix/Synapse + Element (επικοινωνία), Cloudflare Tunnel (πρόσβαση). Δείτε την αναλυτική παρουσίαση:',
projects:'Έργα: Killing Joke (Unity / Global Game Jam 2024), Fitness RPG (Godot 4.6 / Supabase), Notepad (Python/Tkinter), εκπαιδευτικό keylogger και streetwear e-shop (WordPress/WooCommerce).',
education:'Τεχνικός Εφαρμογών Πληροφορικής — ΙΕΚ Δέλτα 360, Πάτρα · Ακαδημία Εμπορικού Ναυτικού — Οινούσσες, Χίος.',
certifications:'Cisco Networking Essentials · Cisco Endpoint Security · ECDL Advanced.',
languages:'Αγγλικά C1 · Γαλλικά B1.',
contact:'Επικοινωνία μέσω της σελίδας επικοινωνίας ή του email:',
cv:'Προβολή του ελληνικού βιογραφικού:',
unknown:'Άγνωστη εντολή. Γράψτε help.',
openUsage:'Χρήση: open home | about | skills | experience | homelab | projects | contact | cv',
opening:'Άνοιγμα σελίδας: ',link:'Άνοιγμα συνδέσμου →'
}:{welcome:'Welcome to Marios’s portfolio! Type help to get started.',
help:'Commands: help, about, whoami, experience, skills, homelab, projects, education, certifications, languages, contact, cv, date, clear\nNavigate: open home | about | skills | experience | homelab | projects | contact | cv\nHistory: ↑ / ↓ · Tab: command completion',
about:'Marios-Angelos Platon — IT Support & Network Technician with Level 1/2 helpdesk experience and a personal Proxmox home lab.',
experience:'CQS-PALADINO (Jun 2025–present): IT Helpdesk L1/L2, Windows, Active Directory, Microsoft 365, VMware vSphere.\nElpedison via Befon (Jan–Jun 2025): customer service, Salesforce.\nFamily business (May 2024–Jan 2025): kiosk operations.\nVodafone (Sep–Dec 2023): sales.',
skills:'Systems: Windows Client/Server, Linux Server · Virtualization: VMware vSphere, Proxmox VE · Networking: TCP/IP, DNS, DHCP, NAT · Administration: Active Directory, Microsoft 365 · Storage/Security: TrueNAS, BitLocker, LUKS · Self-hosting: Pi-hole, Uptime Kuma, Matrix/Synapse, Caddy, Cloudflare Tunnel · Development: Python, C#, JavaScript, GDScript, HTML/CSS · Databases: MySQL, MongoDB, SQLite.',
homelab:'Home Lab: Proxmox VE, TrueNAS (NAS), Pi-hole (DNS filtering), Uptime Kuma (monitoring), Matrix/Synapse + Element (messaging), Cloudflare Tunnel (access). Explore the case study:',
projects:'Projects: Killing Joke (Unity / Global Game Jam 2024), Fitness RPG (Godot 4.6 / Supabase), Notepad (Python/Tkinter), educational keylogger and streetwear e-shop (WordPress/WooCommerce).',
education:'IT Applications Technician — IEK Delta 360, Patras · Merchant Marine Academy — Oinousses, Chios.',
certifications:'Cisco Networking Essentials · Cisco Endpoint Security · ECDL Advanced.',
languages:'English C1 · French B1.',
contact:'Reach me via the contact page or email:',
cv:'View the English CV:',
unknown:'Unknown command. Type help.',
openUsage:'Usage: open home | about | skills | experience | homelab | projects | contact | cv',
opening:'Opening: ',link:'Open link →'};
const links={home:'index.html',about:'index.html#about',skills:'index.html#skills',experience:'index.html#experience',homelab:'homelab.html',projects:'index.html#projects',contact:'contact.html',cv:el?'cv.html':'cv-en.html'};
const cmds=['help','about','whoami','experience','skills','homelab','projects','education','certifications','languages','contact','cv','date','clear','open'];
const history=[];let cursor=0;
function write(value,kind){const p=document.createElement('p');p.className=kind||'';p.textContent=value;output.appendChild(p);output.scrollTop=output.scrollHeight;}
function link(label,url){const a=document.createElement('a');a.className='terminal-link';a.textContent=label;a.href=url;output.appendChild(a);output.scrollTop=output.scrollHeight;}
function run(raw){const cmd=raw.trim().toLowerCase().replace(/\s+/g,' ');if(!cmd)return;history.push(raw.trim());if(history.length>40)history.shift();cursor=history.length;write('> '+raw.trim(),'terminal-command');if(cmd==='clear'){output.replaceChildren();return;}
if(cmd==='date'){write(new Date().toLocaleString(el?'el-GR':'en-GB'));return;}
if(cmd==='open'||cmd.startsWith('open ')){const target=cmd.slice(5).trim();if(!Object.prototype.hasOwnProperty.call(links,target)){write(t.openUsage);return;}write(t.opening+target);window.location.assign(links[target]);return;}
const key=cmd==='whoami'?'about':cmd;
if(!Object.prototype.hasOwnProperty.call(t,key)||['welcome','unknown','opening','openUsage','link'].includes(key)){write(t.unknown);return;}
write(t[key]);if(key==='homelab')link(t.link,links.homelab);if(key==='contact'){link(t.link,links.contact);link('mariosplaton1@gmail.com','mailto:mariosplaton1@gmail.com');}if(key==='cv')link(t.link,links.cv);if(key==='projects')link(t.link,links.projects);}
write(t.welcome);form.addEventListener('submit',e=>{e.preventDefault();const raw=input.value;input.value='';run(raw);});
input.addEventListener('keydown',e=>{if(e.key==='ArrowUp'||e.key==='ArrowDown'){if(!history.length)return;e.preventDefault();cursor=Math.max(0,Math.min(history.length,cursor+(e.key==='ArrowUp'?-1:1)));input.value=history[cursor]||'';input.setSelectionRange(input.value.length,input.value.length);}
if(e.key==='Tab'&&!e.shiftKey){const typed=input.value.trim().toLowerCase();if(!typed||typed.includes(' '))return;const matches=cmds.filter(x=>x.startsWith(typed));if(matches.length===1&&typed!==matches[0]){e.preventDefault();input.value=matches[0]+(matches[0]==='open'?' ':'');}}});
})();
