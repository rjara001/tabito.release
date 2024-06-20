Bugfender.init({
    appKey: 'NUpXglqGenYYfw7URfVjm64f1sTOQ5hj',
    // apiURL: 'https://api.bugfender.com/', //Usually not required, should be used for on-premises or custom data centers
    // baseURL: 'https://dashboard.bugfender.com',  //Usually not required, should be used for on-premises or custom data centers
    // overrideConsoleMethods: true,
    printToConsole: true,
    // registerErrorHandler: true,
    // logBrowserEvents: true,
    // logUIEvents: true,
    // version: '',
    // build: '',
});

window.BugDefenderJsFunctions = {
    logClient: function (text, type) {

        switch (type) {
            case 'trace':
                {
                    Bugfender.log(text);
                }
                break;
            case 'info':
                {
                    Bugfender.info(text);
                }
                break;
            case 'log':
                {
                    Bugfender.log(text);
                }
                break;
            case 'warn':
                {
                    Bugfender.warn(text);
                }
                break;
            case 'error':
                {
                    Bugfender.error(text);
                }
                break;
            case 'fatal':
                {
                    Bugfender.fatal(text);
                }
                break;
        }

    }
};
