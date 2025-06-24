// Mock dependencies
jest.mock('react-hook-form', () => ({
    useFormContext: jest.fn(),
    Controller: ({ render, name, defaultValue, rules }: any) => {
        const mockField = {
            onChange: jest.fn(),
            value: defaultValue || '',
        };
        const mockFieldState = {
            error: null,
        };
        const mockFormState = {};

        return render({
            field: mockField,
            fieldState: mockFieldState,
            formState: mockFormState,
        });
    },
}));

jest.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key: string) => key,
    }),
}));

jest.mock('../../base/StyledInput', () => {
    const reactNative = jest.requireActual('react-native');
    return {
        __esModule: true,
        default: ({ value, errorMessage, onChangeText, ...props }: any) => (
            <reactNative.TextInput
                testID="styled-input"
                value={value}
                onChangeText={onChangeText}
                placeholder={errorMessage}
                {...props}
            />
        ),
    };
});

jest.mock('@/utils/helper', () => ({
    logger: jest.fn(),
}));

import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { useFormContext } from 'react-hook-form';
import StyledInputForm from '../../base/StyledInputForm';

const mockUseFormContext = useFormContext as jest.MockedFunction<typeof useFormContext>;

describe('StyledInputForm Component', () => {
    const mockControl = {};
    const mockForm = {
        control: mockControl,
    };

    beforeEach(() => {
        jest.clearAllMocks();
        mockUseFormContext.mockReturnValue(mockForm as any);
    });

    it('renders correctly with form context', () => {
        const { getByTestId } = render(<StyledInputForm name="username" />);

        expect(getByTestId('styled-input')).toBeTruthy();
    });

    it('renders correctly with form prop', () => {
        mockUseFormContext.mockReturnValue(null as any);

        const { getByTestId } = render(<StyledInputForm name="username" form={mockForm as any} />);

        expect(getByTestId('styled-input')).toBeTruthy();
    });

    it('renders error state when no form context or form prop', () => {
        mockUseFormContext.mockReturnValue(null as any);

        const { getByTestId } = render(<StyledInputForm name="username" />);

        const input = getByTestId('styled-input');
        expect(input.props.placeholder).toBe('error.inputComponent');
        expect(input.props.editable).toBe(false);
    });

    it('applies default value correctly', () => {
        const { getByTestId } = render(<StyledInputForm name="username" defaultValue="test-value" />);

        const input = getByTestId('styled-input');
        expect(input.props.value).toBe('test-value');
    });

    it('handles text change correctly', () => {
        const onChangeText = jest.fn();
        const { getByTestId } = render(<StyledInputForm name="username" onChangeText={onChangeText} />);

        const input = getByTestId('styled-input');
        fireEvent.changeText(input, 'new-value');

        expect(onChangeText).toHaveBeenCalledWith('new-value');
    });

    it('uses custom InputComponent when provided', () => {
        const reactNative = jest.requireActual('react-native');
        const CustomInput = ({ testID, ...props }: any) => <reactNative.TextInput testID="custom-input" {...props} />;

        const { getByTestId } = render(<StyledInputForm name="username" InputComponent={CustomInput as any} />);

        expect(getByTestId('custom-input')).toBeTruthy();
    });

    it('applies rules correctly', () => {
        const rules = { required: 'This field is required' };
        const { getByTestId } = render(<StyledInputForm name="username" rules={rules} />);

        expect(getByTestId('styled-input')).toBeTruthy();
    });

    it('handles custom dynamicOnChangeName', () => {
        const { getByTestId } = render(<StyledInputForm name="username" dynamicOnChangeName="onValueChange" />);

        expect(getByTestId('styled-input')).toBeTruthy();
    });

    it('passes checkBoxProps correctly', () => {
        const checkBoxProps = { value: true, content: 'checkbox.label' };
        const { getByTestId } = render(<StyledInputForm name="agreement" checkBoxProps={checkBoxProps as any} />);

        expect(getByTestId('styled-input')).toBeTruthy();
    });

    it('forwards ref correctly', () => {
        const ref = React.createRef();
        render(<StyledInputForm ref={ref} name="username" />);

        // Ref should be forwarded to the input component
        expect(ref.current).toBeDefined();
    });

    it('renders with custom renderBaseInput', () => {
        const reactNative = jest.requireActual('react-native');
        const customRender = ({ field }: any) => (
            <reactNative.TextInput testID="custom-render-input" value={field.value} onChangeText={field.onChange} />
        );

        const { getByTestId } = render(<StyledInputForm name="username" renderBaseInput={customRender as any} />);

        expect(getByTestId('custom-render-input')).toBeTruthy();
    });
});
