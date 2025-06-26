import { View, Button } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import useUserProfile from '@/store/useUserProfile';
import StyledText from '@/components/base/StyledText';
import { useTranslation } from 'react-i18next';

export default function Login(): JSX.Element {
    const { t } = useTranslation();
    const router = useRouter();
    const { setToken } = useUserProfile();

    return (
        <View className="flex-1 items-center justify-center">
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
            />
            <StyledText className="font-bold text-[24px]" i18nText="auth.login.title" />
            <Button title={t('auth.register.title')} onPress={() => router.push('/auth/register')} />
            <Button title={t('auth.forgotPassword.title')} onPress={() => router.push('/auth/forgot-password')} />
            <Button
                title={t('auth.login.buttonLogin')}
                onPress={() => {
                    setToken('token');
                }}
            />
        </View>
    );
}
