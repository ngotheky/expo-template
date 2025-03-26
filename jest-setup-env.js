// Define FormData before any other imports
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

// XMLHttpRequest mock
global.XMLHttpRequest = jest.fn(() => ({
    open: jest.fn(),
    send: jest.fn(),
    setRequestHeader: jest.fn(),
}));

// Other browser APIs that might be needed
global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve({}),
        text: () => Promise.resolve(''),
        ok: true,
    }),
);

global.FileReader = class FileReader {
    readAsDataURL() {
        this.onloadend && this.onloadend();
    }
};

global.URL.createObjectURL = jest.fn();

// Needed for React Native
global.window = global;
global.window.addEventListener = jest.fn();
global.window.removeEventListener = jest.fn();
