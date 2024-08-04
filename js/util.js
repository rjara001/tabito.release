function saveAsFile(fileName, byteBase64) {
    const link = document.createElement('a');
    link.download = fileName;
    link.href = 'data:application/octet-stream;base64,' + byteBase64;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

window.clickOutsideHandler = {
    initialize: function (element, dotNetHelper) {
        function handleClick(event) {
            if (!element.contains(event.target)) {
                dotNetHelper.invokeMethodAsync('HandleClickOutside');
            }
        }

        document.addEventListener('click', handleClick);

        return {
            dispose: function () {
                document.removeEventListener('click', handleClick);
            }
        };
    }
};

window.resizeHandler = {
    initialize: function (dotnetHelper) {
        function reportSize() {
            dotnetHelper.invokeMethodAsync('SetIsMobile', window.innerWidth <= 768);
        }

        // Report the initial size
        reportSize();

        // Set up event listener for resize
        window.addEventListener('resize', reportSize);

        // Clean up event listener when no longer needed
        return {
            dispose: () => window.removeEventListener('resize', reportSize)
        };
    },
    isMobile: function () {
        return window.innerWidth <= 768;
    }
};
