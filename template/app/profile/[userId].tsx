import StyledText from '@/components/base/StyledText';
import { useLocalSearchParams } from 'expo-router';
import { View } from 'react-native';

export default function UserProfile() {
    const { userId } = useLocalSearchParams();

    return (
        <View className="flex-1">
            <StyledText originValue={userId as string} />
        </View>
    );
}
