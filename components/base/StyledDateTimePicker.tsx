import { FunctionComponent, ReactNode, useState } from 'react';
import DateTimePickerModal, { ReactNativeModalDateTimePickerProps } from 'react-native-modal-datetime-picker';
import { useTranslation } from 'react-i18next';
import StyledTouchable from './StyledTouchable';

interface Props extends Omit<ReactNativeModalDateTimePickerProps, 'isVisible' | 'onConfirm' | 'onCancel'> {
    formatter?: (value: Date) => string;
    className?: string;
    disabled?: boolean;
    children?: ReactNode;
    onConfirm: (value: string | Date) => void;
    onCancel?: () => void;
}
/**
 * A styled date-time picker component that wraps around `DateTimePickerModal`.
 * @example <StyledDateTimePicker mode="datetime" date={new Date()} onConfirm={value => console.log(value)}>
                 <StyledText className="!text-primary" originValue="Select Date" />
             </StyledDateTimePicker>
 * @param {Props} props - The properties passed to the component.
 * @param {Date} props.date - The currently selected date.
 * @param {string} [props.className] - Additional class names for styling.
 * @param {boolean} [props.disabled] - Whether the picker is disabled.
 * @param {React.ReactNode} props.children - The child elements to be rendered inside the picker.
 * @param {() => void} [props.onCancel] - Callback function to be called when the picker is cancelled.
 * @param {(date: Date) => any} [props.formatter] - Optional formatter function to format the date before confirming.
 * @param {(date: Date | any) => void} props.onConfirm - Callback function to be called when the date is confirmed.
 * @param {any} ref - The ref to be forwarded to the component.
 *
 * @returns {JSX.Element} The rendered date-time picker component.
 */
const StyledDateTimePicker: FunctionComponent<Props> = ({
    date,
    className,
    disabled,
    children,
    onCancel,
    formatter,
    onConfirm,
    ...res
}: Props) => {
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const { t } = useTranslation();
    const closePicker = () => {
        setIsVisible(false);
        onCancel?.();
    };

    const openPicker = () => {
        setIsVisible(true);
    };

    const onChangeValue = (newDate: Date) => {
        if (formatter) {
            onConfirm(formatter(newDate));
            return;
        }
        onConfirm(newDate);
    };

    return (
        <StyledTouchable disabled={disabled} onPress={openPicker} className={className}>
            {children}
            <DateTimePickerModal
                cancelTextIOS={t('common.cancel')}
                confirmTextIOS={t('common.confirm')}
                locale="ja_JP"
                isVisible={isVisible}
                is24Hour
                {...res}
                onCancel={closePicker}
                onConfirm={onChangeValue}
            />
        </StyledTouchable>
    );
};

export default StyledDateTimePicker;
