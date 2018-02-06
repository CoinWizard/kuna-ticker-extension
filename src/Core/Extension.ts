import CreateProperties = chrome.tabs.CreateProperties;
import Manifest = chrome.runtime.Manifest;
import ExtensionInstance from 'Core/ExtensionInstance';

const extension: ExtensionInstance = new ExtensionInstance();

declare global {
    const VERSION: string;
}

interface RuntimeInterface {
    onMessage: chrome.runtime.ExtensionMessageEvent;
    onInstalled: chrome.runtime.ExtensionMessageEvent;

    connect(connectInfo?: chrome.runtime.ConnectInfo): chrome.runtime.Port;
}

interface TabsInterface {
    create(props?: chrome.tabs.CreateProperties): void;
}

export default class ExtensionPlatform {

    static getExtension(): ExtensionInstance {
        return extension;
    }

    static reload() {
        extension.runtime.reload();
    }

    /**
     * Extract Tabs function
     */
    static getTabs(): TabsInterface {
        return extension.tabs;
    }

    /**
     * extract Runtime object function
     */
    static getRuntime(): RuntimeInterface {
        return extension.runtime;
    }

    static openWindow(createProperties: CreateProperties,
                      callback: Function = null) {

        extension.tabs.create(createProperties, callback);
    }

    static getManifest(): Manifest {
        return extension.runtime.getManifest();
    }
}