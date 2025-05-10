export const appName = 'App Store';
export const appIcon = '<i class="fa-solid fa-store"></i>';

export function init(content) {
  content.innerHTML = `
  <style>
  .app-store {
    padding: 20px;
  }

  .app-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    gap: 20px;
    max-height: calc(100vh - 150px);
    overflow-y: auto;
  }

  .app-card {
    background: rgba(255, 255, 255, 0.1);
    padding: 15px;
    border-radius: 8px;
    text-align: center;
  }

  .app-card h3 {
    margin: 10px 0;
    font-size: 14px;
  }

  .app-card .app-icon {
    font-size: 32px;
    margin: 0 auto;
  }

  .add-app {
    background: #007acc;
    border: none;
    color: white;
    padding: 8px 12px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 12px;
  }

  .add-app:hover {
    background: #006199;
  }

  .error {
    color: #ff4444;
    padding: 20px;
    text-align: center;
  }
  </style>
  <div class="app-store">
    <div class="app-grid"></div>
    <button id="show-more" style="margin-top: 20px; display: none;">Show More (+5)</button>
  </div>`;

  const appGrid = content.querySelector('.app-grid');
  const showMoreBtn = content.querySelector('#show-more');
  let displayedApps = 10;
  let allApps = [];

  function escapeHtml(unsafe) {
    return unsafe.replace(/&/g, '&amp;')
                 .replace(/</g, '&lt;')
                 .replace(/>/g, '&gt;')
                 .replace(/"/g, '&quot;')
                 .replace(/'/g, '&#039;');
  }

  async function fetchApps() {
    try {
      const reposResponse = await fetch('https://api.github.com/repos/pingvortex/nbOS/contents/AppStore');
      const reposData = await reposResponse.json();
      const appDirs = reposData.filter(item => item.type === 'dir').map(dir => dir.name);

      const apps = [];
      for (const dir of appDirs) {
        try {
          const appResponse = await fetch(`https://api.github.com/repos/pingvortex/nbOS/contents/AppStore/${dir}/app.js`);
          const appData = await appResponse.json();
          const appCode = atob(appData.content);
          
          const appNameMatch = appCode.match(/export const appName = ['"](.*?)['"]/);
          const appIconMatch = appCode.match(/export const appIcon = '(.*?)';/);
          
          if (appNameMatch && appIconMatch) {
            apps.push({
              name: appNameMatch[1],
              icon: appIconMatch[1],
              dir: dir
            });
          }
        } catch (e) {
          console.error(`Error loading app ${dir}:`, e);
        }
      }
      allApps = apps;
      renderApps();
    } catch (error) {
      console.error('App Store error:', error);
      content.innerHTML = `<div class="error">Failed to load apps. Check console for details.</div>`;
    }
  }

  function renderApps() {
    appGrid.innerHTML = allApps
      .slice(0, displayedApps)
      .map(app => `
        <div class="app-card">
          <div class="app-icon">${app.icon}</div>
          <h3>${escapeHtml(app.name)}</h3>
          <button class="add-app" 
                  data-dir="${app.dir}" 
                  data-name="${escapeHtml(app.name)}" 
                  data-icon="${escapeHtml(app.icon)}">
            Add to Desktop
          </button>
        </div>
      `).join('');

    showMoreBtn.style.display = allApps.length > displayedApps ? 'block' : 'none';
  }

  content.addEventListener('click', async (e) => {
    if (e.target.classList.contains('add-app')) {
      const appDir = e.target.dataset.dir;
      const appName = e.target.dataset.name;
      const appIcon = e.target.dataset.icon;
      const appUrl = `https://cdn.jsdelivr.net/gh/pingvortex/nbOS@main/AppStore/${appDir}/app.js`;

      const sanitizedName = escapeHtml(appName);

      window.customApps = window.customApps || {};
      window.customApps[sanitizedName] = appUrl;
      
      const desktop = document.getElementById('desktop');
      desktop.insertAdjacentHTML('beforeend', `
        <div class="app-icon" onclick="manager.launchApp('${sanitizedName}')">
          ${appIcon}
          ${sanitizedName}
        </div>
      `); 
    }
  });

  showMoreBtn.addEventListener('click', () => {
    displayedApps += 5;
    renderApps();
  });

  fetchApps();
}