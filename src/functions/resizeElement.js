export function resizeElement(elmnt) {
    const minWidth = 200;
    const minHeight = 100;
    let isResizing = false;
    let resizeDirection = '';
    let startX, startY, startWidth, startHeight;

    const handles = [
        // These are glitching and im lazy to fix them
        // { class: 'resize-handle se', cursor: 'se-resize', directions: ['right', 'bottom'] },
        // { class: 'resize-handle sw', cursor: 'sw-resize', directions: ['left', 'bottom'] },
        //{ class: 'resize-handle ne', cursor: 'ne-resize', directions: ['right', 'top'] },
        // { class: 'resize-handle nw', cursor: 'nw-resize', directions: ['left', 'top'] },
        { class: 'resize-handle e', cursor: 'e-resize', directions: ['right'] },
        { class: 'resize-handle w', cursor: 'w-resize', directions: ['left'] },
        { class: 'resize-handle s', cursor: 's-resize', directions: ['bottom'] }
    ];

    handles.forEach(handle => {
        const div = document.createElement('div');
        div.className = handle.class;
        div.style.position = 'absolute';
        div.style.cursor = handle.cursor;

        if (handle.directions.includes('top')) div.style.top = '-5px';
        if (handle.directions.includes('bottom')) div.style.bottom = '-5px';
        if (handle.directions.includes('left')) div.style.left = '-5px';
        if (handle.directions.includes('right')) div.style.right = '-5px';

        if (handle.directions.length === 1) {
            if (handle.directions[0] === 'left' || handle.directions[0] === 'right') {
                div.style.width = '10px';
                div.style.height = '100%';
                div.style.top = '0';
            } else if (handle.directions[0] === 'bottom') {
                div.style.height = '10px';
                div.style.width = '100%';
                div.style.left = '0';
            }
        } else {
            div.style.width = '10px';
            div.style.height = '10px';
        }

        div.addEventListener('mousedown', (e) => startResize(e, handle.directions));
        elmnt.appendChild(div);
    });

    function startResize(e, directions) {
        e.preventDefault();
        isResizing = true;
        resizeDirection = directions;
        startX = e.clientX;
        startY = e.clientY;
        startWidth = elmnt.offsetWidth;
        startHeight = elmnt.offsetHeight;

        document.addEventListener('mousemove', resize);
        document.addEventListener('mouseup', stopResize);
    }

    function resize(e) {
        if (!isResizing) return;
        e.preventDefault();

        let newWidth = startWidth;
        let newHeight = startHeight;
        let newLeft = parseFloat(elmnt.style.left) || 0;
        let newTop = parseFloat(elmnt.style.top) || 0;

        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        if (resizeDirection.includes('right')) {
            newWidth = Math.max(minWidth, startWidth + (e.clientX - startX));
            newWidth = Math.min(newWidth, windowWidth - newLeft);
        }
        if (resizeDirection.includes('left')) {
            const deltaX = startX - e.clientX;
            newWidth = Math.max(minWidth, startWidth + deltaX);
            newWidth = Math.min(newWidth, windowWidth - (newLeft - deltaX));
            newLeft = Math.max(0, newLeft - (newWidth - startWidth));
        }
        if (resizeDirection.includes('bottom')) {
            newHeight = Math.max(minHeight, startHeight + (e.clientY - startY));
            newHeight = Math.min(newHeight, windowHeight - newTop - 40);
        }
        if (resizeDirection.includes('top') && !resizeDirection.includes('bottom')) {
            const deltaY = startY - e.clientY;
            newHeight = Math.max(minHeight, startHeight + deltaY);
            newHeight = Math.min(newHeight, windowHeight - (newTop - deltaY));
            newTop = Math.max(0, newTop - (newHeight - startHeight));
        }

        elmnt.style.width = `${newWidth}px`;
        elmnt.style.height = `${newHeight}px`;
        elmnt.style.left = `${newLeft}px`;
        elmnt.style.top = `${newTop}px`;
    }

    function stopResize() {
        isResizing = false;
        document.removeEventListener('mousemove', resize);
        document.removeEventListener('mouseup', stopResize);
    }
}