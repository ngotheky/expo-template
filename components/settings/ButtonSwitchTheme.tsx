import { Animated, View } from 'react-native';
import StyledTouchable from '../base/StyledTouchable';
import { useRef } from 'react';
import useAppTheme from '@/store/useAppTheme';
import { StyledImage } from '../base';
import Images from '@/assets/images';

const ButtonSwitchTheme = () => {
    const { theme, setTheme } = useAppTheme();
    const buttonPosition = useRef(new Animated.Value(theme === 'light' ? -53 : -19)).current;
    const backgroundColorValue = useRef(new Animated.Value(theme === 'light' ? 0 : 1)).current;

    const handleChangeTheme = () => {
        Animated.parallel([
            Animated.timing(buttonPosition, {
                toValue: theme === 'light' ? -19 : -53,
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.timing(backgroundColorValue, {
                toValue: theme === 'light' ? 1 : 0,
                duration: 300,
                useNativeDriver: true,
            }),
        ]).start();
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };

    const backgroundColor = backgroundColorValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['#FFECDF', '#343486'], // black to orange
    });

    return (
        <StyledTouchable
            onPress={handleChangeTheme}
            className="flex-row items-center justify-between w-20 h-10 overflow-hidden rounded-3xl px-2 border border-gray-300"
        >
            <Animated.View
                className="absolute h-full w-40 flex-row items-center justify-center"
                style={{
                    backgroundColor,
                    transform: [
                        {
                            translateX: buttonPosition,
                        },
                    ],
                }}
            >
                <View className="flex-1 items-center justify-center">
                    <StyledImage className="w-[20px] h-[20px] ml-2" source={Images.icons.theme.dark} />
                </View>
                <View className="w-9 h-9 bg-white rounded-full  shadow-gray-500 shadow-xl  absolute" />
                <View className="flex-1 items-center justify-center">
                    <StyledImage className="w-[20px] h-[20px] mr-2" source={Images.icons.theme.light} />
                </View>
            </Animated.View>
        </StyledTouchable>
    );
};

export default ButtonSwitchTheme;
