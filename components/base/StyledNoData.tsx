import { FunctionComponent } from 'react';
import { ActivityIndicator, View } from 'react-native';
import StyledText, { I18Type } from './StyledText';
import StyledTouchable from './StyledTouchable';
import classNames from 'classnames';

interface StyledListNoDataProps {
    text?: I18Type;
    canRefresh?: boolean;
    loading?: boolean;
    onRefresh?(): any;
    className?: string;
    clsText?: string;
    clsReload?: string;
}

const StyledNoData: FunctionComponent<StyledListNoDataProps> = ({
    text,
    canRefresh,
    loading,
    onRefresh,
    clsReload,
    clsText,
    className,
}: StyledListNoDataProps) => {
    return (
        <View className={classNames('items-center justify-center p-2', className)}>
            {loading ? (
                <View className="items-center">
                    <ActivityIndicator />
                </View>
            ) : (
                <StyledText
                    i18nText={text || 'common.noData'}
                    className={classNames('font-[600] text-[14px]  text-center', clsText)}
                />
            )}
            {!!canRefresh && !loading ? (
                <StyledTouchable onPress={onRefresh}>
                    <StyledText i18nText={'common.reload'} className={classNames('m-3 text-primary', clsReload)} />
                </StyledTouchable>
            ) : (
                <View />
            )}
        </View>
    );
};

export default StyledNoData;
