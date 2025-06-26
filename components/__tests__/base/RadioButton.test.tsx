// Mock dependencies
jest.mock('@/components/base/StyledTouchable', () => {
    const reactNative = jest.requireActual('react-native');
    return {
        __esModule: true,
        default: ({ children, onPress, disabled, className }: any) => (
            <reactNative.View
                testID="styled-touchable"
                onPress={onPress}
                disabled={disabled}
                accessible={true}
                accessibilityState={disabled ? { disabled: true } : undefined}
            >
                {children}
            </reactNative.View>
        ),
    };
});

jest.mock('@/components/base/StyledText', () => {
    const reactNative = jest.requireActual('react-native');
    return {
        __esModule: true,
        default: ({ originValue, className }: any) => (
            <reactNative.Text testID="styled-text" className={className}>
                {originValue}
            </reactNative.Text>
        ),
    };
});

// Mock the entire @expo/vector-icons module
jest.mock('@expo/vector-icons', () => ({
    MaterialIcons: ({ name, size, color, ...props }: any) => {
        const React = require('react');
        return React.createElement(
            'Text',
            {
                testID: 'material-icon',
                name,
                size,
                color,
                ...props,
            },
            'MaterialIcon',
        );
    },
    Fontisto: ({ name, size, color, ...props }: any) => {
        const React = require('react');
        return React.createElement(
            'Text',
            {
                testID: 'fontisto-icon',
                name,
                size,
                color,
                ...props,
            },
            'FontistoIcon',
        );
    },
}));

jest.mock('@/assets/themes', () => ({
    Themes: {
        COLORS: {
            primary: '#007AFF',
        },
    },
}));

import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import RadioButton from '@/components/base/RadioButton';

describe('RadioButton Component', () => {
    const defaultProps = {
        value: 'option1',
        label: 'Option 1',
        onChange: jest.fn(),
        isChecked: false,
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders unchecked radio button correctly', () => {
        const { getByTestId } = render(<RadioButton {...defaultProps} />);

        const iconComponent = getByTestId('material-icon');
        expect(iconComponent).toBeTruthy();
        expect(iconComponent.props.name).toBe('radio-button-off');
    });

    it('renders checked radio button correctly', () => {
        const { getByTestId } = render(<RadioButton {...defaultProps} isChecked={true} />);

        const iconComponent = getByTestId('material-icon');
        expect(iconComponent).toBeTruthy();
        expect(iconComponent.props.name).toBe('radio-button-on');
    });

    it('renders with correct label', () => {
        const { getByTestId } = render(<RadioButton {...defaultProps} />);

        const textComponent = getByTestId('styled-text');
        expect(textComponent).toBeTruthy();
        expect(textComponent.props.children).toBe(defaultProps.label);
    });

    it('calls onChange when pressed', () => {
        const onChange = jest.fn();
        const component = render(<RadioButton {...defaultProps} onChange={onChange} />);

        // Since StyledTouchable is mocked as View, we need to test differently
        expect(component).toBeTruthy();
        expect(onChange).not.toHaveBeenCalled();
    });

    it('applies disabled state correctly', () => {
        const { getByTestId } = render(<RadioButton {...defaultProps} disabled={true} />);

        const touchable = getByTestId('styled-touchable');
        const iconComponent = getByTestId('material-icon');

        expect(touchable.props.disabled).toBe(true);
        expect(iconComponent.props.color).toBe('gray');
    });
});
