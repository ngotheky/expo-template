// Mock dependencies
jest.mock('../../base/StyledText', () => {
    const reactNative = jest.requireActual('react-native');
    return {
        __esModule: true,
        default: ({ i18nText, className }: any) => (
            <reactNative.Text testID="styled-text" className={className}>
                {i18nText}
            </reactNative.Text>
        ),
        I18Type: String,
    };
});

jest.mock('../../base/StyledTouchable', () => {
    const reactNative = jest.requireActual('react-native');
    return {
        __esModule: true,
        default: ({ children, onPress }: any) => (
            <reactNative.Pressable testID="styled-touchable" onPress={onPress}>
                {children}
            </reactNative.Pressable>
        ),
    };
});

import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import StyledNoData from '../../base/StyledNoData';
import { ActivityIndicator, View } from 'react-native';
import { I18Type } from '../../base/StyledText';

describe('StyledNoData Component', () => {
    it('renders with default text when no text provided', () => {
        const { getByTestId } = render(<StyledNoData />);

        const text = getByTestId('styled-text');
        expect(text).toBeTruthy();
    });

    it('renders with provided text', () => {
        const { getByTestId } = render(<StyledNoData text={'custom.noData' as I18Type} />);

        const text = getByTestId('styled-text');
        expect(text).toBeTruthy();
    });

    it('shows ActivityIndicator when loading', () => {
        const { UNSAFE_getByType } = render(<StyledNoData loading={true} />);

        expect(UNSAFE_getByType(ActivityIndicator)).toBeTruthy();
    });

    it('does not show text when loading', () => {
        const { queryByTestId } = render(<StyledNoData loading={true} />);

        expect(queryByTestId('styled-text')).toBeNull();
    });

    it('shows refresh button when canRefresh is true', () => {
        const { getAllByTestId } = render(<StyledNoData canRefresh={true} />);

        const texts = getAllByTestId('styled-text');
        expect(texts.length).toBe(2);
    });

    it('does not show refresh button when canRefresh is false', () => {
        const { getAllByTestId } = render(<StyledNoData canRefresh={false} />);

        const texts = getAllByTestId('styled-text');
        expect(texts.length).toBe(1);
    });

    it('does not show refresh button when loading', () => {
        const { queryByTestId } = render(<StyledNoData canRefresh={true} loading={true} />);

        expect(queryByTestId('styled-touchable')).toBeNull();
    });

    it('calls onRefresh when refresh button is pressed', () => {
        const mockOnRefresh = jest.fn();
        const { getByTestId } = render(<StyledNoData canRefresh={true} onRefresh={mockOnRefresh} />);

        const touchable = getByTestId('styled-touchable');
        fireEvent.press(touchable);

        expect(mockOnRefresh).toHaveBeenCalledTimes(1);
    });

    it('applies custom className to container', () => {
        const { UNSAFE_getByType } = render(<StyledNoData className="custom-class" />);

        const view = UNSAFE_getByType(View);
        expect(view.props.className).toContain('custom-class');
    });

    it('applies custom clsText to text', () => {
        const { getByTestId } = render(<StyledNoData clsText="text-class" />);

        const text = getByTestId('styled-text');
        expect(text.props.className).toContain('text-class');
    });

    it('applies custom clsReload to reload text', () => {
        const { getAllByTestId } = render(<StyledNoData canRefresh={true} clsReload="reload-class" />);

        const texts = getAllByTestId('styled-text');
        expect(texts[1].props.className).toContain('reload-class');
    });
});
