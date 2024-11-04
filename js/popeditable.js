function initializePopups() {
    const pens = document.querySelectorAll('.downdrop-trigger');

    pens.forEach(pen => {
        const popUp = pen.parentElement.nextElementSibling; // Get the corresponding pop-up
        if (!popUp) return;

        const cellParent = popUp.closest('.cell');
        if (cellParent) {
            cellParent.addEventListener('click', () => {
                pen.classList.remove('opacity-0'); // Show button
                pen.classList.add('opacity-100');
            });

            cellParent.addEventListener('mouseleave', () => {
                pen.classList.remove('opacity-100'); // Hide button
                pen.classList.add('opacity-0');
            });
        }

        let hideTimeout;

        pen.addEventListener('click', function (event) {
            showPopUp(event.target, popUp);
        });

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
