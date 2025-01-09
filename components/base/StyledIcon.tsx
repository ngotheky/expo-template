import { memo } from 'react';
import isEqual from 'react-fast-compare';
import { Image, ImageProps } from 'react-native';
import { scale } from 'react-native-size-matters';

interface Props extends ImageProps {
    size: number;
}

const StyledIcon = ({ size, ...res }: Props) => {
    return <Image style={{ width: scale(size ?? 14), height: scale(size ?? 14) }} resizeMode={'contain'} {...res} />;
};
/**
 * A functional component that renders an image with a specified size.
 *
 * @param {Object} props - The properties object.
 * @param {number} props.size - The size of the icon. Defaults to 14 if not provided.
 * @param {Object} props.res - The remaining properties to be passed to the Image component.
 * @returns {JSX.Element} The rendered Image component with the specified size and other properties.
 */
export default memo(StyledIcon, isEqual);
