import { uploadImage } from '@/api/modules/api-app/general';
import { logger } from '../helper';
import { checkCamera, checkPhoto } from '../permission';
import * as ImagePicker from 'expo-image-picker';

const ImageUploaded = {
    pickImage: async (index: number, options?: ImagePicker.ImagePickerOptions) => {
        try {
            let imagesResponse: ImagePicker.ImagePickerResult | null = null;
            if (index === 1) {
                const res = await checkPhoto();
                if (!res) return;
                imagesResponse = await ImageUploaded.chooseImageFromGallery(options);
            } else if (index === 2) {
                const res = await checkCamera();
                if (!res) return;
                imagesResponse = await ImageUploaded.chooseImageFromCamera(options);
            }
            if (imagesResponse?.canceled) return null;
            const [asset] = imagesResponse?.assets || [];
            const uri = await ImageUploaded.uploader(asset);
            return uri;
        } catch (err) {
            logger(err);
            return null;
        }
    },

    chooseImageFromCamera: (options?: ImagePicker.ImagePickerOptions) =>
        ImagePicker.launchCameraAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            quality: 0.8,
            ...(options || {}),
        }),

    chooseImageFromGallery: (options?: ImagePicker.ImagePickerOptions) =>
        ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            quality: 0.8,
            ...(options || {}),
        }),

    uploader: async (res: ImagePicker.ImagePickerAsset) => {
        const formatImage = {
            uri: res.uri,
            name: `${res.fileName}.${res.mimeType}`,
            type: res.mimeType,
        };
        const formData = new FormData();
        formData.append('files', formatImage as unknown as Blob);
        const uri: any = await uploadImage(formData);
        if (uri?.length > 0) {
            return uri[0];
        }
        return null;
    },
};

export default ImageUploaded;
