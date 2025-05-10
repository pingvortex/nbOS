const ascii = {
    "chrome": (c1, c2, c3, c4, c5, browserName, user, dividerBar, uptime) => `
<span>${c2}            .,:loool:,.                 ${c1}${user}@${browserName}
${c2}        .,coooooooooooooc,.             <span style='color: #ffffff'>${dividerBar}
${c2}     .,lllllllllllllllllllll,.          ${c2}OS: <span style='color: #ffffff'>Browser
${c2}    ;ccccccccccccccccccccccccc;         ${c2}Host: <span style='color: #ffffff'>${navigator.vendor}
${c1}  '${c2}ccccccccccccccccccccccccccccc.       ${c2}Kernel: <span style='color: #ffffff'>${window.navigator.userAgent.split(" ")[0]}
${c1} ,oo${c2}c::::::::okO${c5}000${c3}0OOkkkkkkkkkkk:      ${c2}Uptime: <span style='color: #ffffff'>${uptime}
${c1}.ooool${c2};;;;:x${c5}K0${c4}kxxxxxk${c5}0X${c3}K0000000000.     ${c2}Packages: <span style='color: #ffffff'>0
${c1}:oooool${c2};,;O${c5}K${c4}ddddddddddd${c5}KX${c3}000000000d     ${c2}Shell: <span style='color: #ffffff'>Bash
${c1}lllllool${c2};l${c5}N${c4}dllllllllllld${c5}N${c3}K000000000     ${c2}Resolution: <span style='color: #ffffff'>${window.screen.width}x${window.screen.height}
${c1}lllllllll${c2}o${c5}M${c4}dccccccccccco${c5}W${c3}K000000000     
${c1};cllllllllX${c5}X${c4}c:::::::::c${c5}0X${c3}000000000d
${c1}.ccccllllllO${c5}Nk${c4}c;,,,;cx${c5}KK${c3}0000000000.
${c1} .cccccclllllxOO${c5}OOO${c1}Okx${c3}O0000000000;
${c1}  .:ccccccccllllllllo${c3}O0000000OOO,
${c1}    ,:ccccccccclllcd${c3}0000OOOOOOl.
${c1}      '::ccccccccc${c3}dOOOOOOOkx:.
${c1}        ..,::cccc${c3}xOOOkkko;.
${c1}            ..,:${c3}dOkxl:.</span>
`,
    "safari": (c1, c2, c3, c4, c5, c6, browserName, user, dividerBar, uptime) => `
 <span>${c1}                    'c.           ${user}@${browserName}
${c1}                 ,xNMM.            <span style='color: #ffffff'>${dividerBar}
${c1}               .OMMMMo             ${c2}OS: <span style='color: #ffffff'>Browser
${c1}               OMMM0,              ${c2}Host: <span style='color: #ffffff'>${navigator.vendor}
${c1}     .;loddo:' loolloddol;.        ${c2}Kernel: <span style='color: #ffffff'>${window.navigator.userAgent.split(" ")[0]}
${c1}   cKMMMMMMMMMMNWMMMMMMMMMM0:      ${c2}Uptime: <span style='color: #ffffff'>${uptime}
${c2} .KMMMMMMMMMMMMMMMMMMMMMMMWd.      ${c2}Packages: <span style='color: #ffffff'>0
${c2} XMMMMMMMMMMMMMMMMMMMMMMMX.        ${c2}Shell: <span style='color: #ffffff'>Bash
${c3};MMMMMMMMMMMMMMMMMMMMMMMM:         ${c2}Resolution: <span style='color: #ffffff'>${window.screen.width}x${window.screen.height}
${c3}:MMMMMMMMMMMMMMMMMMMMMMMM:                
${c4}.MMMMMMMMMMMMMMMMMMMMMMMMX.               
 ${c4}kMMMMMMMMMMMMMMMMMMMMMMMMWd.             
 ${c5}.XMMMMMMMMMMMMMMMMMMMMMMMMMMk            
  ${c5}.XMMMMMMMMMMMMMMMMMMMMMMMMK.            
    ${c6}kMMMMMMMMMMMMMMMMMMMMMMd
     ;KMMMMMMMWXXWMMMMMMMk.
       .cooc,.    .,coo:. </span>
    `,
    "firefox": (c1, c2, browserName, user, dividerBar, uptime) => `
<span style="color: ${c1}">${user}@${browserName}</span>
<span style="color: #ffffff">${dividerBar}</span>
<span style="color: ${c2};">OS: <span style='color: #ffffff'>Browser</span>
<span style="color: ${c2};">Host: <span style='color: #ffffff'>${navigator.vendor}</span>
<span style="color: ${c2};">Kernel: <span style='color: #ffffff'>${window.navigator.userAgent.split(" ")[0]}</span>
<span style="color: ${c2};">Uptime: <span style='color: #ffffff'>${uptime}</span>
<span style="color: ${c2};">Packages: <span style='color: #ffffff'>0</span>
<span style="color: ${c2};">Shell: <span style='color: #ffffff'>Bash</span>
<span style="color: ${c2};">Resolution: <span style='color: #ffffff'>${window.screen.width}x${window.screen.height}</span>`,
    "opera": (c1, c2, browserName, user, dividerBar, uptime) => `
<span style="color: ${c1}">${user}@${browserName}</span>
<span style="color: #ffffff">${dividerBar}</span>
<span style="color: ${c2};">OS: <span style='color: #ffffff'>Browser</span>
<span style="color: ${c2};">Host: <span style='color: #ffffff'>${navigator.vendor}</span>
<span style="color: ${c2};">Kernel: <span style='color: #ffffff'>${window.navigator.userAgent.split(" ")[0]}</span>
<span style="color: ${c2};">Uptime: <span style='color: #ffffff'>${uptime}</span>
<span style="color: ${c2};">Packages: <span style='color: #ffffff'>0</span>
<span style="color: ${c2};">Shell: <span style='color: #ffffff'>Bash</span>
<span style="color: ${c2};">Resolution: <span style='color: #ffffff'>${window.screen.width}x${window.screen.height}</span>`,
    "edge": (c1, c2, browserName, user, dividerBar, uptime) => `
<span style="color: ${c1}">${user}@${browserName}</span>
<span style="color: #ffffff">${dividerBar}</span>
<span style="color: ${c2};">OS: <span style='color: #ffffff'>Browser</span>
<span style="color: ${c2};">Host: <span style='color: #ffffff'>${navigator.vendor}</span>
<span style="color: ${c2};">Kernel: <span style='color: #ffffff'>${window.navigator.userAgent.split(" ")[0]}</span>
<span style="color: ${c2};">Uptime: <span style='color: #ffffff'>${uptime}</span>
<span style="color: ${c2};">Packages: <span style='color: #ffffff'>0</span>
<span style="color: ${c2};">Shell: <span style='color: #ffffff'>Bash</span>
<span style="color: ${c2};">Resolution: <span style='color: #ffffff'>${window.screen.width}x${window.screen.height}</span>`,
    "browser": (c1, c2, browserName, user, dividerBar, uptime) => `
<span style="color: ${c1}">${user}@${browserName}</span>
<span style="color: #ffffff">${dividerBar}</span>
<span style="color: ${c2};">OS: <span style='color: #ffffff'>Browser</span>
<span style="color: ${c2};">Host: <span style='color: #ffffff'>${navigator.vendor}</span>
<span style="color: ${c2};">Kernel: <span style='color: #ffffff'>${window.navigator.userAgent.split(" ")[0]}</span>
<span style="color: ${c2};">Uptime: <span style='color: #ffffff'>${uptime}</span>
<span style="color: ${c2};">Packages: <span style='color: #ffffff'>0</span>
<span style="color: ${c2};">Shell: <span style='color: #ffffff'>Bash</span>
<span style="color: ${c2};">Resolution: <span style='color: #ffffff'>${window.screen.width}x${window.screen.height}</span>`,
}

const asciiColors = {
    "chrome": ["</span><span style='color: #34a853'>", "</span><span style='color: #ea4335'>", "</span><span style='color: #fbbc05'>", "</span><span style='color: #4285f4'>", "</span><span style='color: #ffffff'>"],
    "safari": ["</span><span style='color: #15b40c'>", "</span><span style='color: #f9f0a4'>", "</span><span style='color: #e74957'>", "</span><span style='color: #e74957'>", "</span><span style='color: #b5019e'>", "</span><span style='color: #3b78ff'>"],
    "firefox": ["#e10f67", "#fb912c"],
    "opera": ["#fa4a4a", "#af0510"],
    "edge": ["#46d369", "#0980d0"],
    "browser": ["#a9a9a9", "#dfdfdf"]
}

export const appName = 'Terminal';
export const appIcon = '<i class="fa-solid fa-terminal"></i>';

export function init(content) {
    content.innerHTML = `
        <style>
            .terminal {
                background: #1e1e1e;
                color: #ffffff;
                font-family: 'Courier New', monospace;
                padding: 10px;
                height: calc(100% - 20px);
                overflow-y: auto;
                white-space: pre-wrap;
                word-break: break-all;
            }
            .terminal-input {
                background: transparent;
                color: #ffffff;
                border: none;
                outline: none;
                font-family: 'Courier New', monospace;
                width: calc(100% - 30px);
                margin-top: 5px;
                vertical-align: middle;
            }
            .prompt {
                color: #00ff00;
                margin-right: 0.5rem;
                display: inline-block;
                vertical-align: middle;
            }
            .input-container {
                display: flex;
                align-items: center;
            }
        </style>
        <div class="terminal" id="terminal-output"></div>
        <div class="input-container">
            <span class="prompt">~#</span>
            <input type="text" class="terminal-input" id="terminal-input" autofocus>
        </div>
    `;

    const output = content.querySelector('#terminal-output');
    const input = content.querySelector('#terminal-input');
    let startTime = Date.now();

    function getBrowserName() {
        const ua = navigator.userAgent.toLowerCase();
        if (ua.includes('chrome')) return 'chrome';
        if (ua.includes('safari')) return 'safari';
        if (ua.includes('firefox')) return 'firefox';
        if (ua.includes('opera') || ua.includes('opr')) return 'opera';
        if (ua.includes('edg')) return 'edge';
        return 'browser';
    }

    function formatUptime() {
        const uptimeMs = Date.now() - startTime;
        const seconds = Math.floor(uptimeMs / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        return `${hours}h ${minutes % 60}m ${seconds % 60}s`;
    }

    function executeCommand(command) {
        command = command.trim().toLowerCase();
        output.innerHTML += `<span style="color: #00ff00">$ ${command}</span>\n`;

        const browser = getBrowserName();
        const colors = asciiColors[browser] || asciiColors.browser;
        const user = 'user';
        const dividerBar = '-'.repeat(20);
        const uptime = formatUptime();

        if (command === 'neofetch') {
            const asciiArt = ascii[browser] || ascii.browser;
            output.innerHTML += asciiArt(...colors, browser, user, dividerBar, uptime);
        } else if (command.startsWith('echo ')) {
            const text = command.slice(5).trim();
            output.innerHTML += `<span>${text}</span>\n`;
        } else if (command === 'help') {
            output.innerHTML += `
Available commands:
  neofetch - Display system information with ASCII art
  echo <text> - Display the specified text
  help - Show this help message
  clear - Clear the terminal screen
            `;
        } else if (command === 'clear') {
            output.innerHTML = '';
        } else if (command) {
            output.innerHTML += `<span style="color: #ff5555">${command}: command not found</span>\n`;
        }
        output.scrollTop = output.scrollHeight;
    }

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            executeCommand(input.value);
            input.value = '';
        }
    });

    executeCommand('neofetch');
}