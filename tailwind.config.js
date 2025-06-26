/** @type {import('tailwindcss').Config} */
module.exports = {
    presets: [require('nativewind/preset')],
    content: [
        // Ensure this points to your source code
        './app/**/*.{js,tsx,ts,jsx}',
        './components/**/*.{js,jsx,ts,tsx}',
        // If you use a `src` directory, add: './src/**/*.{js,tsx,ts,jsx}'
        // Do the same with `components`, `hooks`, `styles`, or any other top-level directories
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                primary: '#2B88D8',
                secondary: '#E9ECEF',
                textDark: 'rgba(255, 255, 255, 0.8)',
                textLight: '#333',
                bgInputDark: '#2c2c2e',
                bgInputLight: '#ffffff',
                bgDark: '#1c1c1e',
                bgLight: '#fff',
                borderDark: '#2b2b2b',
                borderLight: '#e1e1e1',
            },
        },
    },
    plugins: [],
    plugins: [],
};
