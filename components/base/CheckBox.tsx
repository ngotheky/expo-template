import { FunctionComponent, useCallback } from 'react';
import { View } from 'react-native';
import StyledText, { I18Type } from './StyledText';
import Images from '@/assets/images';
import StyledIcon from './StyledIcon';
import StyledTouchable from './StyledTouchable';
import classNames from 'classnames';
import { Common } from '@/types/enums';

export interface ICheckBox {
    value?: Common;
    onConfirm?: (value: Common) => void;
    content: I18Type;
    className?: string;
    contentClassName?: string;
    iconClassName?: string;
    disabled?: boolean;
}

const CheckBox: FunctionComponent<ICheckBox> = ({
    value,
    onConfirm,
    content,
    className,
    contentClassName,
    iconClassName,
    disabled,
}: ICheckBox) => {
    const handleCheck = useCallback(() => {
        onConfirm?.(value ? Common.INACTIVE : Common.ACTIVE);
    }, [value]);

    return (
        <View className={classNames('w-full flex flex-row items-center', className)}>
            <StyledTouchable
                disabled={disabled}
                onPress={handleCheck}
                hitSlop={{ top: 5, left: 5, right: 5, bottom: 5 }}
            >
                <StyledIcon
                    source={value ? Images.icons.checkBox.check : Images.icons.checkBox.uncheck}
                    size={20}
                    className={classNames(
                        {
                            '!color-gray-600': disabled,
                        },
                        contentClassName,
                    )}
                />
            </StyledTouchable>
            <StyledText i18nText={content} className={classNames('ml-1', iconClassName)} />
        </View>
    );
};

/**
 * CheckBox component renders a customizable checkbox with optional content and styling.
 *
 * @param {Object} props - The properties object.
 * @param {boolean} props.value - The current value of the checkbox, true for checked and false for unchecked.
 * @param {Function} props.onConfirm - Callback function to be called when the checkbox is pressed.
 * @param {string} props.content - The content to be displayed next to the checkbox.
 * @param {string} props.className - Additional class names for the container view.
 * @param {string} props.contentClassName - Additional class names for the content text.
 * @param {string} props.iconClassName - Additional class names for the checkbox icon.
 * @param {boolean} props.disabled - Boolean indicating whether the checkbox is disabled.
 *
 * @returns {JSX.Element} The rendered CheckBox component.
 */

export default CheckBox;
