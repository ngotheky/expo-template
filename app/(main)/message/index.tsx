import StyledText from '@/components/base/StyledText';
import { View } from 'react-native';

export default function Message() {
    return (
        <View className="flex-1  text-primary">
            <StyledText originValue="Message" />
        </View>
    );
}
