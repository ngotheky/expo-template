import { Animated } from 'react-native';
import StyledTouchable from '../base/StyledTouchable';
import StyledText from '../base/StyledText';
import { useRef } from 'react';
import useLanguage from '@/store/useLanguage';
import { useTranslation } from 'react-i18next';
import en from '@/assets/locates/en';
import jp from '@/assets/locates/jp';
import i18next from 'i18next';

const ButtonSwitchLanguage = () => {
    const { i18n } = useTranslation();
    const { languageKey, updateLanguageKey } = useLanguage();
    const buttonPosition = useRef(new Animated.Value(languageKey === 'jp' ? 1 : 36)).current;
    const handlePress = () => {
        const newLanguage = languageKey === 'jp' ? 'en' : 'jp';
        updateLanguageKey(newLanguage);
        i18n.changeLanguage(newLanguage);
        i18n.loadLanguages(newLanguage);
        i18next.addResourceBundle(newLanguage, 'translation', newLanguage === 'en' ? en : jp);
        Animated.timing(buttonPosition, {
            toValue: languageKey === 'jp' ? 36 : 1,
            duration: 300,
            useNativeDriver: true,
        }).start();
    };
    return (
        <StyledTouchable
            onPress={handlePress}
            className="flex-row items-center justify-between w-20 h-10 rounded-3xl px-2 overflow-hidden border border-gray-300"
        >
            <StyledText className="text-xl font-bold text-gray-500" originValue="EN" />
            <StyledText className="text-xl font-bold text-gray-500" originValue="JP" />
            <Animated.View
                className="w-9 h-9 bg-white rounded-full absolute shadow-gray-500 shadow-xl items-center justify-center"
                style={[
                    {
                        transform: [{ translateX: buttonPosition }],
                    },
                ]}
            >
                <StyledText className="text-[20px]" originValue={languageKey === 'jp' ? '🇯🇵' : '🇬🇧'} />
            </Animated.View>
        </StyledTouchable>
    );
};

export default ButtonSwitchLanguage;
