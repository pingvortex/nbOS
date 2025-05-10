import { dragElement } from 'https://raw.githubusercontent.com/pingvortex/nbOS/main/src/functions/dragElement.js';
import { resizeElement } from 'https://raw.githubusercontent.com/pingvortex/nbOS/main/src/functions/resizeElement.js';
import { showErrorWindow } from 'https://raw.githubusercontent.com/pingvortex/nbOS/main/src/functions/showErrorWindow.js';

let zIndex = 10;

export async function launchApp(appName) {
  if (document.getElementById(`window-${appName}`)) return;

  const win = document.createElement('div');
  win.className = 'window';
  win.id = `window-${appName}`;
  win.style.left = `${100 + Math.random() * 300}px`;
  win.style.top = `${100 + Math.random() * 200}px`;
  win.style.zIndex = zIndex++;

  const header = document.createElement('div');
  header.className = 'window-header';

  const content = document.createElement('div');
  content.className = 'app-content';
  content.id = `content-${appName}`;

  win.appendChild(header);
  win.appendChild(content);
  document.body.appendChild(win);

  dragElement(win, header);
  resizeElement(win);

  let module;
  try {
    module = window.customApps?.[appName]
      ? await import(window.customApps[appName])
      : await import(`./apps/${appName}.js`);
  } catch (error) {
    console.error(`Failed to load app ${appName}:`, error);
    showErrorWindow('Error', `Failed to load app "${appName}". Please check the JavaScript URL.`);
    closeApp(appName);
    return;
  }

  const displayName = module.appName || appName;
  const displayIcon = module.appIcon || '';

  header.innerHTML = `
    <span class="window-title">${displayIcon} ${displayName}</span>
    <div class="window-controls">
      <button onclick="manager.minimize('${appName}')"><i class="fa-solid fa-window-minimize"></i></button>
      <button onclick="manager.maximize('${appName}')"><i class="fa-solid fa-maximize"></i></button>
      <button onclick="manager.closeApp('${appName}')"><i class="fa-solid fa-xmark"></i></button>
    </div>
  `;

  try {
    module.init(content);
  } catch (error) {
    console.error(`Failed to initialize app ${appName}:`, error);
    showErrorWindow('Error', `Failed to initialize app "${appName}".`);
    closeApp(appName);
    return;
  }

  const btn = document.createElement('button');
  btn.className = 'taskbar-button';
  btn.innerHTML = `${displayIcon} ${displayName}`;
  btn.onclick = () => toggleMinimize(appName);
  btn.id = `taskbar-${appName}`;
  document.getElementById('taskbar').appendChild(btn);
}

export function minimize(appName) {
  const win = document.getElementById(`window-${appName}`);
  if (win) win.style.display = 'none';
}

export function toggleMinimize(appName) {
  const win = document.getElementById(`window-${appName}`);
  if (win) {
    win.style.display = win.style.display === 'none' ? 'block' : 'none';
    if (win.style.display === 'block') win.style.zIndex = zIndex++;
  }
}

export function closeApp(appName) {
  document.getElementById(`window-${appName}`)?.remove();
  document.getElementById(`taskbar-${appName}`)?.remove();
}

export function maximize(appName) {
  const win = document.getElementById(`window-${appName}`);
  if (!win) return;

  const isMaximized = win.style.position === 'fixed';
  win.style.position = isMaximized ? 'absolute' : 'fixed';
  win.style.top = isMaximized ? '100px' : '0';
  win.style.left = isMaximized ? '100px' : '0';
  win.style.width = isMaximized ? '300px' : '100vw';
  win.style.height = isMaximized ? '200px' : 'calc(100vh - 55px)';
  win.style.borderRadius = isMaximized ? '0.5rem' : '0';
  win.style.zIndex = zIndex++;

  const maximizeButton = win.querySelector('.window-controls button:nth-child(2) i');
  maximizeButton.classList.toggle('fa-maximize', isMaximized);
  maximizeButton.classList.toggle('fa-minimize', !isMaximized);
}

window.manager = { launchApp, minimize, toggleMinimize, closeApp, maximize };
