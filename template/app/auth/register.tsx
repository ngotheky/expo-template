import StyledText from '@/components/base/StyledText';
import { Stack } from 'expo-router';
import React from 'react';
import { View } from 'react-native';

export default function Register() {
    return (
        <View className="flex-1">
            <Stack.Screen
                options={{
                    headerShown: true,
                    headerTitle: 'Register',
                    headerBackTitle: 'Back',
                }}
            />
            <StyledText originValue="register" />
        </View>
    );
}
