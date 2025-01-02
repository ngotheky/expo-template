import { useFonts } from 'expo-font';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import * as SplashScreen from 'expo-splash-screen';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { loadLocaleLanguage } from '@/utils/i18next';
import { addMenuClearAsyncStorage } from '@/utils/helper';
import { useColorScheme } from 'react-native';

const queryClient = new QueryClient();

SplashScreen.preventAutoHideAsync();

export default function Provider({ children }: { children: React.ReactNode }) {
    const colorScheme = useColorScheme();
    const [loaded] = useFonts({
        SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    });

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    useEffect(() => {
        loadLocaleLanguage();
        addMenuClearAsyncStorage();
    }, []);

    if (!loaded) {
        return null;
    }

    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
                <StatusBar style="auto" />
                {children}
            </ThemeProvider>
        </QueryClientProvider>
    );
}
