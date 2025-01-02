import StyledText from '@/components/base/StyledText';
import React from 'react';
import { View } from 'react-native';

export default function Message() {
    return (
        <View className="flex-1  text-primary">
            <StyledText originValue="Message" />
        </View>
    );
}
