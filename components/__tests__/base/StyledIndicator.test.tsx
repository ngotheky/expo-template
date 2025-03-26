// Mock dependencies
jest.mock('react-native', () => {
    const rn = jest.requireActual('react-native');
    return {
        ...rn,
        ActivityIndicator: ({ color, size, className, testID, ...props }: any) => ({
            type: 'ActivityIndicator',
            props: { color, size, className, testID: testID || 'activity-indicator', ...props },
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

import React from 'react';
import { render } from '@testing-library/react-native';
import StyledIndicator from '../../base/StyledIndicator';
import { Themes } from '@/assets/themes';

describe('StyledIndicator Component', () => {
    it('renders correctly with default props', () => {
        const { getByTestId } = render(<StyledIndicator />);

        const indicator = getByTestId('activity-indicator');
        expect(indicator).toBeTruthy();
    });

    it('uses primary color from theme by default', () => {
        const { getByTestId } = render(<StyledIndicator />);

        const indicator = getByTestId('activity-indicator');
        expect(indicator.props.color).toBe(Themes.COLORS.primary);
    });

    it('uses small size by default', () => {
        const { getByTestId } = render(<StyledIndicator />);

        const indicator = getByTestId('activity-indicator');
        expect(indicator.props.size).toBe('small');
    });

    it('applies the correct default class name', () => {
        const { getByTestId } = render(<StyledIndicator />);

        const indicator = getByTestId('activity-indicator');
        expect(indicator.props.className).toBe('flex-1 justify-center items-center');
    });

    it('allows overriding default props', () => {
        const { getByTestId } = render(
            <StyledIndicator color="red" size="large" className="custom-class" testID="custom-indicator" />,
        );

        const indicator = getByTestId('custom-indicator');
        expect(indicator.props.color).toBe('red');
        expect(indicator.props.size).toBe('large');
        expect(indicator.props.className).toBe('custom-class');
    });
});
