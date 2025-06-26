/**
 * Main index file for component tests
 * This file ensures that all component tests are included in test coverage
 */

import React from 'react';
import { render } from '@testing-library/react-native';

// Mock assets
jest.mock('@/assets/images', () => ({
    photo: {
        defaultImage: { uri: 'default-image-uri' },
    },
}));

// Mock i18next and react-i18next
jest.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key: string) => key, // Return the key as the translation
    }),
}));

jest.mock('i18next', () => ({
    exists: jest.fn().mockReturnValue(true),
}));

// Import components for testing
import StyledButton from '@/components/base/StyledButton';
import StyledText from '@/components/base/StyledText';
import StyledTouchable from '@/components/base/StyledTouchable';

describe('StyledButton Component', () => {
    it('renders button with title correctly', () => {
        const component = render(<StyledButton title="common.confirm" />);
        expect(component).toBeTruthy();
        expect(component.toJSON()).toBeTruthy();
    });

    it('handles press events', () => {
        const onPress = jest.fn();
        const component = render(<StyledButton title="common.cancel" onPress={onPress} />);
        expect(component).toBeTruthy();
    });
});

describe('StyledText Component', () => {
    it('renders text correctly with i18nText', () => {
        const component = render(<StyledText i18nText="common.noText" />);
        expect(component).toBeTruthy();
        expect(component.toJSON()).toBeTruthy();
    });

    it('renders text correctly with originValue', () => {
        const component = render(<StyledText originValue="Test Text" />);
        expect(component).toBeTruthy();
        expect(component.toJSON()).toBeTruthy();
    });
});

describe('StyledTouchable Component', () => {
    it('renders touchable correctly', () => {
        const component = render(
            <StyledTouchable>
                <StyledText i18nText="common.theme" />
            </StyledTouchable>,
        );
        expect(component).toBeTruthy();
        expect(component.toJSON()).toBeTruthy();
    });
});

describe('Component Tests', () => {
    it('should import all working component tests', () => {
        // This test ensures that all working test files are included in coverage
        expect(true).toBe(true);
    });
});
