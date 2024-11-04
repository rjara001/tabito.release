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

// wwwroot/js/clientInfo.js
window.getClientIpAndDeviceInfo = async function () {
    // Fetch client IP address using a public API
    const ipResponse = await fetch('https://api.ipify.org?format=json');
    const ipData = await ipResponse.json();
    const ipAddress = ipData.ip;
    const language = navigator.language || navigator.userLanguage;
    const languages = navigator.languages;

    // Get device information using the navigator object
    const userAgent = navigator.userAgent || "Unknown";
    const platform = navigator.platform || "Unknown";

    return {
        ipAddress: ipAddress,
        userAgent: userAgent,
        platform: platform,
        language: language,
        languages: languages
    };
}
window.bindPreventDropdownClose = function (dropdownElement) {
    if (dropdownElement) {
        dropdownElement.addEventListener('click', function (event) {
            // Allow clicks on button elements to propagate (bypass stopPropagation)
            if (event.target.tagName.toLowerCase() !== 'button' && event.target.tagName.toLowerCase() !== 'li') {
                event.stopPropagation();
            }
        });
    }
};
window.preventDropdownCloseForAutoComplete = function (autoCompleteElement) {
    if (autoCompleteElement) {
        // Stop propagation on any click within the AutoComplete area
        autoCompleteElement.addEventListener('click', function (event) {
            event.stopPropagation();
        });
    }
};