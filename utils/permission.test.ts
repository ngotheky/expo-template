import { checkCamera, checkLocation, checkPhoto } from './permission';
import { Camera, PermissionStatus } from 'expo-camera';
import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker';
import { Alert, Linking, Platform } from 'react-native';

jest.mock('expo-camera', () => ({}));
jest.mock('expo-location', () => ({}));
jest.mock('expo-image-picker', () => ({}));
jest.mock('@react-native-async-storage/async-storage', () => ({}));
jest.mock('react-native', () => ({
    Alert: {
        alert: jest.fn(),
    },
    Linking: {
        openSettings: jest.fn(),
    },
    Platform: {
        OS: 'ios',
    },
}));
jest.mock('i18next', () => ({
    t: jest.fn(key => key),
}));

describe('Permission Utils', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('checkCamera', () => {
        it('should return true if camera permission is granted', async () => {
            Camera.getCameraPermissionsAsync.mockResolvedValue({ status: PermissionStatus.GRANTED });
            const result = await checkCamera();
            expect(result).toBe(true);
        });

        it('should request permission if camera permission is denied and return true if granted', async () => {
            Camera.getCameraPermissionsAsync.mockResolvedValue({ status: PermissionStatus.DENIED });
            Camera.requestCameraPermissionsAsync.mockResolvedValue({ status: PermissionStatus.GRANTED });
            const result = await checkCamera();
            expect(result).toBe(true);
        });

        it('should show request permission alert if camera permission is undetermined', async () => {
            Camera.getCameraPermissionsAsync.mockResolvedValue({ status: PermissionStatus.UNDETERMINED });
            const result = await checkCamera();
            expect(result).toBe(false);
            expect(Alert.alert).toHaveBeenCalled();
        });
    });

    describe('checkLocation', () => {
        it('should return true if location permission is granted', async () => {
            Location.getForegroundPermissionsAsync.mockResolvedValue({ status: PermissionStatus.GRANTED });
            const result = await checkLocation();
            expect(result).toBe(true);
        });

        it('should request permission if location permission is denied and return true if granted', async () => {
            Location.getForegroundPermissionsAsync.mockResolvedValue({ status: PermissionStatus.DENIED });
            Location.requestForegroundPermissionsAsync.mockResolvedValue({ status: PermissionStatus.GRANTED });
            const result = await checkLocation();
            expect(result).toBe(true);
        });

        it('should show request permission alert if location permission is undetermined', async () => {
            Location.getForegroundPermissionsAsync.mockResolvedValue({ status: PermissionStatus.UNDETERMINED });
            const result = await checkLocation();
            expect(result).toBe(false);
            expect(Alert.alert).toHaveBeenCalled();
        });
    });

    describe('checkPhoto', () => {
        it('should return true if photo permission is granted', async () => {
            ImagePicker.getMediaLibraryPermissionsAsync.mockResolvedValue({ status: PermissionStatus.GRANTED });
            const result = await checkPhoto();
            expect(result).toBe(true);
        });

        it('should request permission if photo permission is not granted and return true if granted', async () => {
            ImagePicker.getMediaLibraryPermissionsAsync.mockResolvedValue({ status: PermissionStatus.DENIED });
            ImagePicker.requestMediaLibraryPermissionsAsync.mockResolvedValue({ status: PermissionStatus.GRANTED });
            const result = await checkPhoto();
            expect(result).toBe(true);
        });
    });
});
