const Expo = {
    Linking: {
        makeUrl: jest.fn(),
        openURL: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
    },
    Constants: {
        manifest: {
            extra: {
                apiUrl: 'https://api.example.com',
            },
        },
    },
};

module.exports = Expo;
