import ExtensionPlatform from 'Core/Extension';

const extension = ExtensionPlatform.getExtension();

export function setupContextMenu() {
    extension.contextMenus.removeAll();
    extension.contextMenus.create({
        title: "by CoinWizard Team",
        contexts: ["browser_action"],
        onclick: () => {
            extension.tabs.create({
                url: "https://coinwizard.me?src=Kuna_Extension",
            });
        },
    });

    extension.contextMenus.create({
        title: "Source code",
        contexts: ["browser_action"],
        onclick: () => {
            extension.tabs.create({
                url: "https://github.com/CoinWizard/kuna-ticker-extension",
            });
        },
    });
}