import { Tabs } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';

export default function MainLayout(): JSX.Element {
    const { t } = useTranslation();
    return (
        <Tabs>
            <Tabs.Screen
                name="home/index"
                options={{
                    title: t('tab.home'),
                    tabBarIcon: ({ color }) => <MaterialIcons size={28} name="home" color={color} />,
                }}
            />
            <Tabs.Screen
                name="message/index"
                options={{
                    title: t('tab.message'),
                    tabBarIcon: ({ color }) => <MaterialIcons size={28} name="messenger" color={color} />,
                }}
            />

            <Tabs.Screen
                name="notification/index"
                options={{
                    title: t('tab.notification'),
                    tabBarIcon: ({ color }) => <MaterialIcons name="notifications" size={28} color={color} />,
                }}
            />
            <Tabs.Screen
                name="settings/index"
                options={{
                    title: t('tab.setting'),
                    tabBarIcon: ({ color }) => <MaterialIcons name="settings" size={28} color={color} />,
                }}
            />
            <Tabs.Screen
                name="my-page/index"
                options={{
                    title: t('tab.myPage'),
                    tabBarIcon: ({ color }) => <MaterialIcons size={28} name="person" color={color} />,
                }}
            />
        </Tabs>
    );
}
