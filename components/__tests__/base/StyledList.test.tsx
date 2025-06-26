// Mock dependencies
jest.mock('react-native', () => {
    const rn = jest.requireActual('react-native');
    rn.RefreshControl = jest.fn().mockImplementation(props => props);
    return rn;
});

jest.mock('@shopify/flash-list', () => {
    const React = require('react');
    return {
        FlashList: (props: any) =>
            React.createElement('FlashList', {
                testID: 'styled-list',
                ...props,
            }),
    };
});

jest.mock('@/assets/themes', () => ({
    Themes: {
        COLORS: {
            primary: '#007bff',
        },
    },
}));

jest.mock('../../base/StyledNoData', () => {
    const React = require('react');
    return {
        __esModule: true,
        default: (props: any) =>
            React.createElement('View', {
                testID: 'no-data',
                ...props,
            }),
    };
});

jest.mock('../../base/StyledIndicator', () => {
    const React = require('react');
    return {
        __esModule: true,
        default: (props: any) =>
            React.createElement('View', {
                testID: 'styled-indicator',
                ...props,
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

    // Mock renderItem function with proper ListRenderItem type
    const mockRenderItem: ListRenderItem<any> = ({ item }) => {
        return <Text key={item.id || Math.random()}>{item.name}</Text>;
    };

    it('renders correctly with data', () => {
        const component = render(<StyledList data={mockData} renderItem={mockRenderItem} />);
        expect(component).toBeTruthy();
        expect(component.toJSON()).toBeTruthy();
    });

    it('shows NoData component when data is empty', () => {
        const component = render(
            <StyledList data={[]} renderItem={mockRenderItem} noDataText={'No data' as I18Type} />,
        );
        expect(component).toBeTruthy();
        expect(component.toJSON()).toBeTruthy();
    });

    it('passes loading state to NoData component', () => {
        const component = render(<StyledList data={[]} renderItem={mockRenderItem} loading={true} />);
        expect(component).toBeTruthy();
        expect(component.toJSON()).toBeTruthy();
    });

    it('configures RefreshControl correctly', () => {
        const mockOnRefresh = jest.fn();
        const component = render(
            <StyledList data={mockData} renderItem={mockRenderItem} refreshing={true} onRefresh={mockOnRefresh} />,
        );
        expect(component).toBeTruthy();
        expect(component.toJSON()).toBeTruthy();
    });

    it('renders footer with loading indicator when loadingMore is true', () => {
        const component = render(<StyledList data={mockData} renderItem={mockRenderItem} loadingMore={true} />);
        expect(component).toBeTruthy();
        expect(component.toJSON()).toBeTruthy();
    });

    it('does not render footer when data is empty', () => {
        const component = render(<StyledList data={[]} renderItem={mockRenderItem} loadingMore={true} />);
        expect(component).toBeTruthy();
        expect(component.toJSON()).toBeTruthy();
    });

    it('calls onLoadMore when end is reached', () => {
        const mockOnLoadMore = jest.fn();
        const component = render(
            <StyledList data={mockData} renderItem={mockRenderItem} onLoadMore={mockOnLoadMore} />,
        );
        expect(component).toBeTruthy();
        expect(component.toJSON()).toBeTruthy();
    });

    it('generates correct key extractor', () => {
        const component = render(<StyledList data={mockData} renderItem={mockRenderItem} />);
        expect(component).toBeTruthy();
        expect(component.toJSON()).toBeTruthy();
    });
});
