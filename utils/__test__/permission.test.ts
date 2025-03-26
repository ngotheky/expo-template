import { checkCamera, checkLocation, checkPhoto } from '../permission';
import { Camera, PermissionStatus } from 'expo-camera';
import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker';
import { Alert } from 'react-native';

// Define mock types
type MockFunction<T> = jest.Mock<Promise<T>>;

jest.mock('expo-camera', () => ({
    Camera: {
        getCameraPermissionsAsync: jest.fn(),
        requestCameraPermissionsAsync: jest.fn(),
    },
    PermissionStatus: {
        GRANTED: 'granted',
        DENIED: 'denied',
        UNDETERMINED: 'undetermined',
    },
}));
jest.mock('expo-location', () => ({
    getForegroundPermissionsAsync: jest.fn(),
    requestForegroundPermissionsAsync: jest.fn(),
}));
jest.mock('expo-image-picker', () => ({
    getMediaLibraryPermissionsAsync: jest.fn(),
    requestMediaLibraryPermissionsAsync: jest.fn(),
}));
jest.mock('@react-native-async-storage/async-storage', () => ({
    setItem: jest.fn(() => Promise.resolve()),
    getItem: jest.fn(() => Promise.resolve(null)),
    removeItem: jest.fn(() => Promise.resolve()),
    clear: jest.fn(() => Promise.resolve()),
    getAllKeys: jest.fn(() => Promise.resolve([])),
    multiGet: jest.fn(() => Promise.resolve([])),
    multiSet: jest.fn(() => Promise.resolve()),
    multiRemove: jest.fn(() => Promise.resolve()),
    mergeItem: jest.fn(() => Promise.resolve()),
    multiMerge: jest.fn(() => Promise.resolve()),
}));
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
            (Camera.getCameraPermissionsAsync as MockFunction<any>).mockResolvedValue({
                status: PermissionStatus.GRANTED,
            });
            const result = await checkCamera();
            expect(result).toBe(true);
        });

        it('should request permission if camera permission is denied and return true if granted', async () => {
            (Camera.getCameraPermissionsAsync as MockFunction<any>).mockResolvedValue({
                status: PermissionStatus.DENIED,
            });
            (Camera.requestCameraPermissionsAsync as MockFunction<any>).mockResolvedValue({
                status: PermissionStatus.GRANTED,
            });
            const result = await checkCamera();
            expect(result).toBe(true);
        });

        it('should show request permission alert if camera permission is undetermined', async () => {
            (Camera.getCameraPermissionsAsync as MockFunction<any>).mockResolvedValue({
                status: PermissionStatus.UNDETERMINED,
            });
            const result = await checkCamera();
            expect(result).toBe(false);
            expect(Alert.alert).toHaveBeenCalled();
        });
    });

    describe('checkLocation', () => {
        it('should return true if location permission is granted', async () => {
            (Location.getForegroundPermissionsAsync as MockFunction<any>).mockResolvedValue({
                status: PermissionStatus.GRANTED,
            });
            const result = await checkLocation();
            expect(result).toBe(true);
        });

        it('should request permission if location permission is denied and return true if granted', async () => {
            (Location.getForegroundPermissionsAsync as MockFunction<any>).mockResolvedValue({
                status: PermissionStatus.DENIED,
            });
            (Location.requestForegroundPermissionsAsync as MockFunction<any>).mockResolvedValue({
                status: PermissionStatus.GRANTED,
            });
            const result = await checkLocation();
            expect(result).toBe(true);
        });

        it('should show request permission alert if location permission is undetermined', async () => {
            (Location.getForegroundPermissionsAsync as MockFunction<any>).mockResolvedValue({
                status: PermissionStatus.UNDETERMINED,
            });
            const result = await checkLocation();
            expect(result).toBe(false);
            expect(Alert.alert).toHaveBeenCalled();
        });
    });

    describe('checkPhoto', () => {
        it('should return true if photo permission is granted', async () => {
            (ImagePicker.getMediaLibraryPermissionsAsync as MockFunction<any>).mockResolvedValue({
                status: PermissionStatus.GRANTED,
            });
            const result = await checkPhoto();
            expect(result).toBe(true);
        });

        it('should request permission if photo permission is not granted and return true if granted', async () => {
            (ImagePicker.getMediaLibraryPermissionsAsync as MockFunction<any>).mockResolvedValue({
                status: PermissionStatus.DENIED,
            });
            (ImagePicker.requestMediaLibraryPermissionsAsync as MockFunction<any>).mockResolvedValue({
                status: PermissionStatus.GRANTED,
            });
            const result = await checkPhoto();
            expect(result).toBe(true);
        });
    });
});
