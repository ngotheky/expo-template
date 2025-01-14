import { logger } from './helper';

jest.mock('@react-native-async-storage/async-storage', () =>
    require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

describe('logger', () => {
    const originalDev = __DEV__;
    const originalConsoleLog = console.log;
    const originalConsoleWarn = console.warn;

    beforeEach(() => {
        (global as any).__DEV__ = true;
        console.log = jest.fn();
        console.warn = jest.fn();
    });

    afterEach(() => {
        (global as any).__DEV__ = originalDev;
        console.log = originalConsoleLog;
        console.warn = originalConsoleWarn;
    });

    it('should log message using console.log when __DEV__ is true and isWarning is false', () => {
        const message = 'Test message';
        logger(message);

        expect(console.log).toHaveBeenCalledWith(message);
    });

    it('should log message and params using console.log when __DEV__ is true and isWarning is false', () => {
        const message = 'Test message';
        const params = { key: 'value' };
        logger(message, false, params);

        expect(console.log).toHaveBeenCalledWith(message, params);
    });

    it('should log warning message using console.warn when __DEV__ is true and isWarning is true', () => {
        const message = 'Test warning message';
        logger(message, true);

        expect(console.warn).toHaveBeenCalledWith(message);
    });

    it('should log warning message and params using console.warn when __DEV__ is true and isWarning is true', () => {
        const message = 'Test warning message';
        const params = { key: 'value' };
        logger(message, true, params);

        expect(console.warn).toHaveBeenCalledWith(message, params);
    });

    it('should not log anything when __DEV__ is false', () => {
        (global as any).__DEV__ = false;
        const message = 'Test message';
        logger(message);

        expect(console.log).not.toHaveBeenCalled();
        expect(console.warn).not.toHaveBeenCalled();
    });
});
