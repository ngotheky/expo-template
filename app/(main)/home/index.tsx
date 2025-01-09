import StyledText from '@/components/base/StyledText';
import { formatDate } from '@/utils/date';
import { formatNumber } from '@/utils/formatter';
import { Link } from 'expo-router';
import { View, Button } from 'react-native';
import StyledList from '@/components/base/StyledList';
import ImagePicker from '@/utils/upload/ImagePicker';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useState } from 'react';
import StyledInput from '@/components/base/StyledInput';
import StyledDateTimePicker from '@/components/base/StyledDateTimePicker';

const DATA = [
    {
        title: 'First Item',
    },
    {
        title: 'Second Item',
    },
];

export default function Home() {
    const [image, setImage] = useState('');

    return (
        <View className="flex-1 justify-center items-center ">
            <StyledText className="dark:!text-red-500" originValue={formatNumber(100000.23934324)} />
            <StyledText className="!text-primary" originValue={formatDate(new Date())} />
            <Link push href="/profile/24" asChild>
                <Button title="Detail" />
            </Link>
            <StyledDateTimePicker mode="datetime" date={new Date()} onConfirm={value => console.log(value)}>
                <StyledText className="!text-primary" originValue="Select Date" />
            </StyledDateTimePicker>
            <StyledInput className="bg-white" />
            <ImagePicker image={image} setImage={setImage}>
                <IconSymbol size={28} name="photo.fill" color={'gray'} />
            </ImagePicker>
            <View className="flex-1 w-full bg-gray-300">
                <StyledList
                    data={DATA}
                    renderItem={({ item }) => <StyledText originValue={item.title} />}
                    estimatedItemSize={100}
                />
            </View>
        </View>
    );
}
