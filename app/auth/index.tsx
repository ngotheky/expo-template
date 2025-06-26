import { Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';

export default function AuthLayout() {
    const { t } = useTranslation();
    return (
        <Stack>
            <Stack.Screen name="login" options={{ title: t('auth.login.title'), headerShown: false }} />
            <Stack.Screen name="register" />
            <Stack.Screen name="forgot-password" />
        </Stack>
    );
}
