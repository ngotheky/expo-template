// Mock dependencies
jest.mock('@/assets/images', () => ({
    icons: {
        checkBox: {
            check: { uri: 'check-icon' },
            uncheck: { uri: 'uncheck-icon' },
        },
    },
}));

jest.mock('../../base/StyledIcon', () => {
    const reactNative = jest.requireActual('react-native');
    return {
        __esModule: true,
        default: ({ className }: any) => (
            <reactNative.Text testID="styled-icon" className={className}>
                icon
            </reactNative.Text>
        ),
    };
});

jest.mock('../../base/StyledText', () => {
    const reactNative = jest.requireActual('react-native');
    return {
        __esModule: true,
        default: ({ i18nText, className }: any) => (
            <reactNative.Text testID="styled-text" className={className}>
                {i18nText}
            </reactNative.Text>
        ),
        I18Type: String,
    };
});

jest.mock('@expo/vector-icons/Feather', () => {
    const reactNative = jest.requireActual('react-native');
    return {
        __esModule: true,
        default: ({ className }: any) => (
            <reactNative.Text testID="styled-icon" className={className}>
                icon
            </reactNative.Text>
        ),
    };
});

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

import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CheckBox from '../../base/CheckBox';
import { Common } from '@/types/enums';
import { I18Type } from '../../base/StyledText';

describe('CheckBox Component', () => {
    const defaultProps = {
        content: 'checkbox.label' as I18Type,
        onConfirm: jest.fn(),
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders unchecked checkbox correctly', () => {
        const { getByTestId } = render(<CheckBox {...defaultProps} />);

        const icon = getByTestId('styled-icon');
        expect(icon).toBeTruthy();
    });

    it('renders checked checkbox correctly', () => {
        const { getByTestId } = render(<CheckBox {...defaultProps} value={Common.ACTIVE} />);

        const icon = getByTestId('styled-icon');
        expect(icon).toBeTruthy();
    });

    it('renders with content', () => {
        const { getByTestId } = render(<CheckBox {...defaultProps} />);

        const text = getByTestId('styled-text');
        expect(text).toBeTruthy();
    });

    it('applies custom contentClassName', () => {
        const { getByTestId } = render(<CheckBox {...defaultProps} contentClassName="content-class" />);

        const icon = getByTestId('styled-icon');
        expect(icon.props.className).toContain('content-class');
    });

    it('applies custom iconClassName', () => {
        const { getByTestId } = render(<CheckBox {...defaultProps} iconClassName="icon-class" />);

        const text = getByTestId('styled-text');
        expect(text.props.className).toContain('icon-class');
    });

    it('handles press when unchecked', () => {
        const onConfirm = jest.fn();
        const { getByTestId } = render(<CheckBox content={'checkbox.label' as I18Type} onConfirm={onConfirm} />);

        const touchable = getByTestId('styled-touchable');
        fireEvent.press(touchable);

        expect(onConfirm).toHaveBeenCalledWith(Common.ACTIVE);
    });

    it('handles press when checked', () => {
        const onConfirm = jest.fn();
        const { getByTestId } = render(
            <CheckBox content={'checkbox.label' as I18Type} value={Common.ACTIVE} onConfirm={onConfirm} />,
        );

        const touchable = getByTestId('styled-touchable');
        fireEvent.press(touchable);

        expect(onConfirm).toHaveBeenCalledWith(Common.INACTIVE);
    });

    it('applies disabled state correctly', () => {
        const { getByTestId } = render(<CheckBox {...defaultProps} disabled={true} />);

        const touchable = getByTestId('styled-touchable');
        expect(touchable.props.disabled).toBe(true);
    });
});
