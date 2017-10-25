import CreateProperties = chrome.tabs.CreateProperties;
import Manifest = chrome.runtime.Manifest;
import ExtensionInstance from 'Core/ExtensionInstance';

const extension: ExtensionInstance = new ExtensionInstance();

declare global {
    const VERSION: string;
}

export default class ExtensionPlatform {

    static getExtension(): ExtensionInstance {
        return extension;
    }

    static reload() {
        extension.runtime.reload();
    }

    static openWindow(createProperties: CreateProperties,
                      callback: Function = null) {

        extension.tabs.create(createProperties, callback);
    }

    static getManifest(): Manifest {
        return extension.runtime.getManifest();
    }
}