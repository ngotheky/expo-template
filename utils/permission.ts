import { Camera, PermissionStatus } from 'expo-camera';
import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker';
import i18next from 'i18next';
import { Alert, Linking } from 'react-native';
import { logger } from './helper';

export const checkCamera = async () => {
    const { status } = await Camera.getCameraPermissionsAsync();
    if (status === PermissionStatus.GRANTED) {
        return true;
    }
    const { status: newStatus } = await Camera.requestCameraPermissionsAsync();
    return newStatus === PermissionStatus.GRANTED;
};

export const checkLocation = async () => {
    const { status } = await Location.getForegroundPermissionsAsync();
    if (status === PermissionStatus.DENIED) {
        const { status: newStatus } = await Location.requestForegroundPermissionsAsync();
        return newStatus === PermissionStatus.GRANTED;
    }
    if (status === PermissionStatus.GRANTED) {
        return true;
    }
    if (status === PermissionStatus.UNDETERMINED) {
        showRequestPermission('location');
        return false;
    }
    return false;
};

const messages = {
    camera: i18next.t('permissions.camera'),
    photo: i18next.t('permissions.photo'),
    audio: i18next.t('permissions.audio'),
    location: i18next.t('permissions.location'),
};

export const checkPhoto = async () => {
    const { status } = await ImagePicker.getMediaLibraryPermissionsAsync();
    if (status === PermissionStatus.GRANTED) {
        return true;
    }
    const { status: newStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    return newStatus === PermissionStatus.GRANTED;
};

const showRequestPermission = (type: string) => {
    Alert.alert(
        process.env.APP_NAME ?? '',
        messages[type as keyof typeof messages],
        [
            {
                text: i18next.t('common.cancel'),
                onPress: () => logger('Cancel Pressed'),
                style: 'default',
            },
            {
                text: i18next.t('common.confirm'),
                onPress: () =>
                    Linking.openSettings().catch(() => {
                        console.error('Unable to open settings');
                    }),
            },
        ],
        { cancelable: false },
    );
};
