import StyledText from '@/components/base/StyledText';
import { Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

export default function Register() {
    const { t } = useTranslation();
    return (
        <View className="flex-1">
            <Stack.Screen
                options={{
                    headerShown: true,
                    headerTitle: t('auth.register.title'),
                    headerBackTitle: t('common.back'),
                }}
            />
            <StyledText i18nText="auth.register.title" />
        </View>
    );
}
