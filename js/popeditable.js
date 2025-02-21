function moveFirstToLast(container) {
    // Select the parent container

    // Select the first child (pencil) and last child (clipboard) elements
    const firstElement = container.firstElementChild;
    const lastElement = container.lastElementChild;
    
    if (firstElement && lastElement) {
        // Move the first element (pencil) to the last position in the container
        container.appendChild(firstElement); // This moves the first child to the end of the container
    }
}

function showElement(element) {

    if (element) {
        element.classList.remove('d-none');
    }
}

function hidElement(element) {

    if (element) {
        element.classList.add('d-none');
    }
}

function initializePopups() {
    const actions = document.querySelectorAll('.actions');

    actions.forEach(action => {
        const popUp = action.nextElementSibling; // Get the corresponding pop-up
        if (!popUp) return;

        const cellParent = action.parentElement;
        const cellElement = cellParent.querySelector('.element-1');

        const pen = action.querySelector('.downdrop-trigger');
        const copy = action.querySelector('.copy-trigger');
        const paste = action.querySelector('.paste-trigger');

        if (cellParent) {
            if (!cellParent._clickEventAdded)
                cellParent.addEventListener('click', () => {

                    showElement(pen);
                    showElement(copy);
                    if (paste.classList.contains('active'))
                    {
                        // moveFirstToLast(action);
                        showElement(paste);
                    }                    
                });
            cellParent._clickEventAdded = true;
                
            cellParent.addEventListener('mouseleave', () => {
                const copy = pen.nextElementSibling;
                const paste = copy.nextElementSibling;

                hidElement(pen);
                hidElement(copy);
                hidElement(paste);
                // if (paste.classList.contains('opacity-0'))
                // {
                //     moveFirstToLast(action);
                //     moveFirstToLast(action);
                // }
                    
            });
        }

        let hideTimeout;

        pen.addEventListener('click', function (event) {
            showPopUp(event.target, popUp);
        });

        // Add close button functionality
        const closeButton = popUp.querySelector('.popup-close');
        if (closeButton) {
            closeButton.addEventListener('click', function () {
                hidePopUp(popUp);
            });
        }   

        function showPopUp(pen, popUp) {
            clearTimeout(hideTimeout);
            popUp.classList.remove('hide');
            popUp.classList.add('show'); // Make popup visible

            const buttonRect = pen.getBoundingClientRect();
            let popUpX = buttonRect.left;
            let popUpY = buttonRect.top - popUp.offsetHeight - 10 + window.scrollY;

            const windowWidth = window.innerWidth;
            const popUpRect = popUp.getBoundingClientRect();

            // Adjust position if overflowing
            if (popUpX + popUpRect.width > windowWidth) {
                popUpX = windowWidth - popUpRect.width - 10;
            }
            if (popUpY < 0) {
                popUpY = buttonRect.bottom + 10 + window.scrollY;
            }

            // Set the position
            popUp.style.left = `${popUpX}px`;
            popUp.style.top = `${popUpY}px`;

            hideTimeout = setTimeout(() => hidePopUp(popUp), 3000);
        }

        function hidePopUp(popUp) {
            // Check if any input inside the popup is focused
            const activeElement = document.activeElement;
            if (popUp.contains(activeElement) && (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA')) {
                return; // Do not hide if user is typing
            }

            popUp.classList.add('hide');
            popUp.classList.remove('show'); // Hide popup
        }

        // Handle mouse enter and leave events
        popUp.addEventListener('mouseenter', () => {
            clearTimeout(hideTimeout);
        });

        popUp.addEventListener('mouseleave', () => {
            hideTimeout = setTimeout(() => hidePopUp(popUp), 1000);
        });
    });
}
