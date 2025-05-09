export const appName = 'test';
export const appIcon = '<i class="fa-solid fa-star"></i>';

export function init(container) {
  container.style.display = 'flex';
  container.style.flexDirection = 'column';
  container.style.padding = '10px';

const a = document.createElement('div');
  a.innerHTML = '<h3>Test</h3><p>test</p>';
  a.style.textAlign = 'center';
  a.style.color = '#fff';
  container.appendChild(a);
}
