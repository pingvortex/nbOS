import { dragElement } from './dragElement.js';

export function showErrorWindow(title, message) {
  const errorWin = document.createElement('div');
  errorWin.className = 'window';
  const uniqueId = `Error-${Date.now()}`;
  errorWin.id = `window-${uniqueId}`;
  errorWin.style.left = `${150 + Math.random() * 200}px`;
  errorWin.style.top = `${150 + Math.random() * 100}px`;
  errorWin.style.zIndex = window.zIndex ? window.zIndex++ : 10;
  errorWin.style.width = '300px';
  errorWin.style.height = '180px';

  const header = document.createElement('div');
  header.className = 'window-header';
  header.innerHTML = `
    <span class="window-title"><i class="fa-solid fa-exclamation-circle"></i> ${title}</span>
    <div class="window-controls">
      <button onclick="manager.closeApp('${uniqueId}')"><i class="fa-solid fa-xmark"></i></button>
    </div>
  `;

  const content = document.createElement('div');
  content.className = 'app-content';
  content.style.display = 'flex';
  content.style.flexDirection = 'column';
  content.style.alignItems = 'center';
  content.style.justifyContent = 'center';
  content.style.textAlign = 'center';
  content.style.padding = '20px';
  content.innerHTML = `<p style="margin-bottom: 15px;">${message}</p>`;

  const okButton = document.createElement('button');
  okButton.textContent = 'OK';
  okButton.style.padding = '5px 20px';
  okButton.style.background = '#555';
  okButton.style.color = '#fff';
  okButton.style.border = 'none';
  okButton.style.borderRadius = '3px';
  okButton.style.cursor = 'pointer';
  okButton.onclick = () => window.manager.closeApp(uniqueId);
  content.appendChild(okButton);

  errorWin.appendChild(header);
  errorWin.appendChild(content);
  document.body.appendChild(errorWin);

  dragElement(errorWin, header);
}