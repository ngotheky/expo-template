import { FunctionComponent, memo, useRef, useState } from 'react';
import isEqual from 'react-fast-compare';
import { RefreshControl, SectionList, SectionListProps, View } from 'react-native';
import NoData from './StyledNoData';
import { I18Type } from './StyledText';
import StyledIndicator from './StyledIndicator';
import { Themes } from '@/assets/themes';

interface Props extends SectionListProps<any> {
    [key: string]: any;
    loading?: boolean;
    sections: any[];
    noDataText?: I18Type;
    ListHeaderComponent?: FunctionComponent;
    scrollEnabled?: boolean;
    noDataCanRefresh?: boolean;
    customStyle?: any;
    onLoadMore?(): void;
    onNoDataRefresh?(): void;
}

/**
 * A styled section list component with support for loading, refreshing, and custom styles.
 *
 * @param {boolean} loading - Indicates if the list is in a loading state.
 * @param {Array} sections - The sections to be rendered in the list.
 * @param {React.ComponentType<any>} ListHeaderComponent - Component to render as the header of the list.
 * @param {boolean} refreshing - Indicates if the list is in a refreshing state.
 * @param {object} customStyle - Custom styles to be applied to the list.
 * @param {Function} onLoadMore - Callback function to load more data when the end of the list is reached.
 * @param {Function} onRefresh - Callback function to refresh the list.
 * @param {Array} data - The data to be rendered in the list.
 * @param {boolean} loadingMore - Indicates if more data is being loaded.
 * @param {object} res - Additional props to be passed to the SectionList component.
 *
 * @returns {JSX.Element} The styled section list component.
 */
const StyledSectionList = ({
    loading,
    sections,
    ListHeaderComponent,
    refreshing,
    customStyle,
    onLoadMore,
    onRefresh,
    data,
    loadingMore,
    ...res
}: Props) => {
    const [momentumScrolled, setMomentumScrolled] = useState(false);
    const list: any = useRef(null);

    const onMomentumScrollBegin = () => {
        setMomentumScrolled(false);
    };
    const handleRefresh = () => {
        onRefresh?.();
    };

    const handleEndReached = (info: any) => {
        if (!momentumScrolled) {
            onLoadMore?.();
            setMomentumScrolled(true);
        }
    };

    const renderNoData = () => {
        const { noDataText, noDataCanRefresh, onNoDataRefresh, noDataClassName, loading } = res;
        return (
            <NoData
                className={noDataClassName}
                loading={loading}
                text={noDataText}
                canRefresh={noDataCanRefresh}
                onRefresh={onNoDataRefresh}
            />
        );
    };
    function keyExtractor(item: any, i: number): string {
        if (item?.id) {
            return `${item.id}`;
        }
        return `${i}`;
    }
    function renderFooter() {
        if (sections?.length && loadingMore) {
            return (
                <View className="my-2 items-center">
                    <StyledIndicator size={24} />
                </View>
            );
        }
        return null;
    }

    return (
        <SectionList
            ref={list}
            sections={sections}
            stickySectionHeadersEnabled={true}
            keyExtractor={keyExtractor}
            initialNumToRender={1}
            onEndReached={handleEndReached}
            onEndReachedThreshold={0.5}
            onMomentumScrollBegin={onMomentumScrollBegin}
            ListEmptyComponent={renderNoData}
            ListFooterComponent={renderFooter}
            showsVerticalScrollIndicator={false}
            refreshing={!!refreshing}
            refreshControl={
                <RefreshControl
                    refreshing={!!refreshing}
                    colors={[Themes.COLORS.primary]}
                    tintColor={Themes.COLORS.primary}
                    onRefresh={handleRefresh}
                />
            }
            keyboardShouldPersistTaps={'handled'}
            {...res}
        />
    );
};

/**
 * A styled section list component with support for loading, refreshing, and custom styles.
 *
 * @param {boolean} loading - Indicates if the list is in a loading state.
 * @param {Array} sections - The sections to be rendered in the list.
 * @param {React.ComponentType<any>} ListHeaderComponent - Component to render as the header of the list.
 * @param {boolean} refreshing - Indicates if the list is in a refreshing state.
 * @param {object} customStyle - Custom styles to be applied to the list.
 * @param {Function} onLoadMore - Callback function to load more data when the end of the list is reached.
 * @param {Function} onRefresh - Callback function to refresh the list.
 * @param {Array} data - The data to be rendered in the list.
 * @param {boolean} loadingMore - Indicates if more data is being loaded.
 * @param {object} res - Additional props to be passed to the SectionList component.
 *
 * @returns {JSX.Element} The styled section list component.
 */

export default memo(StyledSectionList, isEqual);
