import { Tabs } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

export default function MainLayout(): JSX.Element {
    return (
        <Tabs>
            <Tabs.Screen
                name="home/index"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color }) => <MaterialIcons size={28} name="home" color={color} />,
                }}
            />
            <Tabs.Screen
                name="message/index"
                options={{
                    title: 'Message',
                    tabBarIcon: ({ color }) => <MaterialIcons size={28} name="messenger" color={color} />,
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
                    tabBarIcon: ({ color }) => <MaterialIcons size={28} name="person" color={color} />,
                }}
            />
        </Tabs>
    );
}
