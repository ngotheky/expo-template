import useUserProfile from '@/store/useUserProfile';
import { Stack, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export default function AppStacks() {
    const router = useRouter();
    const { t } = useTranslation();
    const { token } = useUserProfile();

    useEffect(() => {
        /* -------------------------- CHECK AUTHENTICATION -------------------------- */
        if (!token) {
            router.replace('/auth/login');
        } else {
            router.replace('/home');
        }
    }, [token]);
    /* -------------------------------------------------------------------------- */
    /*                            ADD MORE SCREENS HERE                           */
    /* -------------------------------------------------------------------------- */
    return (
        <Stack>
            <Stack.Screen
                name="auth"
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="(main)"
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="profile"
                options={{
                    headerBackTitle: t('common.back'),
                }}
            />
        </Stack>
    );
}
