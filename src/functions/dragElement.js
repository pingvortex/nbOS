export function dragElement(elmnt, dragHandle) {
    let offsetX = 0, offsetY = 0;
    let zIndex = 1;

    dragHandle.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
        e.preventDefault();
        offsetX = e.clientX - elmnt.offsetLeft;
        offsetY = e.clientY - elmnt.offsetTop;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
        elmnt.style.zIndex = zIndex++;
    }

    function elementDrag(e) {
        e.preventDefault();
        let newLeft = e.clientX - offsetX;
        let newTop = e.clientY - offsetY;

        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        const elmntWidth = elmnt.offsetWidth;
        const elmntHeight = elmnt.offsetHeight;

        const headerHeight = dragHandle.offsetHeight;
        newLeft = Math.max(0, Math.min(newLeft, windowWidth - elmntWidth));
        newTop = Math.max(0, Math.min(newTop, windowHeight - elmntHeight));

        const cursorX = e.clientX;
        const cursorY = e.clientY;
        const headerLeft = newLeft;
        const headerRight = newLeft + elmntWidth;
        const headerTop = newTop;
        const headerBottom = newTop + headerHeight;

        if (cursorX < headerLeft) newLeft = cursorX;
        if (cursorX > headerRight) newLeft = cursorX - elmntWidth;
        if (cursorY < headerTop) newTop = cursorY;
        if (cursorY > headerBottom) newTop = cursorY - headerHeight;

        newLeft = Math.max(0, Math.min(newLeft, windowWidth - elmntWidth));
        newTop = Math.max(0, Math.min(newTop, windowHeight - elmntHeight));

        elmnt.style.left = newLeft + 'px';
        elmnt.style.top = newTop + 'px';
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}
