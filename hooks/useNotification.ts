import { LogLevel, OneSignal, OSNotification } from 'react-native-onesignal';
import Constants from 'expo-constants';
import useUserProfile from '@/store/useUserProfile';
import { useEffect } from 'react';
import AlertMessage from '@/components/base/AlertMessage';

/**
 * Custom hook to initialize and manage OneSignal notifications.
 *
 * This hook sets up OneSignal notifications, handles received notifications,
 * and manages user tags based on the user's profile.
 *
 * @returns {void}
 *
 * @example
 * ```typescript
 * const { profile } = useUserProfile();
 * useNotification();
 * ```
 *
 * @remarks
 * - Initializes OneSignal with the app ID from the Expo config.
 * - Requests notification permissions.
 * - Adds event listeners for notification click and foreground display events.
 * - Logs in the user to OneSignal and adds a tag with the user's profile ID.
 * - Removes the tag and logs out the user if the profile ID is not available.
 * - Cleans up event listeners on component unmount.
 *
 * @throws {Error} If there is an issue initializing OneSignal or handling notifications.
 */
function useNotification() {
    const { profile } = useUserProfile();

    useEffect(() => {
        initOneSignal();
        return () => {
            OneSignal.Notifications.removeEventListener('click', res => {
                console.log('remove event click');
            });
            OneSignal.Notifications.removeEventListener('foregroundWillDisplay', res => {
                console.log('remove event foregroundWillDisplay');
            });
        };
    }, [profile]);

    const handleReceivedNotification = (notification: OSNotification) => {
        if (profile?.id) {
            console.log(notification);
        }
    };

    const initOneSignal = async () => {
        try {
            OneSignal.Debug.setLogLevel(LogLevel.Verbose);
            OneSignal.initialize(Constants?.expoConfig?.extra?.oneSignalAppId);
            OneSignal.Notifications.requestPermission(true);
            OneSignal.Notifications.addEventListener('click', res => {
                handleReceivedNotification(res.notification);
            });
            OneSignal.Notifications.addEventListener('foregroundWillDisplay', event => {
                event.getNotification().display();
            });
            if (profile?.id) {
                OneSignal.login(profile.id);
                OneSignal.User.addTag('memberId', profile.id);
            } else {
                OneSignal.User.removeTag('memberId');
                OneSignal.logout();
            }
        } catch (error) {
            AlertMessage(error);
        }
    };
}

export default useNotification;
