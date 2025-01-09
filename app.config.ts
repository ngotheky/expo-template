import 'dotenv/config';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import { ConfigContext } from '@expo/config';

module.exports = ({ config }: ConfigContext) => {
    const buildProfile = process.env.NODE_ENV;
    const dotenvFile = `.env.${buildProfile || 'development'}`;
    if (fs.existsSync(dotenvFile)) {
        dotenv.config({ path: dotenvFile });
    } else {
        console.warn(`Environment file ${dotenvFile} does not exist.`);
    }

    return {
        ...config,
        name: process.env.APP_NAME,
        slug: process.env.APP_SLUG,
        orientation: 'portrait',
        icon: './assets/images/icon.png',
        scheme: process.env.APP_SLUG,
        userInterfaceStyle: 'automatic',
        newArchEnabled: true,
        runtimeVersion: '1.0.0',
        ios: {
            supportsTablet: true,
            bundleIdentifier: process.env.IOS_APP_ID,
            buildNumber: process.env.IOS_APP_BUILD_CODE,
            config: {
                googleMapsApiKey: process.env.IOS_GOOGLE_API_KEY,
            },
            infoPlist: {
                NSLocationWhenInUseUsageDescription: 'Allow $(PRODUCT_NAME) to use your location.',
                NSLocationAlwaysUsageDescription: 'Allow $(PRODUCT_NAME) to use your location.',
                NSLocationAlwaysAndWhenInUseUsageDescription: 'Allow $(PRODUCT_NAME) to use your location.',
                NSPhotoLibraryUsageDescription: 'Allow $(PRODUCT_NAME) to access your photos.',
                NSPhotoLibraryAddUsageDescription: 'Allow $(PRODUCT_NAME) to save photos.',
                NSCameraUsageDescription: 'Allow $(PRODUCT_NAME) to access your camera.',
                NSMicrophoneUsageDescription: 'Allow $(PRODUCT_NAME) to access your microphone.',
            },
        },
        android: {
            adaptiveIcon: {
                foregroundImage: './assets/images/adaptive-icon.png',
                backgroundColor: '#FFFFFF',
            },
            package: process.env.ANDROID_APP_ID,
            versionCode: process.env.ANDROID_APP_VERSION_CODE,
            config: {
                googleMaps: {
                    apiKey: process.env.ANDROID_GOOGLE_API_KEY,
                },
            },
            permissions: [
                'android.permission.CAMERA',
                'android.permission.RECORD_AUDIO',
                'android.permission.READ_EXTERNAL_STORAGE',
                'android.permission.WRITE_EXTERNAL_STORAGE',
                'android.permission.ACCESS_MEDIA_LOCATION',
                'android.permission.ACCESS_COARSE_LOCATION',
                'android.permission.ACCESS_FINE_LOCATION',
            ],
        },
        plugins: [
            'expo-router',
            'expo-asset',
            'expo-localization',
            [
                'expo-splash-screen',
                {
                    image: './assets/images/splash-icon.png',
                    imageWidth: 200,
                    resizeMode: 'contain',
                    backgroundColor: '#ffffff',
                },
            ],
            [
                'expo-camera',
                {
                    cameraPermission: 'Allow $(PRODUCT_NAME) to access your camera',
                    microphonePermission: 'Allow $(PRODUCT_NAME) to access your microphone',
                    recordAudioAndroid: true,
                },
            ],
            [
                'expo-media-library',
                {
                    photosPermission: 'Allow $(PRODUCT_NAME) to access your photos.',
                    savePhotosPermission: 'Allow $(PRODUCT_NAME) to save photos.',
                    isAccessMediaLocationEnabled: true,
                },
            ],
            [
                'expo-notifications',
                {
                    icon: './assets/icons/ic_notification.png',
                    color: '#ffffff',
                    defaultChannel: 'default',
                },
            ],
            [
                'expo-location',
                {
                    locationAlwaysAndWhenInUsePermission: 'Allow $(PRODUCT_NAME) to use your location.',
                },
            ],
            [
                'expo-image-picker',
                {
                    photosPermission: 'The app accesses your photos to let you share them with your friends.',
                    cameraPermission: 'The app accesses your camera to let you take photos.',
                },
            ],
        ],
        experiments: {
            typedRoutes: true,
        },
        extra: {
            router: {
                origin: false,
            },
            eas: {
                projectId: process.env.EXPO_PROJECT_ID,
            },
            env: process.env,
        },
        owner: 'kyngodev',
        updates: {
            url: process.env.EAS_UPDATE_URL,
        },
    };
};
