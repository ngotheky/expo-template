import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import StyledTouchable from '../../base/StyledTouchable';
import { Text, TouchableOpacity } from 'react-native';

// Mock lodash throttle
jest.mock('lodash', () => ({
    throttle: jest.fn(fn => fn), // Pass through the function for testing
}));

describe('StyledTouchable Component', () => {
    it('renders children correctly', () => {
        const { getByText } = render(
            <StyledTouchable>
                <Text>Test Button</Text>
            </StyledTouchable>,
        );

        expect(getByText('Test Button')).toBeTruthy();
    });

    it('passes custom props to TouchableOpacity', () => {
        const { UNSAFE_getByType } = render(
            <StyledTouchable testID="test-button" style={{ backgroundColor: 'red' }}>
                <Text>Test Button</Text>
            </StyledTouchable>,
        );

        const touchable = UNSAFE_getByType(TouchableOpacity);
        expect(touchable.props.testID).toBe('test-button');
        expect(touchable.props.style).toEqual({ backgroundColor: 'red' });
    });

    it('applies activeOpacity prop', () => {
        const { UNSAFE_getByType } = render(
            <StyledTouchable>
                <Text>Test Button</Text>
            </StyledTouchable>,
        );

        const touchable = UNSAFE_getByType(TouchableOpacity);
        expect(touchable.props.activeOpacity).toBe(0.6);
    });

    it('handles onPress event with throttling', () => {
        const mockOnPress = jest.fn();
        const { getByText } = render(
            <StyledTouchable onPress={mockOnPress}>
                <Text>Test Button</Text>
            </StyledTouchable>,
        );

        fireEvent.press(getByText('Test Button'));
        expect(mockOnPress).toHaveBeenCalledTimes(1);
    });

    it('applies disabled state correctly', () => {
        const mockOnPress = jest.fn();
        const { UNSAFE_getByType } = render(
            <StyledTouchable disabled={true} onPress={mockOnPress}>
                <Text>Test Button</Text>
            </StyledTouchable>,
        );

        const touchable = UNSAFE_getByType(TouchableOpacity);
        expect(touchable.props.disabled).toBe(true);
    });

    it('uses default onPress handler if none provided', () => {
        const { getByText } = render(
            <StyledTouchable>
                <Text>Test Button</Text>
            </StyledTouchable>,
        );

        // This should not throw an error
        fireEvent.press(getByText('Test Button'));
    });

    it('allows custom throttleTime', () => {
        const mockOnPress = jest.fn();
        const { getByText } = render(
            <StyledTouchable onPress={mockOnPress} throttleTime={2000}>
                <Text>Test Button</Text>
            </StyledTouchable>,
        );

        fireEvent.press(getByText('Test Button'));
        expect(mockOnPress).toHaveBeenCalledTimes(1);
    });
});
