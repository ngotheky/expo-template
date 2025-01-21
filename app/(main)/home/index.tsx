import StyledText from '@/components/base/StyledText';
import { formatDate } from '@/utils/date';
import { formatNumber } from '@/utils/formatter';
import { Link } from 'expo-router';
import { View, Button } from 'react-native';
import StyledList from '@/components/base/StyledList';
import ImagePicker from '@/utils/upload/ImagePicker';
import { useState } from 'react';
import StyledInput from '@/components/base/StyledInput';
import StyledDateTimePicker from '@/components/base/StyledDateTimePicker';
import RadioButton from '@/components/base/RadioButton';
import { MaterialIcons } from '@expo/vector-icons';
import request from '@/api/request';
import usePaging from '@/hooks/usePaging';
import { useTranslation } from 'react-i18next';

const searchWorker = (params: any): Promise<any> => request.post(`common/worker`, params);

export default function Home() {
    const [image, setImage] = useState('');
    const { t } = useTranslation();
    const { data, refetch, isRefetching, isFetchingNextPage, fetchNextPage } = usePaging<{ name: string }>({
        requestPaging: searchWorker,
        queryKey: 'common/worker',
    });

    return (
        <View className="flex-1 justify-center items-center ">
            <StyledText className="dark:!text-red-500" originValue={formatNumber(100000.23934324)} />
            <StyledText className="!text-primary" originValue={formatDate(new Date())} />
            <Link push href="/profile/24" asChild>
                <Button title="Detail" />
            </Link>
            <RadioButton value={1} label="Option 1" isChecked={true} onChange={value => console.log(value)} />
            <StyledDateTimePicker mode="datetime" date={new Date()} onConfirm={value => console.log(value)}>
                <StyledText className="!text-primary" originValue="Select Date" />
            </StyledDateTimePicker>
            <StyledInput
                className="bg-white"
                label="common.noData"
                placeholder={t('common.noText')}
                renderRight={() => {
                    return <MaterialIcons size={28} name="search" color={'gray'} />;
                }}
            />
            <ImagePicker image={image} setImage={setImage}>
                <MaterialIcons size={28} name="photo-library" color={'gray'} />
            </ImagePicker>
            <View className="flex-1 w-full bg-gray-300">
                <StyledList
                    data={data}
                    onRefresh={refetch}
                    refreshing={isRefetching}
                    onLoadMore={fetchNextPage}
                    loadingMore={isFetchingNextPage}
                    renderItem={({ item }) => <StyledText originValue={item.name} />}
                    estimatedItemSize={100}
                />
            </View>
        </View>
    );
}
