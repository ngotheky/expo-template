import axios, { InternalAxiosRequestConfig } from 'axios';
import { logger } from '@/utils/helper';
import NetInfo from '@react-native-community/netinfo';
import { apiLogger } from '@/utils/logger';
import constants from '@/utils/constants';
import i18next from '@/utils/i18next';
import AlertMessage from '@/components/base/AlertMessage';
import useUserProfile from '@/store/useUserProfile';
import { I18Type } from '@/components/base/StyledText';
import Constants from 'expo-constants';

const AUTH_URL_REFRESH_TOKEN = `${Constants.expoConfig?.extra?.EXPO_PUBLIC_API_URL}auth/refresh-token`;
let hasAnyNetworkDialogShown = false;

const request = axios.create({
    baseURL: Constants.expoConfig?.extra?.EXPO_PUBLIC_API_URL,
    timeout: 8000,
    headers: { Accept: '*/*' },
});
// for multiple requests
let isRefreshing = false;
let failedQueue: any = [];

const processQueue = (error: any, token: string | null | undefined = null) => {
    failedQueue.forEach((prom: any) => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });

    failedQueue = [];
};

const rejectError = (err: string, validNetwork: boolean) => {
    // Avoid being null
    if (validNetwork !== false) {
        return Promise.reject(err);
    }
    return Promise.reject(i18next.t(constants.ERRORS.network as I18Type));
};

request.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
        // Do something before API is sent
        const { token } = useUserProfile.getState();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        // Do something with API error
        apiLogger(
            `%c FAILED ${error.response.method?.toUpperCase()} from ${error.response.config.url}:`,
            'background: red; color: #fff',
            error.response,
        );
        return Promise.reject(error);
    },
);

request.interceptors.response.use(
    response => response.data,
    async error => {
        // Check network first
        const network = await NetInfo.fetch();
        const validNetwork = !!network.isInternetReachable && !!network.isConnected;
        // validNetwork on first render in iOS will return NULL
        if (validNetwork === false && !hasAnyNetworkDialogShown) {
            hasAnyNetworkDialogShown = true;
            AlertMessage({
                message: i18next.t('common.error.network'),
                checkNetworkError: true,
                onPressOk: () => {
                    hasAnyNetworkDialogShown = false;
                },
            });
        }
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        const { response } = error || {};
        const { data } = response || {};
        const { errorMessage, errorKey } = data || {};
        const { onLogout, setAllNewToken, refreshToken: localRefreshToken } = useUserProfile.getState();
        apiLogger(
            `%c FAILED ${error.config?.method?.toUpperCase()} from ${error?.config?.url}:`,
            'background: red; color: #fff',
            error.response,
        );
        const originalRequest = error.config;
        if (errorMessage === 'RefreshToken_NotExist') {
            logger('RefreshToken_NotExist => logout');
            // Logout here
            onLogout();
            return rejectError(error, validNetwork);
        }
        if (
            ((error.response && error.response.status === 401) || errorMessage === 'Token_Expire') &&
            !originalRequest.retry
        ) {
            if (isRefreshing) {
                try {
                    const queuePromise: any = await new Promise((resolve: any, reject: any) => {
                        failedQueue.push({ resolve, reject });
                    });
                    originalRequest.headers.Authorization = `Bearer ${queuePromise.token}`;
                    return request(originalRequest);
                } catch (err) {
                    return rejectError(String(err), validNetwork);
                }
            }
            logger('refreshing token...');
            originalRequest.retry = true;
            isRefreshing = true;

            try {
                const refreshTokenResponse = await axios.post(AUTH_URL_REFRESH_TOKEN, {
                    refreshToken: localRefreshToken,
                });
                const { token, refreshToken } = refreshTokenResponse.data;
                setAllNewToken(token, refreshToken);
                originalRequest.headers.Authorization = `Bearer ${token}`;
                processQueue(null, token);
                return request(originalRequest);
            } catch (err) {
                // Logout here
                onLogout();
                processQueue(err, null);
                return rejectError(String(err), validNetwork);
            } finally {
                isRefreshing = false;
            }
        }
        error.message = errorMessage || constants.ERRORS.default;
        error.keyMessage = errorKey || '';
        return rejectError(error.message, validNetwork);
    },
);

export default request;
