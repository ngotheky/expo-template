import '@testing-library/jest-native/extend-expect';

// Note: global browser APIs like FormData are now defined in jest-setup-env.js
// which runs before any modules are loaded

// Mock React forwardRef to fix "Cannot add property current, object is not extensible" error
jest.mock('react', () => {
    const originalReact = jest.requireActual('react');
    return {
        ...originalReact,
        forwardRef: fn => fn,
    };
});

// Mock react-native-webview to fix "RNCWebViewModule could not be found" error
jest.mock('react-native-webview', () => {
    const React = require('react');
    const { View } = require('react-native');

    return {
        WebView: ({ source, ...props }) => {
            return React.createElement(View, { ...props, testID: 'webview-mock' });
        },
    };
});

// Add any additional test setup code here that should run after modules are loaded
jest.mock('react-native-onesignal', () => ({
    LogLevel: {
        None: 0,
        Fatal: 1,
        Error: 2,
        Warn: 3,
        Info: 4,
        Debug: 5,
        Verbose: 6,
    },
    OSNotification: {},
    OneSignal: {
        setAppId: jest.fn(),
        setLogLevel: jest.fn(),
        promptForPushNotificationsWithUserResponse: jest.fn(() => Promise.resolve(true)),
        setNotificationWillShowInForegroundHandler: jest.fn(),
        setNotificationOpenedHandler: jest.fn(),
        getDeviceState: jest.fn(() => Promise.resolve({ userId: 'test-user-id' })),
        setExternalUserId: jest.fn(() => Promise.resolve()),
        addTrigger: jest.fn(),
        addTriggers: jest.fn(),
        removeTrigger: jest.fn(),
        removeTriggers: jest.fn(),
        sendTag: jest.fn(),
    },
}));

// Add FormData to the global scope
global.FormData = class FormData {
    constructor() {
        this.data = new Map();
    }
    append(key, value) {
        this.data.set(key, value);
    }
    get(key) {
        return this.data.get(key);
    }
    delete(key) {
        this.data.delete(key);
    }
    has(key) {
        return this.data.has(key);
    }
};

// Mock fetch API
global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve({}),
        text: () => Promise.resolve(''),
        ok: true,
    }),
);

// Mock FileReader API
global.FileReader = class FileReader {
    readAsDataURL() {
        this.onloadend && this.onloadend();
    }
};

// Mock URL.createObjectURL
global.URL.createObjectURL = jest.fn();

// Mock XMLHttpRequest
global.XMLHttpRequest = jest.fn(() => ({
    open: jest.fn(),
    send: jest.fn(),
    setRequestHeader: jest.fn(),
}));
