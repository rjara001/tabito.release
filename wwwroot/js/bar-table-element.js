window.BarTableElementPopover = (() => {

    return {
        open: (popoverOrId) => {
            // If a string (ID) is passed, get the element
            const popover = typeof popoverOrId === 'string' 
                ? document.getElementById(popoverOrId) 
                : popoverOrId;

            if (!popover || !(popover instanceof HTMLElement)) {
                console.warn('Popover element not found');
                return;
            }

            // Toggle current popover
            if (popover.classList.contains('active')) {
                popover.classList.remove('active');
            } else {
                popover.classList.add('active');
            }
        }
    };
})();
