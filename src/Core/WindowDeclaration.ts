declare global {
    interface ApplicationWindow extends Window {
        __REDUX_DEVTOOLS_EXTENSION__: any;
    }

    declare var window: ApplicationWindow;
}
