// ===============================
// SAFE WRAPPER (OBLIGATORIO)
// ===============================
function safeInvoke(dotnetHelper, method, ...args) {
    if (!dotnetHelper) return;

    try {
        const p = dotnetHelper.invokeMethodAsync(method, ...args);
        if (p && p.catch) {
            p.catch(() => { /* runtime muerto, ignorar */ });
        }
    } catch {
        /* runtime muerto, ignorar */
    }
}

function saveAsFile(fileName, byteBase64) {
    const link = document.createElement('a');
    link.download = fileName;
    link.href = 'data:application/octet-stream;base64,' + byteBase64;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

async function extractPdfText(fileBytes) {
    let pdfData = new Uint8Array(fileBytes);
    let loadingTask = pdfjsLib.getDocument({ data: pdfData });
    let pdf = await loadingTask.promise;
    let text = "";
    for (let i = 1; i <= pdf.numPages; i++) {
        let page = await pdf.getPage(i);
        let textContent = await page.getTextContent();
        text += textContent.items.map(s => s.str).join(" ") + "\n";
    }
    return text;
}

window.clickOutsideHandler = {
    initialize: function (element, dotNetHelper) {
        let disposed = false;

        function handleClick(event) {
            if (disposed) return;
            if (!element.contains(event.target)) {
                safeInvoke(dotNetHelper, 'HandleClickOutside');
            }
        }

        document.addEventListener('click', handleClick);

        return {
            dispose: function () {
                disposed = true;
                document.removeEventListener('click', handleClick);
                dotNetHelper = null;
            }
        };
    }
};

window.resizeHandler = {
    initialize: function (dotnetHelper) {
        let disposed = false;

        function reportSize() {
            if (disposed) return;
            safeInvoke(dotnetHelper, 'SetIsMobile', window.innerWidth <= 768);
        }

        reportSize();
        window.addEventListener('resize', reportSize);

        return {
            dispose: () => {
                disposed = true;
                window.removeEventListener('resize', reportSize);
                dotnetHelper = null;
            }
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
window.setCursorStyle = function (style) {
    document.body.style.cursor = style;
};

window.isOnline = () => {
    return navigator.onLine;
};