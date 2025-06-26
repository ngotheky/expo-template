import StyledText, { I18Type } from '@/components/base/StyledText';
import { StyledTouchable } from '../base';
import { StyledTouchableProps } from '../base/StyledTouchable';
import classNames from 'classnames';

interface Props extends StyledTouchableProps {
    title: I18Type;
    value?: string;
    renderRight?: () => React.ReactNode;
}

const SettingRow = ({ title, value, renderRight, className, ...rest }: Props) => {
    return (
        <StyledTouchable
            {...rest}
            className={classNames('flex-row items-center justify-between px-2 border-b border-gray-50 py-2', className)}
        >
            <StyledText i18nText={title} />
            {renderRight ? renderRight() : <StyledText originValue={value ?? ''} />}
        </StyledTouchable>
    );
};

export default SettingRow;
