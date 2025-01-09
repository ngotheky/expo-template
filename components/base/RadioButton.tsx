import { memo } from 'react';
import isEqual from 'react-fast-compare';
import StyledTouchable from './StyledTouchable';
import StyledText from './StyledText';
import { Themes } from '@/assets/themes';
import { Fontisto, MaterialIcons } from '@expo/vector-icons';

interface Props {
    value: any;
    label: string;
    onChange: (value: any) => void;
    isChecked: boolean;
    disabled?: boolean;
}

function RadioButton({ value, label, onChange, isChecked, disabled }: Props) {
    return (
        <StyledTouchable disabled={disabled} onPress={() => onChange(value)} className="flex-row items-center">
            <MaterialIcons
                size={16}
                name={isChecked ? 'radio-button-on' : 'radio-button-off'}
                color={disabled ? 'gray' : Themes.COLORS.primary}
            />
            <StyledText className="ml-2" originValue={label} />
        </StyledTouchable>
    );
}

export default memo(RadioButton, isEqual);
