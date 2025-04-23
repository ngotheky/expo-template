// Mock dependencies
jest.mock('react-native', () => {
    const rn = jest.requireActual('react-native');
    return {
        ...rn,
        RefreshControl: ({ refreshing, colors, tintColor, onRefresh }: any) => ({
            type: 'RefreshControl',
            props: { refreshing, colors, tintColor, onRefresh },
        }),
        View: ({ className, children }: any) => ({
            type: 'View',
            props: { className, children },
        }),
        Text: ({ children }: any) => ({
            type: 'Text',
            props: { children },
        }),
    };
});

jest.mock('@shopify/flash-list', () => ({
    FlashList: ({
        keyExtractor,
        ListEmptyComponent,
        showsVerticalScrollIndicator,
        onEndReachedThreshold,
        onEndReached,
        refreshControl,
        ListFooterComponent,
        keyboardShouldPersistTaps,
        data,
        testID,
        renderItem,
        ...rest
    }: any) => ({
        type: 'FlashList',
        props: {
            keyExtractor,
            ListEmptyComponent,
            showsVerticalScrollIndicator,
            onEndReachedThreshold,
            onEndReached,
            refreshControl,
            ListFooterComponent,
            keyboardShouldPersistTaps,
            data,
            renderItem,
            testID: testID || 'styled-list',
            ...rest,
        },
    }),
}));

jest.mock('@/assets/themes', () => ({
    Themes: {
        COLORS: {
            primary: '#007bff',
        },
    },
}));

jest.mock('../../base/StyledNoData', () => {
    return {
        __esModule: true,
        default: ({ className, loading, text, canRefresh, onRefresh }: any) => ({
            type: 'NoData',
            props: { className, loading, text, canRefresh, onRefresh, testID: 'no-data' },
        }),
    };
});

jest.mock('../../base/StyledIndicator', () => {
    return {
        __esModule: true,
        default: ({ size }: any) => ({
            type: 'StyledIndicator',
            props: { size, testID: 'styled-indicator' },
        }),
    };
});

import React from 'react';
import { render } from '@testing-library/react-native';
import StyledList from '../../base/StyledList';
import { Themes } from '@/assets/themes';
import { I18Type } from '../../base/StyledText';
import { Text } from 'react-native';
import { ListRenderItem } from '@shopify/flash-list';

describe('StyledList Component', () => {
    const mockData = [
        { id: 1, name: 'Item 1' },
        { id: 2, name: 'Item 2' },
    ];

    // Mock renderItem function theo đúng kiểu ListRenderItem
    const mockRenderItem: ListRenderItem<any> = ({ item }) => {
        return <Text key={item.id || Math.random()}>{item.name}</Text>;
    };

    it('renders correctly with data', () => {
        const { getByTestId } = render(<StyledList data={mockData} renderItem={mockRenderItem} />);

        const list = getByTestId('styled-list');
        expect(list).toBeTruthy();
        expect(list.props.data).toBe(mockData);
    });

    it('shows NoData component when data is empty', () => {
        const { getByTestId } = render(
            <StyledList data={[]} renderItem={mockRenderItem} noDataText={'No data' as I18Type} />,
        );

        const list = getByTestId('styled-list');
        const noDataComponent = list.props.ListEmptyComponent();

        expect(noDataComponent.type).toBe('NoData');
        expect(noDataComponent.props.text).toBe('No data');
    });

    it('passes loading state to NoData component', () => {
        const { getByTestId } = render(<StyledList data={[]} renderItem={mockRenderItem} loading={true} />);

        const list = getByTestId('styled-list');
        const noDataComponent = list.props.ListEmptyComponent();

        expect(noDataComponent.props.loading).toBe(true);
    });

    it('configures RefreshControl correctly', () => {
        const mockOnRefresh = jest.fn();
        const { getByTestId } = render(
            <StyledList data={mockData} renderItem={mockRenderItem} refreshing={true} onRefresh={mockOnRefresh} />,
        );

        const list = getByTestId('styled-list');
        const refreshControl = list.props.refreshControl;

        expect(refreshControl.props.refreshing).toBe(true);
        expect(refreshControl.props.colors).toEqual([Themes.COLORS.primary]);
        expect(refreshControl.props.tintColor).toBe(Themes.COLORS.primary);

        refreshControl.props.onRefresh();
        expect(mockOnRefresh).toHaveBeenCalled();
    });

    it('renders footer with loading indicator when loadingMore is true', () => {
        const { getByTestId } = render(<StyledList data={mockData} renderItem={mockRenderItem} loadingMore={true} />);

        const list = getByTestId('styled-list');
        const footer = list.props.ListFooterComponent();

        expect(footer).not.toBeNull();
        expect(footer.props.children.type).toBe('StyledIndicator');
    });

    it('does not render footer when data is empty', () => {
        const { getByTestId } = render(<StyledList data={[]} renderItem={mockRenderItem} loadingMore={true} />);

        const list = getByTestId('styled-list');
        const footer = list.props.ListFooterComponent();

        expect(footer).toBeNull();
    });

    it('calls onLoadMore when end is reached', () => {
        const mockOnLoadMore = jest.fn();
        const { getByTestId } = render(
            <StyledList data={mockData} renderItem={mockRenderItem} onLoadMore={mockOnLoadMore} />,
        );

        const list = getByTestId('styled-list');

        expect(list.props.onEndReachedThreshold).toBe(0.01);
        list.props.onEndReached();
        expect(mockOnLoadMore).toHaveBeenCalled();
    });

    it('generates correct key extractor', () => {
        const { getByTestId } = render(<StyledList data={mockData} renderItem={mockRenderItem} />);

        const list = getByTestId('styled-list');
        const keyExtractor = list.props.keyExtractor;

        expect(keyExtractor({ id: 123 }, 0)).toBe('123');
        expect(keyExtractor({ name: 'No ID' }, 5)).toBe('5');
    });
});
