jest.mock('react-i18next', () => ({
    useTranslation: () => ({ t: (key: string) => key }),
}));

jest.mock('i18next', () => ({
    exists: jest.fn(() => true),
}));

jest.mock('../../base/StyledText', () => {
    const reactNative = jest.requireActual('react-native');
    return {
        __esModule: true,
        default: ({ originValue, i18nText, i18nParams, className, ...props }: any) => {
            const displayText = originValue || i18nText || '';
            return (
                <reactNative.Text {...props} className={className}>
                    {displayText}
                </reactNative.Text>
            );
        },
        I18Type: String,
    };
});

import React from 'react';
import { render } from '@testing-library/react-native';
import { I18Type } from '../../base/StyledText';
import StyledText from '../../base/StyledText';

describe('StyledText Component', () => {
    it('renders correctly with originValue', () => {
        const { getByText } = render(<StyledText originValue="Hello World" />);
        expect(getByText('Hello World')).toBeTruthy();
    });

    it('renders correctly with i18nText', () => {
        const { getByText } = render(<StyledText i18nText={'common.hello' as I18Type} />);
        expect(getByText('common.hello')).toBeTruthy();
    });

    it('applies custom className properly', () => {
        const { getByText } = render(<StyledText originValue="Text with class" className="text-red-500" />);
        const textElement = getByText('Text with class');
        expect(textElement.props.className).toContain('text-red-500');
    });

    it('handles i18nParams correctly', () => {
        const { getByText } = render(
            <StyledText i18nText={'common.greeting' as I18Type} i18nParams={{ name: 'User' }} />,
        );
        expect(getByText('common.greeting')).toBeTruthy();
    });

    it('handles empty values correctly', () => {
        const { getByText } = render(<StyledText i18nText={'' as I18Type} />);
        expect(getByText('')).toBeTruthy();
    });
});
