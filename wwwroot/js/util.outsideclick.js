window.outsideClickHelper = {
    addOutsideClickListener: function (elementId, dotnetHelper, methodName) {
        function handler(event) {
            const el = document.getElementById(elementId);
            if (el && !el.contains(event.target)) {
                dotnetHelper.invokeMethodAsync(methodName);
            }
        }

        document.addEventListener("click", handler);

        // Store reference to allow removal later
        elHandlers[elementId] = handler;
    },

    removeOutsideClickListener: function (elementId) {
        const handler = elHandlers[elementId];
        if (handler) {
            document.removeEventListener("click", handler);
            delete elHandlers[elementId];
        }
    }
};

const elHandlers = {};
