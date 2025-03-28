import StyledText from '@/components/base/StyledText';
import { Link, Stack } from 'expo-router';
import { View } from 'react-native';

export default function NotFoundScreen() {
    return (
        <View className="flex-1 justify-center items-center p-5">
            <Stack.Screen options={{ title: 'Oops!' }} />
            <View className="flex-1">
                <StyledText originValue="This screen doesn't exist." />
                <Link href="/home" className="mt-4 py-4">
                    <StyledText originValue="Go to home screen!" />
                </Link>
            </View>
        </View>
    );
}
