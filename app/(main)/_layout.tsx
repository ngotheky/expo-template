import React from 'react';
import { Tabs } from 'expo-router';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { MaterialIcons } from '@expo/vector-icons';

export default function MainLayout(): JSX.Element {
    return (
        <Tabs>
            <Tabs.Screen
                name="home/index"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
                }}
            />
            <Tabs.Screen
                name="message/index"
                options={{
                    title: 'Message',
                    tabBarIcon: ({ color }) => <IconSymbol size={28} name="message.fill" color={color} />,
                }}
            />

            <Tabs.Screen
                name="notification/index"
                options={{
                    title: 'Notification',
                    tabBarIcon: ({ color }) => <MaterialIcons name="notifications" size={28} color={color} />,
                }}
            />
            <Tabs.Screen
                name="settings/index"
                options={{
                    title: 'Settings',
                    tabBarIcon: ({ color }) => <MaterialIcons name="settings" size={28} color={color} />,
                }}
            />
            <Tabs.Screen
                name="my-page/index"
                options={{
                    title: 'My Page',
                    tabBarIcon: ({ color }) => <IconSymbol size={28} name="person.fill" color={color} />,
                }}
            />
        </Tabs>
    );
}
