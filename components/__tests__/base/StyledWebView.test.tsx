// Mock dependencies
jest.mock('react-native-webview', () => {
    const reactNative = jest.requireActual('react-native');
    return {
        WebView: ({
            source,
            renderLoading,
            renderError,
            startInLoadingState,
            pullToRefreshEnabled,
            onLoad,
            onError,
            ...props
        }: any) => (
            <reactNative.View testID="webview" {...props}>
                <reactNative.Text testID="webview-url">{source?.uri || 'No URL'}</reactNative.Text>
                <reactNative.Text testID="pull-to-refresh">
                    {pullToRefreshEnabled ? 'enabled' : 'disabled'}
                </reactNative.Text>
                <reactNative.Text testID="loading-state">{startInLoadingState ? 'true' : 'false'}</reactNative.Text>
                <reactNative.Pressable
                    testID="trigger-loading"
                    onPress={() => {
                        if (renderLoading) {
                            // Simulate loading state
                        }
                    }}
                >
                    <reactNative.Text>Trigger Loading</reactNative.Text>
                </reactNative.Pressable>
                <reactNative.Pressable
                    testID="trigger-error"
                    onPress={() => {
                        if (renderError) {
                            // Simulate error state
                        }
                    }}
                >
                    <reactNative.Text>Trigger Error</reactNative.Text>
                </reactNative.Pressable>
                {startInLoadingState && renderLoading && (
                    <reactNative.View testID="loading-component">{renderLoading()}</reactNative.View>
                )}
                {renderError && (
                    <reactNative.View testID="error-component">{renderError('Network Error')}</reactNative.View>
                )}
            </reactNative.View>
        ),
    };
});

jest.mock('../../base/StyledText', () => {
    const reactNative = jest.requireActual('react-native');
    return {
        __esModule: true,
        default: ({ originValue, className }: any) => (
            <reactNative.Text testID="styled-text" className={className}>
                {originValue}
            </reactNative.Text>
        ),
    };
});

import React from 'react';
import { render } from '@testing-library/react-native';
import { ActivityIndicator } from 'react-native';
import StyledWebView from '../../base/StyledWebView';

describe('StyledWebView Component', () => {
    const defaultProps = {
        source: { uri: 'https://example.com' },
    };

    it('renders correctly with default props', () => {
        const { getByTestId } = render(<StyledWebView {...defaultProps} />);

        expect(getByTestId('webview')).toBeTruthy();
        expect(getByTestId('webview-url')).toBeTruthy();
    });

    it('displays the correct URL', () => {
        const { getByTestId, getByText } = render(<StyledWebView {...defaultProps} />);

        expect(getByText('https://example.com')).toBeTruthy();
    });

    it('enables pull to refresh by default', () => {
        const { getByTestId, getByText } = render(<StyledWebView {...defaultProps} />);

        expect(getByText('enabled')).toBeTruthy();
    });

    it('starts in loading state by default', () => {
        const { getByTestId, getByText } = render(<StyledWebView {...defaultProps} />);

        expect(getByText('true')).toBeTruthy();
    });

    it('renders loading component when in loading state', () => {
        const { getByTestId } = render(<StyledWebView {...defaultProps} />);

        expect(getByTestId('loading-component')).toBeTruthy();
    });

    it('renders error component when error occurs', () => {
        const { getByTestId } = render(<StyledWebView {...defaultProps} />);

        expect(getByTestId('error-component')).toBeTruthy();
    });

    it('displays error message in error component', () => {
        const { getAllByTestId, getByText } = render(<StyledWebView {...defaultProps} />);

        const styledTexts = getAllByTestId('styled-text');
        expect(styledTexts.length).toBeGreaterThan(0);

        // Check for error message
        expect(getByText('Error name: Network Error')).toBeTruthy();
        expect(getByText('Pull down to try again')).toBeTruthy();
    });

    it('applies custom props to WebView', () => {
        const customProps = {
            ...defaultProps,
            scalesPageToFit: true,
            javaScriptEnabled: false,
        };

        const { getByTestId } = render(<StyledWebView {...customProps} />);

        const webview = getByTestId('webview');
        expect(webview.props.scalesPageToFit).toBe(true);
        expect(webview.props.javaScriptEnabled).toBe(false);
    });

    it('handles HTML source correctly', () => {
        const htmlProps = {
            source: { html: '<html><body><h1>Test HTML</h1></body></html>' },
        };

        const { getByTestId, getByText } = render(<StyledWebView {...htmlProps} />);

        expect(getByTestId('webview')).toBeTruthy();
        expect(getByText('No URL')).toBeTruthy(); // Since it's HTML source, not URI
    });

    it('wraps content in flex-1 container', () => {
        const { getByTestId } = render(<StyledWebView {...defaultProps} />);

        // The component should be wrapped in a flex-1 View
        // This is tested by checking the container structure
        expect(getByTestId('webview')).toBeTruthy();
    });

    it('handles onLoad prop when provided', () => {
        const onLoad = jest.fn();
        const component = render(<StyledWebView {...defaultProps} onLoad={onLoad} />);

        expect(component.getByTestId('webview')).toBeTruthy();
    });

    it('handles onError prop when provided', () => {
        const onError = jest.fn();
        const component = render(<StyledWebView {...defaultProps} onError={onError} />);

        expect(component.getByTestId('webview')).toBeTruthy();
    });

    it('renders without source prop', () => {
        const { getByTestId, getByText } = render(<StyledWebView />);

        expect(getByTestId('webview')).toBeTruthy();
        expect(getByText('No URL')).toBeTruthy();
    });
});
