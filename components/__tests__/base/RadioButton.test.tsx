// Mock dependencies
jest.mock('../../base/StyledTouchable', () => {
    const reactNative = jest.requireActual('react-native');
    return {
        __esModule: true,
        default: ({ children, onPress, disabled }: any) => (
            <reactNative.Pressable testID="styled-touchable" onPress={onPress} disabled={disabled}>
                {children}
            </reactNative.Pressable>
        ),
    };
});

jest.mock('../../base/StyledText', () => {
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

jest.mock('@expo/vector-icons/MaterialIcons', () => {
    const reactNative = jest.requireActual('react-native');
    return {
        __esModule: true,
        default: ({ name, size, color }: any) => (
            <reactNative.Text testID="material-icon" name={name} size={size} color={color}>
                icon
            </reactNative.Text>
        ),
    };
});

import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import RadioButton from '../../base/RadioButton';

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
        const { getByTestId } = render(<RadioButton {...defaultProps} onChange={onChange} />);

        const touchable = getByTestId('styled-touchable');
        fireEvent.press(touchable);

        expect(onChange).toHaveBeenCalledWith(defaultProps.value);
    });

    it('applies disabled state correctly', () => {
        const { getByTestId } = render(<RadioButton {...defaultProps} disabled={true} />);

        const touchable = getByTestId('styled-touchable');
        const iconComponent = getByTestId('material-icon');

        expect(touchable.props.disabled).toBe(true);
        expect(iconComponent.props.color).toBe('gray');
    });
});
