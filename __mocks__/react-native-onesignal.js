export const LogLevel = {
    None: 0,
    Fatal: 1,
    Error: 2,
    Warn: 3,
    Info: 4,
    Debug: 5,
    Verbose: 6,
};

export const OSNotification = {};

export const OneSignal = {
    setAppId: jest.fn(),
    setLogLevel: jest.fn(),
    promptForPushNotificationsWithUserResponse: jest.fn(() => Promise.resolve(true)),
    setNotificationWillShowInForegroundHandler: jest.fn(),
    setNotificationOpenedHandler: jest.fn(),
    getDeviceState: jest.fn(() => Promise.resolve({ userId: 'test-user-id' })),
    setExternalUserId: jest.fn(() => Promise.resolve()),
    addTrigger: jest.fn(),
    addTriggers: jest.fn(),
    removeTrigger: jest.fn(),
    removeTriggers: jest.fn(),
    sendTag: jest.fn(),
};
