import { useFonts } from 'expo-font';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import * as SplashScreen from 'expo-splash-screen';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { loadLocaleLanguage } from '@/utils/i18next';
import { addMenuClearAsyncStorage } from '@/utils/helper';
import useAppTheme from '@/store/useAppTheme';
import { Appearance } from 'react-native';
// import useNotification from '@/hooks/useNotification';

const queryClient = new QueryClient();

SplashScreen.preventAutoHideAsync();

export default function Provider({ children }: { children: React.ReactNode }) {
    const { theme } = useAppTheme();
    const [loaded] = useFonts({
        SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    });
    // useNotification();

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    useEffect(() => {
        loadLocaleLanguage();
        addMenuClearAsyncStorage();
        Appearance.setColorScheme(theme);
    }, []);

    if (!loaded) {
        return null;
    }

    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider
                value={
                    theme === 'dark'
                        ? { ...DarkTheme, colors: { ...DarkTheme.colors, background: '#1f1f1f' } }
                        : DefaultTheme
                }
            >
                <StatusBar style="auto" />
                {children}
            </ThemeProvider>
        </QueryClientProvider>
    );
}
