import { Themes } from '@/assets/themes';
import { FunctionComponent } from 'react';
import { ActivityIndicator, ActivityIndicatorProps } from 'react-native';

const StyledIndicator: FunctionComponent<ActivityIndicatorProps> = (props: ActivityIndicatorProps) => {
    return (
        <ActivityIndicator
            color={Themes.COLORS.primary}
            size={'small'}
            className="flex-1 justify-center items-center"
            {...props}
        />
    );
};

export default StyledIndicator;
