import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import SettingRow from '../../settings/SettingRow';
import { I18Type } from '../../base/StyledText';

// Mock dependencies
jest.mock('../../base', () => ({
    StyledTouchable: ({ children, onPress, className, ...props }: any) => {
        const React = require('react');
        return React.createElement(
            'TouchableOpacity',
            {
                testID: 'styled-touchable',
                onPress,
                className,
                ...props,
            },
            children,
        );
    },
}));

jest.mock('../../base/StyledText', () => {
    const React = require('react');
    const MockStyledText = ({ i18nText, originValue, ...props }: any) =>
        React.createElement(
            'Text',
            {
                testID: 'styled-text',
                ...props,
            },
            i18nText || originValue,
        );

    MockStyledText.I18Type = String;

    return {
        __esModule: true,
        default: MockStyledText,
        I18Type: String,
    };
});

jest.mock('classnames', () => jest.fn((...args) => args.filter(Boolean).join(' ')));

describe('SettingRow Component', () => {
    const mockOnPress = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders correctly with title and value', () => {
        const { getByTestId, getAllByTestId } = render(
            <SettingRow title={'settings.title' as I18Type} value="Test Value" onPress={mockOnPress} />,
        );

        expect(getByTestId('styled-touchable')).toBeTruthy();
        expect(getAllByTestId('styled-text')).toHaveLength(2); // title and value
    });

    it('renders correctly with title only', () => {
        const { getByTestId, getAllByTestId } = render(
            <SettingRow title={'settings.title' as I18Type} onPress={mockOnPress} />,
        );

        expect(getByTestId('styled-touchable')).toBeTruthy();
        expect(getAllByTestId('styled-text')).toHaveLength(2); // title and empty value
    });

    it('renders custom renderRight component', () => {
        const CustomComponent = () => {
            const React = require('react');
            return React.createElement('Text', { testID: 'custom-component' }, 'Custom');
        };

        const { getByTestId, queryByTestId } = render(
            <SettingRow
                title={'settings.title' as I18Type}
                renderRight={() => <CustomComponent />}
                onPress={mockOnPress}
            />,
        );

        expect(getByTestId('styled-touchable')).toBeTruthy();
        expect(getByTestId('custom-component')).toBeTruthy();
        // Should not render default value text when renderRight is provided
        expect(queryByTestId('styled-text')).toBeTruthy(); // Only title text should be present
    });

    it('handles onPress event', () => {
        const { getByTestId } = render(
            <SettingRow title={'settings.title' as I18Type} value="Test Value" onPress={mockOnPress} />,
        );

        fireEvent.press(getByTestId('styled-touchable'));
        expect(mockOnPress).toHaveBeenCalledTimes(1);
    });

    it('applies custom className', () => {
        const { getByTestId } = render(
            <SettingRow
                title={'settings.title' as I18Type}
                value="Test Value"
                className="custom-class"
                onPress={mockOnPress}
            />,
        );

        const touchable = getByTestId('styled-touchable');
        expect(touchable.props.className).toContain('custom-class');
    });

    it('applies default styling classes', () => {
        const { getByTestId } = render(
            <SettingRow title={'settings.title' as I18Type} value="Test Value" onPress={mockOnPress} />,
        );

        const touchable = getByTestId('styled-touchable');
        expect(touchable.props.className).toContain('flex-row');
        expect(touchable.props.className).toContain('items-center');
        expect(touchable.props.className).toContain('justify-between');
        expect(touchable.props.className).toContain('px-2');
        expect(touchable.props.className).toContain('border-b');
        expect(touchable.props.className).toContain('border-gray-50');
        expect(touchable.props.className).toContain('py-2');
    });

    it('passes additional props to StyledTouchable', () => {
        const { getByTestId } = render(
            <SettingRow
                title={'settings.title' as I18Type}
                value="Test Value"
                testID="custom-test-id"
                disabled={true}
                onPress={mockOnPress}
            />,
        );

        const touchable = getByTestId('custom-test-id');
        expect(touchable.props.testID).toBe('custom-test-id');
        expect(touchable.props.disabled).toBe(true);
    });

    it('displays title using i18nText prop', () => {
        const { getAllByTestId } = render(
            <SettingRow title={'settings.language' as I18Type} value="English" onPress={mockOnPress} />,
        );

        const textElements = getAllByTestId('styled-text');
        expect(textElements[0].children).toContain('settings.language');
    });

    it('displays value using originValue prop', () => {
        const { getAllByTestId } = render(
            <SettingRow title={'settings.language' as I18Type} value="English" onPress={mockOnPress} />,
        );

        const textElements = getAllByTestId('styled-text');
        expect(textElements[1].children).toContain('English');
    });

    it('displays empty string when value is undefined', () => {
        const { getAllByTestId } = render(<SettingRow title={'settings.title' as I18Type} onPress={mockOnPress} />);

        const textElements = getAllByTestId('styled-text');
        expect(textElements[1].children).toEqual([]);
    });
});
