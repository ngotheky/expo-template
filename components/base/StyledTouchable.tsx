import { FunctionComponent, ReactNode } from 'react';
import { Pressable, PressableProps, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { throttle } from 'lodash';

export interface StyledTouchableProps extends TouchableOpacityProps {
    disabled?: boolean;
    onPress?(): void;
    onPressIn?(): void;
    onPressOut?(): void;
    onLongPress?(): void;
    children?: ReactNode;
    throttleTime?: number;
}

const configThrottle = { trailing: false };
const onPressDefault = () => null;

const StyledTouchable: FunctionComponent<StyledTouchableProps> = (props: StyledTouchableProps) => {
    const { disabled, children, throttleTime = 1000, onPress = onPressDefault } = props;

    const handlePress = throttle(onPress, throttleTime, configThrottle);

    return (
        <TouchableOpacity activeOpacity={0.6} disabled={disabled} {...props} onPress={handlePress}>
            {children}
        </TouchableOpacity>
    );
};

export default StyledTouchable;
