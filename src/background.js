// import './cross-origin-handler';

import { wrapStore } from 'react-chrome-redux';
import { STORE_KEY } from 'Core/Constant';
import ExtensionPlatform from 'Core/Extension';
import store from 'Core/Store';
import { setupContextMenu } from 'background/ExtensionSetup';
import { RootController } from 'background/controller';


const initBackground = () => {
    wrapStore(store, {
        portName: STORE_KEY
    });

    window.getState = () => {
        return store.getState();
    };

    new RootController(store);

    ExtensionPlatform.getExtension().browserAction.setBadgeBackgroundColor({
        color: '#5850FA'
    });
};


document.addEventListener('DOMContentLoaded', initBackground);
setupContextMenu();


ExtensionPlatform.getRuntime().onInstalled.addListener((event) => {
    switch (event.reason) {
        case 'install':
            break;

        case 'update':
            break;
    }
});
