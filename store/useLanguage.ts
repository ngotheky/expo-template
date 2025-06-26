import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { asyncStorage } from './configs';
import { Language } from '@/utils/i18next';

interface ILanguage {
    languageKey: Language;
    updateLanguageKey: (languageKey: Language) => void;
}

const useLanguage = create<ILanguage>()(
    devtools(
        persist(
            set => ({
                languageKey: 'jp',
                updateLanguageKey: (languageKey: Language) => {
                    set({ languageKey });
                },
            }),
            {
                name: 'language',
                storage: typeof window !== 'undefined' ? asyncStorage : undefined,
            },
        ),
    ),
);
export default useLanguage;
