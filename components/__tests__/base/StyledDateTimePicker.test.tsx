// Mock dependencies
jest.mock('react-native-modal-datetime-picker', () => {
    const reactNative = jest.requireActual('react-native');
    return {
        __esModule: true,
        default: ({ isVisible, onCancel, onConfirm, mode, date, ...props }: any) => {
            if (!isVisible) return null;
            return (
                <reactNative.View testID="datetime-picker-modal">
                    <reactNative.Text testID="picker-mode">{mode}</reactNative.Text>
                    <reactNative.Pressable
                        testID="confirm-button"
                        onPress={() => onConfirm(new Date('2023-01-01T12:00:00.000Z'))}
                    >
                        <reactNative.Text>Confirm</reactNative.Text>
                    </reactNative.Pressable>
                    <reactNative.Pressable testID="cancel-button" onPress={onCancel}>
                        <reactNative.Text>Cancel</reactNative.Text>
                    </reactNative.Pressable>
                </reactNative.View>
            );
        },
    };
});

jest.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key: string) => key,
    }),
}));

jest.mock('../../base/StyledTouchable', () => {
    const reactNative = jest.requireActual('react-native');
    return {
        __esModule: true,
        default: ({ children, onPress, disabled, className }: any) => (
            <reactNative.Pressable
                testID="styled-touchable"
                onPress={onPress}
                disabled={disabled}
                className={className}
            >
                {children}
            </reactNative.Pressable>
        ),
    };
});

import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Text } from 'react-native';
import StyledDateTimePicker from '../../base/StyledDateTimePicker';

describe('StyledDateTimePicker Component', () => {
    const defaultProps = {
        onConfirm: jest.fn(),
        date: new Date('2023-01-01'),
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders correctly with children', () => {
        const { getByTestId, getByText } = render(
            <StyledDateTimePicker {...defaultProps}>
                <Text>Select Date</Text>
            </StyledDateTimePicker>,
        );

        expect(getByTestId('styled-touchable')).toBeTruthy();
        expect(getByText('Select Date')).toBeTruthy();
    });

    it('opens picker when touchable is pressed', () => {
        const { getByTestId } = render(
            <StyledDateTimePicker {...defaultProps}>
                <Text>Select Date</Text>
            </StyledDateTimePicker>,
        );

        const touchable = getByTestId('styled-touchable');
        fireEvent.press(touchable);

        expect(getByTestId('datetime-picker-modal')).toBeTruthy();
    });

    it('calls onConfirm with date when confirmed', () => {
        const onConfirm = jest.fn();
        const { getByTestId } = render(
            <StyledDateTimePicker {...defaultProps} onConfirm={onConfirm}>
                <Text>Select Date</Text>
            </StyledDateTimePicker>,
        );

        // Open picker
        fireEvent.press(getByTestId('styled-touchable'));

        // Confirm selection
        fireEvent.press(getByTestId('confirm-button'));

        expect(onConfirm).toHaveBeenCalledWith(new Date('2023-01-01T12:00:00.000Z'));
    });

    it('calls onConfirm with formatted value when formatter is provided', () => {
        const onConfirm = jest.fn();
        const formatter = (date: Date) => date.toISOString().split('T')[0];

        const { getByTestId } = render(
            <StyledDateTimePicker {...defaultProps} onConfirm={onConfirm} formatter={formatter}>
                <Text>Select Date</Text>
            </StyledDateTimePicker>,
        );

        // Open picker
        fireEvent.press(getByTestId('styled-touchable'));

        // Confirm selection
        fireEvent.press(getByTestId('confirm-button'));

        expect(onConfirm).toHaveBeenCalledWith('2023-01-01');
    });

    it('calls onCancel when picker is cancelled', () => {
        const onCancel = jest.fn();
        const { getByTestId } = render(
            <StyledDateTimePicker {...defaultProps} onCancel={onCancel}>
                <Text>Select Date</Text>
            </StyledDateTimePicker>,
        );

        // Open picker
        fireEvent.press(getByTestId('styled-touchable'));

        // Cancel selection
        fireEvent.press(getByTestId('cancel-button'));

        expect(onCancel).toHaveBeenCalled();
    });

    it('does not open picker when disabled', () => {
        const { getByTestId, queryByTestId } = render(
            <StyledDateTimePicker {...defaultProps} disabled={true}>
                <Text>Select Date</Text>
            </StyledDateTimePicker>,
        );

        const touchable = getByTestId('styled-touchable');
        fireEvent.press(touchable);

        expect(queryByTestId('datetime-picker-modal')).toBeNull();
    });

    it('applies custom className correctly', () => {
        const { getByTestId } = render(
            <StyledDateTimePicker {...defaultProps} className="custom-class">
                <Text>Select Date</Text>
            </StyledDateTimePicker>,
        );

        const touchable = getByTestId('styled-touchable');
        expect(touchable.props.className).toBe('custom-class');
    });

    it('passes props to DateTimePickerModal correctly', () => {
        const { getByTestId } = render(
            <StyledDateTimePicker {...defaultProps} mode="time">
                <Text>Select Time</Text>
            </StyledDateTimePicker>,
        );

        // Open picker
        fireEvent.press(getByTestId('styled-touchable'));

        const pickerMode = getByTestId('picker-mode');
        expect(pickerMode.children[0]).toBe('time');
    });
});
