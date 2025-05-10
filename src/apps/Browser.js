export const appName = 'Browser'
export const appIcon = '<i class="fa-solid fa-globe"></i>'

export function init(container) {
    container.style.display = 'flex'
    container.style.flexDirection = 'column'
    container.style.background = '#111'
  
    const nav = document.createElement('div')
    nav.style.display = 'flex'
    nav.style.background = '#222'
    nav.style.padding = '6px'
    nav.style.borderBottom = '1px solid #444'
  
    const input = document.createElement('input')
    input.placeholder = 'Enter URL'
    input.style.flex = '1'
    input.style.padding = '6px'
    input.style.background = '#333'
    input.style.color = '#fff'
    input.style.border = 'none'
    input.style.borderRadius = '4px'
    input.style.marginRight = '6px'
  
    const button = document.createElement('button')
    button.textContent = 'Go'
    button.style.padding = '6px 12px'
    button.style.background = '#555'
    button.style.color = '#fff'
    button.style.border = 'none'
    button.style.borderRadius = '4px'
  
    nav.appendChild(input)
    nav.appendChild(button)
  
    const iframe = document.createElement('iframe')
    iframe.style.flex = '1'
    iframe.style.border = 'none'
  
button.onclick = () => {
  let url = input.value.trim();
  if (!url) return;
  try {
    const parsedUrl = new URL(url.match(/^(https?:\/\/)/) ? url : `https://${url}`);
    if (parsedUrl.protocol !== 'https:' && parsedUrl.protocol !== 'http:') throw new Error('Invalid protocol');
    iframe.src = parsedUrl.toString();
  } catch {
    iframe.src = 'about:blank';
  }
};
  
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') button.click()
    })
  
    container.appendChild(nav)
    container.appendChild(iframe)
  }
  