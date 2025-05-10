export const appName = 'Files';
export const appIcon = '<i class="fa-solid fa-folder"></i>';

export function init(container) {
  container.style.display = 'flex';
  container.style.flexDirection = 'column';
  container.style.padding = '10px';

const soon = document.createElement('div');
  soon.innerHTML = '<h3>App under development</h3><p>Please check later</p>';
  soon.style.textAlign = 'center';
  soon.style.color = '#fff';
  container.appendChild(soon);
}