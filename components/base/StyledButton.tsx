import { FunctionComponent } from 'react';
import { ImageSourcePropType } from 'react-native';
import { StyledImage, StyledText, StyledTouchable } from '.';
import { I18Type } from './StyledText';
import classNames from 'classnames';
import { StyledTouchableProps } from './StyledTouchable';

interface StyledButtonProps extends StyledTouchableProps {
    title: I18Type;
    className?: string;
    titleClassName?: string;
    subfixIcon?: ImageSourcePropType;
    prefixIcon?: ImageSourcePropType;
}

const StyledButton: FunctionComponent<StyledButtonProps> = (props: StyledButtonProps) => {
    const { title, className, titleClassName, subfixIcon, prefixIcon } = props;
    return (
        <StyledTouchable
            className={classNames(
                'flex flex-row py-2.5 px-4 border border-primary justify-center items-center rounded-md mt-2',
                className,
            )}
        >
            {prefixIcon && <StyledImage source={prefixIcon} className="w-6 h-6" />}
            <StyledText i18nText={title} className={classNames('!text-primary', titleClassName)} />
            {subfixIcon && <StyledImage source={subfixIcon} className="w-6 h-6" />}
        </StyledTouchable>
    );
};

/**
 * A styled button component that renders a touchable button with optional prefix and suffix icons.
 *
 * @component
 * @param {StyledButtonProps} props - The properties for the StyledButton component.
 * @param {string} props.title - The text to display on the button.
 * @param {string} [props.className] - Additional class names to apply to the button.
 * @param {string} [props.titleClassName] - Additional class names to apply to the button title.
 * @param {ImageSourcePropType} [props.subfixIcon] - The source of the suffix icon to display on the button.
 * @param {ImageSourcePropType} [props.prefixIcon] - The source of the prefix icon to display on the button.
 * @returns {JSX.Element} The rendered styled button component.
 */

export default StyledButton;
