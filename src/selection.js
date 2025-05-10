const selectionRectangle = document.getElementById('selection-rectangle');
const desktop = document.getElementById('desktop');

document.addEventListener('DOMContentLoaded', () => {
  let isDragging = false;
  let startX, startY;

  desktop.addEventListener('mousedown', (e) => {
    if (e.target !== desktop) return;
    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;

    selectionRectangle.style.left = `${startX}px`;
    selectionRectangle.style.top = `${startY}px`;
    selectionRectangle.style.width = '0';
    selectionRectangle.style.height = '0';
    selectionRectangle.style.display = 'block';

    document.querySelectorAll('.app-icon.selected').forEach((icon) => icon.classList.remove('selected'));
  });

  desktop.addEventListener('mousemove', (e) => {
    if (!isDragging) return;

    const currentX = e.clientX;
    const currentY = e.clientY;
    const width = Math.abs(currentX - startX);
    const height = Math.abs(currentY - startY);
    const left = Math.min(currentX, startX);
    const top = Math.min(currentY, startY);

    selectionRectangle.style.left = `${left}px`;
    selectionRectangle.style.top = `${top}px`;
    selectionRectangle.style.width = `${width}px`;
    selectionRectangle.style.height = `${height}px`;

    const rect = selectionRectangle.getBoundingClientRect();
    document.querySelectorAll('.app-icon').forEach((icon) => {
      const iconRect = icon.getBoundingClientRect();
      const isSelected =
        iconRect.left < rect.right &&
        iconRect.right > rect.left &&
        iconRect.top < rect.bottom &&
        iconRect.bottom > rect.top;
      icon.classList.toggle('selected', isSelected);
    });
  });

  desktop.addEventListener('mouseup', () => {
    isDragging = false;
    selectionRectangle.style.display = 'none';
  });

  desktop.addEventListener('mouseleave', () => {
    if (isDragging) {
      isDragging = false;
      selectionRectangle.style.display = 'none';
    }
  });

  desktop.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    const selectedIcons = document.querySelectorAll('.app-icon.selected');
    if (selectedIcons.length === 0 || (e.target !== desktop && !e.target.classList.contains('app-icon'))) return;

    const menu = document.createElement('div');
    menu.style.position = 'absolute';
    menu.style.left = `${e.clientX}px`;
    menu.style.top = `${e.clientY}px`;
    menu.style.background = '#2e2e2e';
    menu.style.border = '1px solid #555';
    menu.style.padding = '5px';
    menu.style.zIndex = '1000';
    menu.style.borderRadius = '16px';

    const menuItem = document.createElement('div');
    menuItem.style.cursor = 'pointer';
    menuItem.style.padding = '5px';
    menuItem.textContent = 'Open Selected';
    menuItem.addEventListener('click', () => {
      selectedIcons.forEach((icon) => {
        const appName = icon.textContent.trim();
        window.manager.launchApp(appName);
      });
      menu.remove();
    });
    menu.appendChild(menuItem);
    document.body.appendChild(menu);

    const removeMenu = () => {
      menu.remove();
      document.removeEventListener('click', removeMenu);
    };
    setTimeout(() => document.addEventListener('click', removeMenu), 0);
  });
});