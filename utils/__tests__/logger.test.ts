import { logger, apiLogger } from '../logger';

// Mock console methods
const originalLog = console.log;
const originalWarn = console.warn;

describe('Logger', () => {
    beforeEach(() => {
        console.log = jest.fn();
        console.warn = jest.fn();
        // Mock __DEV__ to be true for testing
        (global as any).__DEV__ = true;
    });

    afterAll(() => {
        console.log = originalLog;
        console.warn = originalWarn;
    });

    describe('logger function', () => {
        it('should log message when __DEV__ is true and isWarning is false', () => {
            const message = 'Test log message';
            const params = { test: 'data' };

            logger(message, false, params);

            expect(console.log).toHaveBeenCalledWith(message, params);
            expect(console.warn).not.toHaveBeenCalled();
        });

        it('should warn message when __DEV__ is true and isWarning is true', () => {
            const message = 'Test warning message';
            const params = { error: 'data' };

            logger(message, true, params);

            expect(console.warn).toHaveBeenCalledWith(message, params);
            expect(console.log).not.toHaveBeenCalled();
        });

        it('should log message when isWarning is undefined (defaults to false)', () => {
            const message = 'Test default message';
            const params = 'test params';

            logger(message, undefined, params);

            expect(console.log).toHaveBeenCalledWith(message, params);
            expect(console.warn).not.toHaveBeenCalled();
        });

        it('should handle message without params', () => {
            const message = 'Test message without params';

            logger(message);

            expect(console.log).toHaveBeenCalledWith(message, undefined);
        });

        it('should not log when __DEV__ is false', () => {
            (global as any).__DEV__ = false;
            const message = 'Test message';

            logger(message, false, 'params');
            logger(message, true, 'params');

            expect(console.log).not.toHaveBeenCalled();
            expect(console.warn).not.toHaveBeenCalled();
        });
    });

    describe('apiLogger function', () => {
        it('should log api message when __DEV__ is true', () => {
            const message = 'API Request';
            const color = 'blue';
            const params = { url: '/api/test', method: 'GET' };

            apiLogger(message, color, params);

            expect(console.log).toHaveBeenCalledWith(message, color, params);
        });

        it('should handle null/undefined params', () => {
            const message = 'API Request';
            const color = 'red';

            apiLogger(message, color, null);

            expect(console.log).toHaveBeenCalledWith(message, color, null);
        });

        it('should handle empty string color', () => {
            const message = 'API Request';
            const params = { data: 'test' };

            apiLogger(message, '', params);

            expect(console.log).toHaveBeenCalledWith(message, '', params);
        });

        it('should not log when __DEV__ is false', () => {
            (global as any).__DEV__ = false;
            const message = 'API Request';
            const color = 'green';
            const params = { test: 'data' };

            apiLogger(message, color, params);

            expect(console.log).not.toHaveBeenCalled();
        });
    });

    describe('edge cases', () => {
        it('should handle very long messages', () => {
            const longMessage = 'A'.repeat(10000);

            logger(longMessage);

            expect(console.log).toHaveBeenCalledWith(longMessage, undefined);
        });

        it('should handle special characters in message', () => {
            const specialMessage = 'Message with 特殊文字 and émojis 🚀';

            logger(specialMessage);

            expect(console.log).toHaveBeenCalledWith(specialMessage, undefined);
        });

        it('should handle complex object params', () => {
            const message = 'Complex object test';
            const complexParams = {
                nested: {
                    array: [1, 2, 3],
                    object: { key: 'value' },
                    function: () => 'test',
                    null: null,
                    undefined: undefined,
                },
            };

            logger(message, false, complexParams);

            expect(console.log).toHaveBeenCalledWith(message, complexParams);
        });
    });
});
