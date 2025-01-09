import { View, Button } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import useUserProfile from '@/store/useUserProfile';
import StyledText from '@/components/base/StyledText';

export default function Login(): JSX.Element {
    const router = useRouter();
    const { setToken } = useUserProfile();

    return (
        <View className="flex-1 items-center justify-center">
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
            />
            <StyledText className="font-bold text-[24px]" originValue="Đăng Nhập" />
            <Button title="Đi đến Đăng Ký" onPress={() => router.push('/auth/register')} />
            <Button title="Quên Mật Khẩu" onPress={() => router.push('/auth/forgot-password')} />
            <Button
                title="Vào ứng dụng"
                onPress={() => {
                    setToken('token');
                }}
            />
        </View>
    );
}
