import i18next from 'i18next';
import en from '@/assets/locates/en';
import jp from '@/assets/locates/jp';
import { initReactI18next } from 'react-i18next';
import dayjs from 'dayjs';
import 'dayjs/locale/ja';
import 'dayjs/locale/en';
import useLanguage from '@/store/useLanguage';
import { getLocales } from 'expo-localization';

export type Resource = typeof en & typeof jp;
export type Language = 'jp' | 'en';
export const defaultNS = 'translation';
export const DEFAULT_LANG = 'jp';
export const resources = {
    en: {
        translation: en,
    },
    ja: {
        translation: jp,
    },
} as const;

export function getLanguage() {
    const lan = getLocales();
    const listLng = ['jp', 'en'];
    try {
        const primaryLocate = lan[0];
        let tempLng = primaryLocate?.languageCode?.toLowerCase();
        if (tempLng === 'ja') {
            tempLng = 'jp';
        }
        const lng: Language = tempLng && listLng.includes(tempLng) ? (tempLng as Language) : DEFAULT_LANG;
        // If you want to use DEFAULT_LANG only, comment above line + uncomment below line
        // const lng = DEFAULT_LANG;
        useLanguage.setState({ languageKey: lng });
        return lng;
    } catch (error) {
        return DEFAULT_LANG;
    }
}

i18next.use(initReactI18next).init({
    interpolation: {
        escapeValue: false,
    },
    lng: useLanguage.getState().languageKey || getLanguage(),
    fallbackLng: DEFAULT_LANG,
    resources,
    compatibilityJSON: 'v4',
});

export const loadLocaleLanguage = () => {
    const lng = useLanguage.getState().languageKey || DEFAULT_LANG;
    dayjs.locale(lng);
    i18next.addResourceBundle(lng, 'translation', lng === 'en' ? en : jp);
    i18next.changeLanguage(lng);
};

export default i18next;
