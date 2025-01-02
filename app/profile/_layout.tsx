import { Stack, useLocalSearchParams, useNavigation } from 'expo-router';
import { useEffect } from 'react';

export default function Profile() {
    const { userId } = useLocalSearchParams();
    const navigation = useNavigation();
    useEffect(() => {
        setTimeout(() => {
            navigation.setOptions({
                title: `User ${userId}`,
            });
        }, 1000);
    }, []);

    return (
        <Stack
            screenOptions={{
                headerShown: false,
            }}
        />
    );
}
