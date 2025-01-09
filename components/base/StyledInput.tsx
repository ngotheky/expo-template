import React, { forwardRef, ReactNode, useRef, useState } from 'react';
import { ColorValue, ReturnKeyTypeOptions, TextInput, TextInputProps, View } from 'react-native';
import StyledText, { I18Type } from './StyledText';
import StyledTouchable from './StyledTouchable';
import { Themes } from '@/assets/themes';
import { TextContentType, AutoCompleteType } from '@/types/general';
import classNames from 'classnames';

export interface StyledInputProps extends TextInputProps {
    containerClassName?: string;
    wrapClassName?: string;
    className?: string;
    labelClassName?: string;
    errorClassName?: string;
    placeholderTextColor?: ColorValue;
    customUnderlineColor?: ColorValue;
    customReturnKeyType?: ReturnKeyTypeOptions;
    ref?: any;
    errorMessage?: string;
    label?: I18Type;
    textContentType?: TextContentType;
    autoCompleteType?: AutoCompleteType;
    renderRight?: any;
    onPress?(): void;
}

interface WrapProps {
    onPress?: () => void;
    children: ReactNode;
    className?: string;
}

const WrapInputComponent = ({ onPress, children, className }: WrapProps) => {
    return onPress ? (
        <StyledTouchable className={className} onPress={onPress}>
            {children}
        </StyledTouchable>
    ) : (
        <View className={className}>{children}</View>
    );
};

const StyledInput = (props: StyledInputProps, ref: any) => {
    const [isFocused, setIsFocused] = useState(false);
    const input = useRef<TextInput>(null);

    const {
        containerClassName,
        label,
        className,
        labelClassName,
        customReturnKeyType = 'next',
        renderRight,
        errorMessage,
        errorClassName,
        placeholderTextColor = Themes.COLORS.grey,
        customUnderlineColor = 'transparent',
        autoCompleteType = 'off',
        textContentType = 'none',
        wrapClassName,
        onPress,
        ...otherProps
    } = props;

    return (
        <View className={classNames('w-4/5 mt-4', containerClassName)}>
            {!!label && <StyledText className={labelClassName} i18nText={label} />}
            <WrapInputComponent
                className={classNames(
                    {
                        'border border-red-600': !isFocused && !!errorMessage,
                    },
                    wrapClassName,
                )}
                onPress={onPress}
            >
                <TextInput
                    ref={ref || input}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    className={classNames(
                        'w-full rounded-sm p-2 bg-secondary border border-transparent',
                        {
                            'border !border-red-600': !isFocused && !!errorMessage,
                            'border !border-primary': isFocused,
                        },
                        className,
                    )}
                    placeholderTextColor={placeholderTextColor}
                    underlineColorAndroid={customUnderlineColor}
                    autoComplete={autoCompleteType}
                    textContentType={textContentType}
                    importantForAutofill="yes"
                    autoCorrect={false}
                    returnKeyType={customReturnKeyType}
                    {...otherProps}
                />
                {!!renderRight && (
                    <View className="absolute right-2 h-full justify-center items-center">{renderRight?.()}</View>
                )}
            </WrapInputComponent>
            {!!errorMessage && (
                <StyledText
                    i18nText={errorMessage as I18Type}
                    className={classNames('text-xs text-red-600 ml-1', errorClassName)}
                />
            )}
        </View>
    );
};
/**
 * A styled input component that wraps a `TextInput` with additional styling and functionality.
 *
 * @param {StyledInputProps} props - The properties for the styled input component.
 * @param {any} ref - The reference to the input element.
 *
 * @returns {JSX.Element} The rendered styled input component.
 *
 * @component
 *
 * @example
 * ```tsx
 * <StyledInput
 *   label="Username"
 *   placeholder="Enter your username"
 *   errorMessage="Username is required"
 *   customReturnKeyType="done"
 * />
 * ```
 *
 * @property {string} containerClassName - Additional class names for the container view.
 * @property {string} label - The label text for the input.
 * @property {string} className - Additional class names for the input.
 * @property {string} labelClassName - Additional class names for the label.
 * @property {string} customReturnKeyType - The return key type for the input (default is 'next').
 * @property {() => JSX.Element} renderRight - A function that renders a component on the right side of the input.
 * @property {string} errorMessage - The error message to display below the input.
 * @property {string} errorClassName - Additional class names for the error message.
 * @property {string} placeholderTextColor - The color of the placeholder text (default is Themes.COLORS.grey).
 * @property {string} customUnderlineColor - The color of the underline for Android (default is 'transparent').
 * @property {string} autoCompleteType - The auto-complete type for the input (default is 'off').
 * @property {string} textContentType - The content type for the input (default is 'none').
 * @property {string} wrapClassName - Additional class names for the wrapping component.
 * @property {() => void} onPress - The function to call when the wrapping component is pressed.
 * @property {object} otherProps - Additional properties to pass to the `TextInput`.
 */
export default forwardRef(StyledInput);
