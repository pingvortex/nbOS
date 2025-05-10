import { showErrorWindow } from '../functions/showErrorWindow.js';

export const appName = 'Settings';
export const appIcon = '<i class="fa-solid fa-gear"></i>';

export function init(container) {
  container.style.display = 'flex';
  container.style.flexDirection = 'column';
  container.style.gap = '15px';
  container.style.padding = '10px';

  const bgSection = document.createElement('div');
  bgSection.innerHTML = '<h3>Change Background</h3>';
  const bgInput = document.createElement('input');
  bgInput.type = 'url';
  bgInput.placeholder = 'Enter background image URL';
  bgInput.style.width = '100%';
  bgInput.style.padding = '8px';
  bgInput.style.background = '#333';
  bgInput.style.color = '#fff';
  bgInput.style.border = 'none';
  bgInput.style.borderRadius = '4px';

  const bgButton = document.createElement('button');
  bgButton.textContent = 'Apply Background';
  bgButton.style.marginTop = '5px';
  bgButton.style.padding = '8px';
  bgButton.style.background = '#555';
  bgButton.style.color = '#fff';
  bgButton.style.border = 'none';
  bgButton.style.borderRadius = '4px';
  bgButton.onclick = async () => {
    const url = bgInput.value.trim();
    if (!url) return;
    try {
      await validateImageUrl(url);
      document.body.style.background = `url('${url}') no-repeat center center fixed`;
      document.body.style.backgroundSize = 'cover';
    } catch {
      showErrorWindow('Invalid Background Image', 'The provided URL is not a valid or supported image.');
    }
  };
  bgSection.appendChild(bgInput);
  bgSection.appendChild(bgButton);

  const fontSection = document.createElement('div');
  fontSection.innerHTML = '<h3>Font Size</h3>';
  const fontSelect = document.createElement('select');
  const fontSizes = ['12px', '14px', '16px', '18px', '20px', '22px', '24px', '26px', '28px', '30px'];
  fontSizes.forEach((size) => {
    const option = document.createElement('option');
    option.value = size;
    option.textContent = size;
    fontSelect.appendChild(option);
  });
  fontSelect.style.width = '100%';
  fontSelect.style.padding = '8px';
  fontSelect.onchange = () => {
    document.body.style.fontSize = fontSelect.value;
  };
  fontSection.appendChild(fontSelect);

  const appSection = document.createElement('div');
  appSection.innerHTML = '<h3>Add Custom App</h3>';
  const appNameInput = document.createElement('input');
  appNameInput.type = 'text';
  appNameInput.placeholder = 'App Name';
  appNameInput.style.width = '100%';
  appNameInput.style.padding = '8px';
  appNameInput.style.marginBottom = '5px';
  appNameInput.style.background = '#333';
  appNameInput.style.color = '#fff';
  appNameInput.style.border = 'none';
  appNameInput.style.borderRadius = '4px';

  const appIconInput = document.createElement('input');
  appIconInput.type = 'text';
  appIconInput.placeholder = 'Font Awesome Icon (e.g., fa-solid fa-star)';
  appIconInput.style.width = '100%';
  appIconInput.style.padding = '8px';
  appIconInput.style.marginBottom = '5px';
  appIconInput.style.background = '#333';
  appIconInput.style.color = '#fff';
  appIconInput.style.border = 'none';
  appIconInput.style.borderRadius = '4px';

  const appUrlInput = document.createElement('input');
  appUrlInput.type = 'url';
  appUrlInput.placeholder = 'CDN URL of JavaScript file';
  appUrlInput.style.width = '100%';
  appUrlInput.style.padding = '8px';
  appUrlInput.style.marginBottom = '5px';
  appUrlInput.style.background = '#333';
  appUrlInput.style.color = '#fff';
  appUrlInput.style.border = 'none';
  appUrlInput.style.borderRadius = '4px';

  const appButton = document.createElement('button');
  appButton.textContent = 'Add App';
  appButton.style.padding = '8px';
  appButton.style.background = '#555';
  appButton.style.color = '#fff';
  appButton.style.border = 'none';
  appButton.style.borderRadius = '4px';
  appButton.onclick = async () => {
    const name = appNameInput.value.trim();
    const iconClasses = appIconInput.value.trim();
    const url = appUrlInput.value.trim();

    if (!name || !iconClasses || !url) {
      showErrorWindow('Missing Fields', 'Please fill in all fields.');
      return;
    }

    if (!iconClasses.startsWith('fa-')) {
      showErrorWindow('Invalid Icon', 'Icon must be a valid Font Awesome class (e.g., fa-solid fa-star).');
      return;
    }

    try {
      await validateJsUrl(url);
      const desktop = document.getElementById('desktop');
      const appIcon = document.createElement('div');
      appIcon.className = 'app-icon';
      appIcon.innerHTML = `<i class="${iconClasses}"></i>${name}`;
      appIcon.onclick = () => window.manager.launchApp(name);
      desktop.appendChild(appIcon);

      window.customApps = window.customApps || {};
      window.customApps[name] = url;

      appNameInput.value = '';
      appIconInput.value = '';
      appUrlInput.value = '';
    } catch {
      showErrorWindow('Invalid JavaScript URL', 'The provided URL is not a valid or accessible JavaScript file.');
    }
  };
  appSection.appendChild(appNameInput);
  appSection.appendChild(appIconInput);
  appSection.appendChild(appUrlInput);
  appSection.appendChild(appButton);

  container.appendChild(bgSection);
  container.appendChild(fontSection);
  container.appendChild(appSection);
}

async function validateImageUrl(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = resolve;
    img.onerror = () => reject(new Error('Invalid image'));
    img.src = url;
    setTimeout(() => reject(new Error('Image load timeout')), 5000);
  });
}

async function validateJsUrl(url) {
  const response = await fetch(url, { method: 'HEAD' });
  const contentType = response.headers.get('content-type');
  if (!response.ok || !contentType?.includes('javascript')) {
    throw new Error('Invalid JavaScript file');
  }
}