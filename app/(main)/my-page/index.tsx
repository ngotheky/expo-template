import StyledText from '@/components/base/StyledText';
import useUserProfile from '@/store/useUserProfile';
import { View, Button } from 'react-native';

export default function MyPage() {
    const { onLogout } = useUserProfile();
    return (
        <View className="flex-1">
            <StyledText originValue="my-page" />
            <Button title="Logout" onPress={onLogout} />
        </View>
    );
}
