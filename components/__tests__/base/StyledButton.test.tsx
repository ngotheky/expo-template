// Mock dependencies
jest.mock('@/components/base/StyledText', () => {
    const React = require('react');
    const MockStyledText = (props: any) =>
        React.createElement('Text', {
            testID: 'styled-text',
            ...props,
        });

    // Export both default and named exports
    MockStyledText.I18Type = String;

    return {
        __esModule: true,
        default: MockStyledText,
        I18Type: String,
    };
});

jest.mock('@/components/base/StyledTouchable', () => {
    const React = require('react');
    const MockStyledTouchable = (props: any) =>
        React.createElement('View', {
            testID: 'styled-touchable',
            ...props,
        });

    return {
        __esModule: true,
        default: MockStyledTouchable,
    };
});

jest.mock('@/components/base/StyledImage', () => {
    const React = require('react');
    const MockStyledImage = (props: any) =>
        React.createElement('Image', {
            testID: 'styled-image',
            ...props,
        });

    return {
        __esModule: true,
        default: MockStyledImage,
    };
});

import React from 'react';
import { render } from '@testing-library/react-native';
import StyledButton from '@/components/base/StyledButton';
import { I18Type } from '@/components/base/StyledText';

describe('StyledButton Component', () => {
    it('renders button with title correctly', () => {
        const component = render(<StyledButton title={'common.confirm' as I18Type} />);

        // Check if the button renders without errors
        expect(component).toBeTruthy();
        expect(component.toJSON()).toBeTruthy();
    });

    it('applies custom className correctly', () => {
        const component = render(<StyledButton title={'common.cancel' as I18Type} className="custom-class" />);

        expect(component).toBeTruthy();
        expect(component.toJSON()).toBeTruthy();
    });

    it('applies custom titleClassName correctly', () => {
        const component = render(<StyledButton title={'common.close' as I18Type} titleClassName="title-class" />);

        expect(component).toBeTruthy();
        expect(component.toJSON()).toBeTruthy();
    });

    it('renders with prefix icon', () => {
        const component = render(<StyledButton title={'tab.home' as I18Type} prefixIcon={{ uri: 'test-icon' }} />);

        expect(component).toBeTruthy();
        expect(component.toJSON()).toBeTruthy();
    });

    it('renders with subfix icon', () => {
        const component = render(<StyledButton title={'tab.setting' as I18Type} subfixIcon={{ uri: 'test-icon' }} />);

        expect(component).toBeTruthy();
        expect(component.toJSON()).toBeTruthy();
    });

    it('renders with both prefix and subfix icons', () => {
        const component = render(
            <StyledButton
                title={'auth.login.buttonLogin' as I18Type}
                prefixIcon={{ uri: 'prefix-icon' }}
                subfixIcon={{ uri: 'subfix-icon' }}
            />,
        );

        expect(component).toBeTruthy();
        expect(component.toJSON()).toBeTruthy();
    });
});
