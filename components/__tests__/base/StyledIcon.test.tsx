// Mock dependencies
jest.mock('react-native', () => {
    const rn = jest.requireActual('react-native');
    return {
        ...rn,
        Image: ({ style, resizeMode, testID, ...props }: any) => ({
            type: 'Image',
            props: { style, resizeMode, testID: testID || 'styled-icon', ...props },
        }),
    };
});

jest.mock('react-native-size-matters', () => ({
    scale: (size: number) => size * 2, // Mock scale để trả về kích thước gấp đôi
}));

import React from 'react';
import { render } from '@testing-library/react-native';
import StyledIcon from '../../base/StyledIcon';

describe('StyledIcon Component', () => {
    const defaultProps = {
        size: 20,
        source: { uri: 'https://example.com/icon.png' },
    };

    it('renders correctly with default props', () => {
        const { getByTestId } = render(<StyledIcon {...defaultProps} />);

        const icon = getByTestId('styled-icon');
        expect(icon).toBeTruthy();
    });

    it('applies correct size with scale factor', () => {
        const { getByTestId } = render(<StyledIcon {...defaultProps} />);

        const icon = getByTestId('styled-icon');
        expect(icon.props.style).toEqual({
            width: 40, // 20 * 2 (do mock scale)
            height: 40, // 20 * 2 (do mock scale)
        });
    });

    it('sets resizeMode to contain by default', () => {
        const { getByTestId } = render(<StyledIcon {...defaultProps} />);

        const icon = getByTestId('styled-icon');
        expect(icon.props.resizeMode).toBe('contain');
    });

    it('passes other props to the Image component', () => {
        const testProps = {
            ...defaultProps,
            testID: 'custom-icon',
            accessibilityLabel: 'Icon Label',
        };

        const { getByTestId } = render(<StyledIcon {...testProps} />);

        const icon = getByTestId('custom-icon');
        expect(icon.props.accessibilityLabel).toBe('Icon Label');
    });
});
