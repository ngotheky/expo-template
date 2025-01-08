import { FlashList, FlashListProps } from '@shopify/flash-list';
import React, { forwardRef, FunctionComponent, memo, useMemo } from 'react';
import { RefreshControl, View } from 'react-native';
import { I18Type } from './StyledText';
import isEqual from 'react-fast-compare';
import NoData from './StyledNoData';
import { Themes } from '@/assets/themes';
import StyledIndicator from './StyledIndicator';

interface Props extends FlashListProps<any> {
    FlatListComponent?: FunctionComponent<any>;
    noDataText?: I18Type;
    noDataCanRefresh?: boolean;
    onNoDataRefresh?(): void;
    refreshing?: boolean;
    noDataClassName?: string;
    loading?: boolean;
    loadingMore?: boolean;
    onLoadMore?(): void;
}

const StyledList = (props: Props, ref: any) => {
    const { refreshing, onRefresh, data, loadingMore, onLoadMore } = props;
    const renderNoData = () => {
        const { noDataText, noDataCanRefresh, onNoDataRefresh, noDataClassName, loading } = props;
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
        if (data?.length && loadingMore) {
            return (
                <View className="my-[8px] items-center">
                    <StyledIndicator size={24} />
                </View>
            );
        }
        return null;
    }
    const FlatListComponent = useMemo(() => {
        return props?.FlatListComponent || FlashList;
    }, [props?.FlatListComponent]);

    return (
        <FlatListComponent
            ref={ref}
            keyExtractor={keyExtractor}
            ListEmptyComponent={renderNoData}
            showsVerticalScrollIndicator={false}
            onEndReachedThreshold={0.01}
            onEndReached={onLoadMore}
            refreshControl={
                <RefreshControl
                    refreshing={!!refreshing}
                    colors={[Themes.COLORS.primary]}
                    tintColor={Themes.COLORS.primary}
                    onRefresh={() => onRefresh?.()}
                />
            }
            ListFooterComponent={renderFooter}
            keyboardShouldPersistTaps={'never'}
            {...props}
        />
    );
};
/**
 * A styled list component that renders a list with optional refresh and load more functionality.
 *
 * @link https://shopify.github.io/flash-list/docs/usage
 *
 * @param {Props} props - The properties passed to the component.
 * @param {any} ref - The reference to the component.
 *
 * @returns {JSX.Element} The styled list component.
 *
 * @component
 *
 * @example
 * ```tsx
 * <StyledList
 *   refreshing={false}
 *   onRefresh={() => console.log('Refreshed')}
 *   data={[{ id: 1, name: 'Item 1' }, { id: 2, name: 'Item 2' }]}
 *   loadingMore={false}
 *   onLoadMore={() => console.log('Load more')}
 *   noDataText="No data available"
 *   noDataCanRefresh={true}
 *   onNoDataRefresh={() => console.log('No data refresh')}
 *   noDataClassName="common.noData"
 *   loading={false}
 *   FlatListComponent={CustomFlatList}
 * />
 * ```
 *
 * @property {boolean} refreshing - Indicates if the list is currently refreshing.
 * @property {Function} onRefresh - Callback function to handle refresh action.
 * @property {Array} data - The data to be displayed in the list.
 * @property {boolean} loadingMore - Indicates if more data is being loaded.
 * @property {Function} onLoadMore - Callback function to handle load more action.
 * @property {string} noDataText - Text to display when there is no data.
 * @property {boolean} noDataCanRefresh - Indicates if the no data state can be refreshed.
 * @property {Function} onNoDataRefresh - Callback function to handle refresh action when there is no data.
 * @property {string} noDataClassName - CSS class name for the no data component.
 * @property {boolean} loading - Indicates if the list is in a loading state.
 * @property {React.ComponentType} FlatListComponent - Custom flat list component to be used instead of the default.
 * @property {number} estimatedItemSize -  is a single numeric value that hints FlashList about the approximate size of the items before they're rendered
 */
export default memo(forwardRef(StyledList), isEqual);
