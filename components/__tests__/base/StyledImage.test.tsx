// Mock assets
jest.mock('@/assets/images', () => ({
    photo: {
        defaultImage: { uri: 'default-image-uri' },
    },
}));

// Mock các thành phần riêng lẻ thay vì mock toàn bộ react-native
jest.mock('react-native/Libraries/Image/Image', () => {
    return function MockImage({
        source,
        onError,
        testID,
        ...props
    }: {
        source: any;
        onError?: any;
        testID?: string;
        [key: string]: any;
    }) {
        return {
            type: 'MockImage',
            props: { source, testID: testID || 'mock-image', ...props },
        };
    };
});

import React from 'react';
import { render, act } from '@testing-library/react-native';
import StyledImage from '../../base/StyledImage';
import { View, Text } from 'react-native';

describe('StyledImage Component', () => {
    const testSource = { uri: 'test-image-uri' };

    it('renders correctly with provided source', () => {
        const { getByTestId } = render(<StyledImage source={testSource} />);
        const image = getByTestId('mock-image');
        expect(image).toBeTruthy();
    });

    it('passes other props to the Image component', () => {
        const { getByTestId } = render(
            <StyledImage source={testSource} style={{ width: 100, height: 100 }} resizeMode="cover" />,
        );

        const image = getByTestId('mock-image');
        expect(image.props.style).toEqual({ width: 100, height: 100 });
        expect(image.props.resizeMode).toEqual('cover');
    });

    it('handles error events correctly', () => {
        jest.spyOn(console, 'error').mockImplementation(() => {}); // Suppress error logs
        const { getByTestId, rerender } = render(<StyledImage source={testSource} />);

        // Sử dụng cách tiếp cận đơn giản hơn để mock useState
        // Tạo một mock function đơn giản
        const originalUseState = React.useState;
        const mockSetState = jest.fn();

        // Sử dụng any để tránh lỗi TypeScript trong trường hợp này
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const mockUseState = jest.fn().mockImplementation((initialValue: any) => {
            if (typeof initialValue === 'boolean') {
                return [true, mockSetState];
            }
            return originalUseState(initialValue);
        });

        // Gán mock vào React.useState
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (React.useState as any) = mockUseState;

        // Re-render với mocked useState
        rerender(<StyledImage source={testSource} />);

        // Khôi phục useState sau khi test
        React.useState = originalUseState;
        (console.error as jest.Mock).mockRestore();
    });
});
