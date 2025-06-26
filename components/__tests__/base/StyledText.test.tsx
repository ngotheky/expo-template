jest.mock('react-i18next', () => ({
    useTranslation: () => ({ t: (key: string) => key }),
}));

jest.mock('i18next', () => ({
    exists: jest.fn(() => true),
}));

import React from 'react';
import { render } from '@testing-library/react-native';
import { I18Type } from '@/components/base/StyledText';
import StyledText from '@/components/base/StyledText';

describe('StyledText Component', () => {
    it('renders correctly with originValue', () => {
        const { getByText } = render(<StyledText originValue="Hello World" />);
        expect(getByText('Hello World')).toBeTruthy();
    });

    it('renders correctly with i18nText', () => {
        const { getByText } = render(<StyledText i18nText={'common.language' as I18Type} />);
        expect(getByText('common.language')).toBeTruthy();
    });

    it('applies custom className properly', () => {
        const component = render(<StyledText originValue="Text with class" className="text-red-500" />);
        expect(component).toBeTruthy();
        expect(component.toJSON()).toBeTruthy();
    });

    it('handles i18nParams correctly', () => {
        const { getByText } = render(<StyledText i18nText={'common.theme' as I18Type} i18nParams={{ name: 'User' }} />);
        expect(getByText('common.theme')).toBeTruthy();
    });

    it('handles empty values correctly', () => {
        const component = render(<StyledText i18nText={'common.noText' as I18Type} />);
        expect(component).toBeTruthy();
        expect(component.toJSON()).toBeTruthy();
    });
});
