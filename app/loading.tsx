import React from 'react';
import { View, ActivityIndicator } from 'react-native';

export default function loading() {
    return (
        <View className="flex-1">
            <ActivityIndicator />
        </View>
    );
}
