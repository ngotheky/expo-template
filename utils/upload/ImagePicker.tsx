import ActionSheet from '@alessiocancian/react-native-actionsheet';
import { memo, ReactNode, useRef, useState } from 'react';
import * as ExpoImagePicker from 'expo-image-picker';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, View } from 'react-native';
import ImageUploader from './ImageUploader';
import StyledTouchable from '@/components/base/StyledTouchable';
import { logger } from '../helper';
import StyledImage from '@/components/base/StyledImage';
import classNames from 'classnames';

interface ImagePickerProp {
    setImage: (uri: string) => void;
    image: string;
    children: ReactNode;
    className?: string;
    imageCls?: string;
    pickerOptions?: ExpoImagePicker.ImagePickerOptions;
    multiple?: boolean;
}

const ImagePicker = ({ image, setImage, children, className, imageCls, pickerOptions, multiple }: ImagePickerProp) => {
    const { t } = useTranslation();

    const actionSheet = useRef<ActionSheet>(null);
    const [loading, setLoading] = useState(false);

    const options = [t('authen.register.cancel'), t('authen.register.photo'), t('authen.register.camera')];
    const showActionSheet = () => {
        actionSheet?.current?.show();
    };

    const pickMainImage = async (index: number) => {
        try {
            setLoading(true);
            const uri = await ImageUploader.pickImage(index, pickerOptions);
            setImage(uri || image);
        } catch (err: any) {
            logger('err', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View>
            <StyledTouchable className={className} onPress={showActionSheet}>
                {image && !loading ? (
                    <StyledImage className={imageCls} source={{ uri: image }} />
                ) : loading ? (
                    <View className={classNames('items-center justify-center', imageCls)}>
                        <ActivityIndicator />
                    </View>
                ) : (
                    <View>{children}</View>
                )}
            </StyledTouchable>
            <ActionSheet
                ref={actionSheet}
                options={options}
                cancelButtonIndex={0}
                onPress={(index: any) => {
                    if (index !== 0) {
                        pickMainImage(index);
                    }
                }}
            />
        </View>
    );
};

/**
 * ImagePicker component allows users to pick an image from their device's gallery or camera.
 *
 * @param {Object} props - The props for the ImagePicker component.
 * @param {string} props.image - The current image URI.
 * @param {Function} props.setImage - Function to set the selected image URI.
 * @param {React.ReactNode} props.children - The children elements to be rendered inside the picker.
 * @param {string} props.className - The class name for the touchable element.
 * @param {string} props.imageCls - The class name for the image element.
 * @param {Object} props.pickerOptions - Options for the image picker.
 * @param {boolean} props.multiple - Flag to allow multiple image selection.
 *
 * @returns {JSX.Element} The ImagePicker component.
 */
export default memo(ImagePicker);
