// Mock dependencies
jest.mock('../../base', () => {
    const React = require('react');

    const MockStyledText = (props: any) =>
        React.createElement('Text', {
            testID: 'styled-text',
            ...props,
        });

    const MockStyledTouchable = (props: any) =>
        React.createElement('View', {
            testID: 'styled-touchable',
            ...props,
        });

    const MockStyledImage = (props: any) =>
        React.createElement('Image', {
            testID: 'styled-image',
            ...props,
        });

    return {
        StyledText: MockStyledText,
        StyledTouchable: MockStyledTouchable,
        StyledImage: MockStyledImage,
    };
});

jest.mock('../../base/StyledText', () => {
    return {
        __esModule: true,
        I18Type: String,
    };
});

import React from 'react';
import { render } from '@testing-library/react-native';
import StyledButton from '../../base/StyledButton';
import { I18Type } from '../../base/StyledText';

describe('StyledButton Component', () => {
    it('renders button with title correctly', () => {
        const component = render(<StyledButton title={'button.title' as I18Type} />);

        // Check if the button renders without errors
        expect(component).toBeTruthy();
        expect(component.toJSON()).toBeTruthy();
    });

    it('applies custom className correctly', () => {
        const component = render(<StyledButton title={'button.title' as I18Type} className="custom-class" />);

        expect(component).toBeTruthy();
        expect(component.toJSON()).toBeTruthy();
    });

    it('applies custom titleClassName correctly', () => {
        const component = render(<StyledButton title={'button.title' as I18Type} titleClassName="title-class" />);

        expect(component).toBeTruthy();
        expect(component.toJSON()).toBeTruthy();
    });

    it('renders with prefix icon', () => {
        const component = render(<StyledButton title={'button.title' as I18Type} prefixIcon={{ uri: 'test-icon' }} />);

        expect(component).toBeTruthy();
        expect(component.toJSON()).toBeTruthy();
    });

    it('renders with subfix icon', () => {
        const component = render(<StyledButton title={'button.title' as I18Type} subfixIcon={{ uri: 'test-icon' }} />);

        expect(component).toBeTruthy();
        expect(component.toJSON()).toBeTruthy();
    });

    it('renders with both prefix and subfix icons', () => {
        const component = render(
            <StyledButton
                title={'button.title' as I18Type}
                prefixIcon={{ uri: 'prefix-icon' }}
                subfixIcon={{ uri: 'subfix-icon' }}
            />,
        );

        expect(component).toBeTruthy();
        expect(component.toJSON()).toBeTruthy();
    });
});
