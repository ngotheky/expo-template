jest.mock('@/assets/themes', () => ({
    Themes: {
        COLORS: {
            primary: '#007bff',
        },
    },
}));

import React from 'react';
import { render } from '@testing-library/react-native';
import StyledIndicator from '@/components/base/StyledIndicator';

describe('StyledIndicator Component', () => {
    it('renders correctly with default props', () => {
        const component = render(<StyledIndicator />);
        expect(component).toBeTruthy();
        expect(component.toJSON()).toBeTruthy();
    });

    it('renders correctly with custom props', () => {
        const component = render(
            <StyledIndicator color="red" size="large" className="custom-class" testID="custom-indicator" />,
        );
        expect(component).toBeTruthy();
        expect(component.toJSON()).toBeTruthy();
    });

    it('renders without errors', () => {
        expect(() => render(<StyledIndicator />)).not.toThrow();
    });
});
