import { FunctionComponent, ReactNode } from 'react';
import { Pressable, PressableProps } from 'react-native';
import { throttle } from 'lodash';

export interface StyledTouchableProps extends PressableProps {
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
        <Pressable disabled={disabled} {...props} onPress={handlePress}>
            {children}
        </Pressable>
    );
};

export default StyledTouchable;
