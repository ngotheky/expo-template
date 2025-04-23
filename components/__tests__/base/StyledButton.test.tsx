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
        default: ({ children, className }: any) => (
            <reactNative.Text testID="styled-touchable" className={className}>
                {children}
            </reactNative.Text>
        ),
    };
});

jest.mock('../../base/StyledImage', () => {
    const reactNative = jest.requireActual('react-native');
    return {
        __esModule: true,
        default: ({ source, className }: any) => <reactNative.Text testID="styled-image" className={className} />,
    };
});

import React from 'react';
import { render } from '@testing-library/react-native';
import StyledButton from '../../base/StyledButton';
import { I18Type } from '../../base/StyledText';

describe('StyledButton Component', () => {
    it('renders button with title correctly', () => {
        const { getByTestId, getByText } = render(<StyledButton title={'button.title' as I18Type} />);

        expect(getByTestId('styled-touchable')).toBeTruthy();
        expect(getByTestId('styled-text')).toBeTruthy();
        expect(getByText('button.title')).toBeTruthy();
    });

    it('applies custom className correctly', () => {
        const { getByTestId } = render(<StyledButton title={'button.title' as I18Type} className="custom-class" />);

        const touchable = getByTestId('styled-touchable');
        expect(touchable.props.className).toContain('custom-class');
    });

    it('applies custom titleClassName correctly', () => {
        const { getByTestId } = render(<StyledButton title={'button.title' as I18Type} titleClassName="title-class" />);

        const text = getByTestId('styled-text');
        expect(text.props.className).toContain('title-class');
    });

    it('renders with prefix icon', () => {
        const { getAllByTestId } = render(
            <StyledButton title={'button.title' as I18Type} prefixIcon={{ uri: 'test-icon' }} />,
        );

        const images = getAllByTestId('styled-image');
        expect(images.length).toBe(1);
    });

    it('renders with subfix icon', () => {
        const { getAllByTestId } = render(
            <StyledButton title={'button.title' as I18Type} subfixIcon={{ uri: 'test-icon' }} />,
        );

        const images = getAllByTestId('styled-image');
        expect(images.length).toBe(1);
    });

    it('renders with both prefix and subfix icons', () => {
        const { getAllByTestId } = render(
            <StyledButton
                title={'button.title' as I18Type}
                prefixIcon={{ uri: 'prefix-icon' }}
                subfixIcon={{ uri: 'subfix-icon' }}
            />,
        );

        const images = getAllByTestId('styled-image');
        expect(images.length).toBe(2);
    });
});
