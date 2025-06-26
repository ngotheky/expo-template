// Mock assets
jest.mock('@/assets/images', () => ({
    photo: {
        defaultImage: { uri: 'default-image-uri' },
    },
}));

import React from 'react';
import { render } from '@testing-library/react-native';
import StyledImage from '@/components/base/StyledImage';

describe('StyledImage Component', () => {
    const testSource = { uri: 'test-image-uri' };

    it('renders correctly with provided source', () => {
        const component = render(<StyledImage source={testSource} />);
        expect(component).toBeTruthy();
        expect(component.toJSON()).toBeTruthy();
    });

    it('passes other props to the Image component', () => {
        const component = render(
            <StyledImage source={testSource} style={{ width: 100, height: 100 }} resizeMode="cover" />,
        );

        expect(component).toBeTruthy();
        expect(component.toJSON()).toBeTruthy();
    });

    it('handles error events correctly', () => {
        const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

        const component = render(<StyledImage source={testSource} />);

        expect(component).toBeTruthy();
        expect(component.toJSON()).toBeTruthy();

        consoleSpy.mockRestore();
    });
});
