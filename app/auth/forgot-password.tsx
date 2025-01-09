import StyledText from '@/components/base/StyledText';
import { Stack } from 'expo-router';
import { View } from 'react-native';

export default function ForgotPassword() {
    return (
        <View className="flex-1">
            <Stack.Screen
                options={{
                    headerShown: true,
                    headerTitle: 'Forgot Password',
                    headerBackTitle: 'Back',
                }}
            />
            <StyledText originValue="ForgotPassword" />
        </View>
    );
}
