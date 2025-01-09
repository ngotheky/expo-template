import Images from '@/assets/images';
import { FunctionComponent, memo, useEffect, useState } from 'react';
import isEqual from 'react-fast-compare';
import { Image, ImageProps } from 'react-native';

const StyledImage: FunctionComponent<ImageProps> = (props: ImageProps) => {
    const { source } = props;
    const { defaultImage } = Images.photo;
    const [error, setError] = useState(false);

    useEffect(() => {
        if (error) {
            setError(false);
        }
    }, [source]);

    return <Image {...props} onError={() => setError(true)} source={error ? defaultImage : source} />;
};

/**
 * StyledImage component is a wrapper around the Image component that handles image loading errors.
 * If an error occurs while loading the image, it falls back to a default image.
 *
 * @param {ImageProps} props - The properties passed to the Image component.
 * @returns {JSX.Element} The rendered Image component with error handling.
 *
 * @example
 * <StyledImage source={{ uri: 'https://example.com/image.png' }} />
 */

export default memo(StyledImage, isEqual);
