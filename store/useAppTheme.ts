import { Appearance } from 'react-native';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { asyncStorage } from './configs';

interface IAppTheme {
    theme: 'light' | 'dark';
    setTheme: (theme: 'light' | 'dark') => void;
}

const useAppTheme = create<IAppTheme>()(
    devtools(
        persist(
            set => ({
                theme: 'light',
                setTheme: (theme: 'light' | 'dark') => {
                    set({ theme });
                    Appearance.setColorScheme(theme);
                },
            }),
            {
                name: 'theme',
                storage: typeof window !== 'undefined' ? asyncStorage : undefined,
            },
        ),
    ),
);

export default useAppTheme;
