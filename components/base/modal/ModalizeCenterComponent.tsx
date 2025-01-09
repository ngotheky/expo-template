import { ReactNode, useEffect, useState } from 'react';
import { View } from 'react-native';
import StyledTouchable from '../StyledTouchable';
import classNames from 'classnames';
import Metrics from '@/utils/metrics';

interface Props {
    children: ReactNode;
    handleDismiss(): void;
    className?: string;
}

const ModalizeCenterComponent = (props: Props) => {
    const { children, handleDismiss, className } = props;
    const [contentHeight, setContentHeight] = useState(0);
    const [lowerBackdropHeight, setLowerBackdropHeight] = useState(0);
    useEffect(() => {
        setLowerBackdropHeight((Metrics.screenHeight - contentHeight) / 2);
    }, [contentHeight]);

    return (
        <View className={classNames('mx-5', className)}>
            <StyledTouchable onPress={handleDismiss} style={{ height: lowerBackdropHeight }} />
            <View
                onLayout={event => {
                    setContentHeight(event?.nativeEvent?.layout?.height);
                }}
            >
                {children}
            </View>
            <StyledTouchable onPress={handleDismiss} style={{ height: lowerBackdropHeight }} />
        </View>
    );
};

export default ModalizeCenterComponent;
