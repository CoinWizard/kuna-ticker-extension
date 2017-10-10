import extension from 'extensionizer';

export default class ExtensionPlatform {

    getExtension() {
        return extension;
    }

    reload() {
        extension.runtime.reload();
    }

    openWindow({url}) {
        extension.tabs.create({url});
    }

    getVersion() {
        return extension.runtime.getManifest().version;
    }
}