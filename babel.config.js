module.exports = function (api) {
    api.cache(true);
    return {
        presets: [['babel-preset-expo', { jsxImportSource: 'nativewind' }]],
        plugins: [
            [
                'module-resolver',
                {
                    root: ['./'],
                    alias: {
                        '@app': './app',
                        '@components': './components',
                        '@utils': './utils',
                        '@assets': './assets',
                        '@api': './api',
                        '@hooks': './hooks',
                    },
                    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
                },
                'nativewind/babel',
            ],
        ],
    };
};
