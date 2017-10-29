import ChromeBrowserInterface = chrome.browser;
import ChromeExtensionInterface = chrome.extension;

declare global {
    interface Window {
        browser: any
    }
}

const apis = [
    'alarms',
    'bookmarks',
    'browserAction',
    'commands',
    'contextMenus',
    'cookies',
    'downloads',
    'events',
    'extension',
    'extensionTypes',
    'history',
    'i18n',
    'idle',
    'notifications',
    'pageAction',
    'runtime',
    'storage',
    'tabs',
    'webNavigation',
    'webRequest',
    'windows',
];

class Extension {

    alarms = null;
    bookmarks = null;
    browserAction = null;
    commands = null;
    contextMenus = null;
    cookies = null;
    downloads = null;
    events = null;
    extension: any = null;
    extensionTypes = null;
    history = null;
    i18n = null;
    idle = null;
    notifications = null;
    pageAction = null;
    runtime = null;
    storage = null;
    tabs = null;
    webNavigation = null;
    webRequest = null;
    windows = null;
    api = null;

    constructor() {
        this.initBaseApi();

        try {
            if (window.browser && window.browser.runtime) {
                this.runtime = window.browser.runtime
            }
        } catch (e) {
        }

        try {
            if (window.browser && window.browser.browserAction) {
                this.browserAction = window.browser.browserAction
            }
        } catch (e) {
        }
    }

    initBaseApi() {
        apis.forEach((api) => {

            this[api] = null;

            try {
                if (chrome[api]) {
                    this[api] = chrome[api]
                }
            } catch (e) {
            }

            try {
                if (window[api]) {
                    this[api] = window[api]
                }
            } catch (e) {
            }

            try {
                if (window.browser[api]) {
                    this[api] = window.browser[api]
                }
            } catch (e) {
            }

            try {
                this.api = window.browser.extension[api]
            } catch (e) {
            }
        });
    }
}

export default Extension;