import i18next, { ParseKeys } from 'i18next';
import { memo } from 'react';
import isEqual from 'react-fast-compare';
import { Text, TextProps, useColorScheme } from 'react-native';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

export type I18Type = string &
    (ParseKeys<'translation', {}, undefined> | ParseKeys<'translation', {}, undefined>[] | undefined);
interface StyledTextProps extends TextProps {
    i18nParams?: any;
}

interface StyledTextWithOriginValue extends StyledTextProps {
    originValue: string;
    i18nText?: I18Type;
}

interface StyledTextWithI18nValue extends StyledTextProps {
    originValue?: string;
    i18nText: I18Type;
}

type StyledTextCombineProps = StyledTextWithOriginValue | StyledTextWithI18nValue;

/**
 * A styled text component that supports internationalization and dynamic theming.
 *
 * @param {StyledTextCombineProps} props - The properties for the StyledText component.
 * @param {string} [props.className] - Additional class names to apply to the text element.
 * @param {string} [props.originValue] - The original text value to display.
 * @param {string} [props.i18nText] - The key for the internationalized text.
 * @param {object} [props.i18nParams] - Parameters for the internationalized text.
 * @param {object} [props.rest] - Additional properties to pass to the Text component.
 *
 * @returns {JSX.Element} The rendered styled text component.
 */
const StyledText = ({ className, originValue, i18nText, i18nParams, ...rest }: StyledTextCombineProps) => {
    const colorScheme = useColorScheme();
    const { t } = useTranslation();

    let value: string;

    if (originValue) {
        value = originValue;
    } else if (i18nText || i18next.exists(i18nText || '', i18nParams)) {
        value = t(i18nText as I18Type, i18nParams);
    } else {
        value = i18nText || '';
    }

    return (
        <Text
            {...rest}
            className={classNames(
                {
                    'text-textLight': colorScheme === 'light',
                    'text-textDark': colorScheme === 'dark',
                },
                className,
            )}
        >
            {value}
        </Text>
    );
};

export default memo(StyledText, isEqual);
