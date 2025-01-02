import AsyncStorage from '@react-native-async-storage/async-storage';
import i18next from 'i18next';
import { DevSettings, Platform } from 'react-native';

export const isAndroid = Platform.OS === 'android';

export const isIos = Platform.OS === 'ios';

export function wait(timeout: number): Promise<any> {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
}

export function logger(msg: any, isWarning?: boolean, params?: any): void {
    if (__DEV__ && !isWarning) {
        if (params) console.log(msg, params);
        else console.log(msg);
    }
    if (__DEV__ && isWarning) {
        if (params) console.warn(msg, params);
        else console.warn(msg);
    }
}

export const addMenuClearAsyncStorage = () => {
    if (__DEV__) {
        DevSettings.addMenuItem('Clear AsyncStorage', () => {
            AsyncStorage.clear();
            DevSettings.reload();
        });
    }
};

export const requireField = (field: string) => {
    return i18next.t('error.require', { field }) || '';
};
