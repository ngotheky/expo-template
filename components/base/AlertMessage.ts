import i18next from 'i18next';
import { Alert } from 'react-native';

interface Props {
    message: string;
    title?: string;
    onPressOk?: any;
    cancel?: boolean;
    checkNetworkError?: boolean;
}

function AlertMessage(message: string): void;
function AlertMessage(props: Props): void;

/**
 * Displays an alert message with optional title, confirmation, and cancellation actions.
 *
 * @param arg - A string representing the message or an object containing the alert properties.
 *
 * @typedef Props
 * @property {string} message - The message to display in the alert.
 * @property {string} [title] - The optional title of the alert.
 * @property {() => void} [onPressOk] - The optional callback function to execute when the confirm button is pressed.
 * @property {boolean} [cancel] - Whether to show a cancel button in the alert.
 * @property {boolean} [checkNetworkError] - Whether to check for a network error message.
 *
 * If `checkNetworkError` is true and the message is a network error, the alert will not be shown.
 * Otherwise, an alert will be displayed with the provided message and optional title.
 * If `cancel` is true, a cancel button will be shown alongside the confirm button.
 * The `onPressOk` callback will be executed when the confirm button is pressed.
 */
function AlertMessage(arg: string | Props) {
    const props: Props = typeof arg === 'string' ? { message: arg } : arg;

    const { message, title, onPressOk, cancel, checkNetworkError } = props;
    if (!(checkNetworkError && message === i18next.t('common.error.network'))) {
        Alert.alert(
            title || '',
            message,
            cancel
                ? [
                      {
                          text: i18next.t('common.cancel'),
                          style: 'default',
                      },
                      {
                          text: i18next.t('common.confirm'),
                          onPress: () => {
                              if (typeof onPressOk === 'function') {
                                  onPressOk();
                              }
                          },
                          style: 'default',
                      },
                  ]
                : [
                      {
                          text: i18next.t('common.confirm'),
                          onPress: () => {
                              if (typeof onPressOk === 'function') {
                                  onPressOk();
                              }
                          },
                      },
                  ],
            { cancelable: false },
        );
    }
}
export default AlertMessage;
