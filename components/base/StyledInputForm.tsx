import { forwardRef, FunctionComponent } from 'react';
import {
    Controller,
    ControllerFieldState,
    ControllerRenderProps,
    FieldPath,
    FieldValues,
    RegisterOptions,
    useFormContext,
    UseFormReturn,
    UseFormStateReturn,
} from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ReactNativeModalDateTimePickerProps } from 'react-native-modal-datetime-picker';
import StyledInput, { StyledInputProps } from './StyledInput';
import { logger } from '@/utils/helper';
import { ICheckBox } from './CheckBox';

type TName = FieldPath<FieldValues>;

export interface IParamsRender {
    field: ControllerRenderProps<FieldValues, TName>;
    fieldState: ControllerFieldState;
    formState: UseFormStateReturn<FieldValues>;
}
interface FormInputProps extends StyledInputProps {
    name: string;
    rules?: RegisterOptions;
    defaultValue?: string;
    form?: UseFormReturn;
    InputComponent?: FunctionComponent<any>;
    renderBaseInput?: ({ field, fieldState, formState }: IParamsRender) => React.ReactElement;
    dynamicOnChangeName?: string;
    dateTimeProps?: ReactNativeModalDateTimePickerProps;
    checkBoxProps?: ICheckBox;
}

const StyledInputForm = forwardRef((props: FormInputProps, ref: any) => {
    const { t } = useTranslation();
    const {
        name,
        rules,
        defaultValue = '',
        onChangeText,
        InputComponent = StyledInput,
        form,
        dynamicOnChangeName = 'onChangeText',
        checkBoxProps,
        ...inputProps
    } = props;
    const formContext = useFormContext();

    if (!(formContext || form)) {
        logger(t('error.inputComponent'), true, '');
        return <InputComponent errorMessage={'error.inputComponent'} {...inputProps} editable={false} />;
    }

    const { control } = formContext || form;
    const customInputProps = checkBoxProps || inputProps;

    const onChangeInput = (text: string, onChangeControl: any) => {
        onChangeText ? onChangeText(text) : onChangeControl(text);
    };

    const renderBaseInput = ({ field: { onChange, value }, fieldState: { error } }: IParamsRender) => {
        return (
            <InputComponent
                ref={ref}
                value={value}
                errorMessage={error?.message}
                {...{ [dynamicOnChangeName]: (text: string) => onChangeInput(text, onChange) }}
                {...customInputProps}
            />
        );
    };

    return (
        <Controller
            control={control}
            name={name as any}
            defaultValue={defaultValue}
            rules={rules}
            render={props?.renderBaseInput || renderBaseInput}
        />
    );
});

/**
 * A styled input form component that integrates with react-hook-form and supports dynamic input components.
 *
 * @param {FormInputProps} props - The properties for the input form.
 * @param {any} ref - The reference to the input component.
 *
 * @returns {JSX.Element} The rendered input component.
 *
 * @component
 *
 * @example
 * // Usage example:
 * <StyledInputForm
 *   name="username"
 *   rules={{ required: 'Username is required' }}
 *   defaultValue=""
 *   onChangeText={(text) => console.log(text)}
 *   InputComponent={CustomInputComponent}
 *   form={formInstance}
 *   dynamicOnChangeName="onChangeText"
 *   checkBoxProps={{ someProp: 'value' }}
 *   {...otherInputProps}
 * />
 *
 * @remarks
 * This component uses `useTranslation` for localization and `useFormContext` from `react-hook-form` for form context.
 * It supports custom input components and dynamic onChange handlers.
 *
 * @requires useTranslation
 * @requires useFormContext
 * @requires Controller
 *
 * @see {@link https://react-hook-form.com/api/useformcontext} for more information on `useFormContext`.
 * @see {@link https://react.i18next.com/latest/usetranslation-hook} for more information on `useTranslation`.
 */

export default StyledInputForm;
