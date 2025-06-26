// Mock dependencies
jest.mock('react-native', () => ({
    Alert: {
        alert: jest.fn(),
    },
}));

jest.mock('i18next', () => ({
    t: (key: string) => {
        const translations: { [key: string]: string } = {
            'common.error.network': 'Network Error',
            'common.cancel': 'Cancel',
            'common.confirm': 'Confirm',
        };
        return translations[key] || key;
    },
}));

import { Alert } from 'react-native';
import i18next from 'i18next';
import AlertMessage from '../../base/AlertMessage';

describe('AlertMessage', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('shows an alert with just a message string', () => {
        const testMessage = 'Test Message';
        AlertMessage(testMessage);

        expect(Alert.alert).toHaveBeenCalledWith(
            '',
            testMessage,
            [
                {
                    text: 'Confirm',
                    onPress: expect.any(Function),
                },
            ],
            { cancelable: false },
        );
    });

    it('shows an alert with title and message', () => {
        const testTitle = 'Test Title';
        const testMessage = 'Test Message';

        AlertMessage({
            title: testTitle,
            message: testMessage,
        });

        expect(Alert.alert).toHaveBeenCalledWith(
            testTitle,
            testMessage,
            [
                {
                    text: 'Confirm',
                    onPress: expect.any(Function),
                },
            ],
            { cancelable: false },
        );
    });

    it('calls onPressOk when confirm button is pressed', () => {
        const onPressOk = jest.fn();
        const testMessage = 'Test Message';

        AlertMessage({
            message: testMessage,
            onPressOk,
        });

        // Extract onPress function from Alert.alert call parameters
        const args = (Alert.alert as jest.Mock).mock.calls[0];
        const buttons = args[2];
        const confirmButton = buttons[0];

        // Call onPress function
        confirmButton.onPress();

        expect(onPressOk).toHaveBeenCalled();
    });

    it('handles null onPressOk without errors', () => {
        const testMessage = 'Test Message';

        AlertMessage({
            message: testMessage,
            onPressOk: null,
        });

        const args = (Alert.alert as jest.Mock).mock.calls[0];
        const buttons = args[2];
        const confirmButton = buttons[0];

        expect(() => confirmButton.onPress()).not.toThrow();
    });

    it('shows cancel button when cancel is true', () => {
        const testMessage = 'Test Message';

        AlertMessage({
            message: testMessage,
            cancel: true,
        });

        expect(Alert.alert).toHaveBeenCalledWith(
            '',
            testMessage,
            [
                {
                    text: 'Cancel',
                    style: 'default',
                },
                {
                    text: 'Confirm',
                    onPress: expect.any(Function),
                    style: 'default',
                },
            ],
            { cancelable: false },
        );
    });

    it('does not show alert when checkNetworkError is true and message is network error', () => {
        AlertMessage({
            message: i18next.t('common.error.network'),
            checkNetworkError: true,
        });

        expect(Alert.alert).not.toHaveBeenCalled();
    });

    it('shows alert for other messages even when checkNetworkError is true', () => {
        const testMessage = 'Not a network error';

        AlertMessage({
            message: testMessage,
            checkNetworkError: true,
        });

        expect(Alert.alert).toHaveBeenCalled();
    });
});
