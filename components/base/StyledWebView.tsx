import { memo } from 'react';
import isEqual from 'react-fast-compare';
import { ActivityIndicator, View } from 'react-native';
import { WebView, WebViewProps } from 'react-native-webview';
import { StyledText } from '.';

const StyledWebView = (props: WebViewProps) => {
    return (
        <View className="flex-1">
            <WebView
                {...props}
                pullToRefreshEnabled
                startInLoadingState={true}
                renderLoading={() => (
                    <View className="flex-1">
                        <ActivityIndicator size={'large'} />
                    </View>
                )}
                renderError={errorName => (
                    <View className="flex-1">
                        <StyledText originValue={`Error name: ${errorName}`} />
                        <StyledText className="mt-2" originValue={'Pull down to try again'} />
                    </View>
                )}
            />
        </View>
    );
};

/**
 * A styled WebView component that wraps the react-native-webview's WebView component.
 * It provides additional functionality such as pull-to-refresh, custom loading indicator,
 * and custom error handling.
 *
 * @param {WebViewProps} props - The properties passed to the WebView component.
 *
 * @returns {JSX.Element} A styled WebView component.
 */

export default memo(StyledWebView, isEqual);
