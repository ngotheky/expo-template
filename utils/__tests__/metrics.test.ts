// Mock dependencies first
const mockDimensions = {
    get: jest.fn(() => ({ width: 375, height: 812, scale: 2, fontScale: 1 })),
};

const mockUseSafeAreaInsets = jest.fn(() => ({
    top: 44,
    bottom: 34,
    left: 0,
    right: 0,
}));

const mockVerticalScale = jest.fn(value => value * 1.2);

const mockPlatform = {
    OS: 'ios',
};

jest.mock('react-native', () => ({
    Platform: mockPlatform,
    Dimensions: mockDimensions,
}));

jest.mock('react-native-safe-area-context', () => ({
    useSafeAreaInsets: mockUseSafeAreaInsets,
}));

jest.mock('react-native-size-matters', () => ({
    verticalScale: mockVerticalScale,
}));

describe('Metrics', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetModules();
        // Reset to default values
        mockPlatform.OS = 'ios';
        mockDimensions.get.mockReturnValue({ width: 375, height: 812, scale: 2, fontScale: 1 });
        mockUseSafeAreaInsets.mockReturnValue({
            top: 44,
            bottom: 34,
            left: 0,
            right: 0,
        });
        mockVerticalScale.mockImplementation(value => value * 1.2);
    });

    describe('Constants', () => {
        it('should export all required constants', () => {
            const Metrics = require('../metrics').default;

            expect(Metrics.navBarHeight).toBeDefined();
            expect(Metrics.screenHeight).toBeDefined();
            expect(Metrics.screenWidth).toBeDefined();
            expect(Metrics.safeBottomPadding).toBeDefined();
            expect(Metrics.safeTopPadding).toBeDefined();
        });

        it('should have numeric values', () => {
            const Metrics = require('../metrics').default;

            expect(typeof Metrics.navBarHeight).toBe('number');
            expect(typeof Metrics.screenHeight).toBe('number');
            expect(typeof Metrics.screenWidth).toBe('number');
            expect(typeof Metrics.safeBottomPadding).toBe('number');
            expect(typeof Metrics.safeTopPadding).toBe('number');
        });

        it('should have positive screen dimensions', () => {
            const Metrics = require('../metrics').default;

            expect(Metrics.screenHeight).toBeGreaterThan(0);
            expect(Metrics.screenWidth).toBeGreaterThan(0);
            expect(Metrics.navBarHeight).toBeGreaterThan(0);
        });

        it('should have non-negative safe areas', () => {
            const Metrics = require('../metrics').default;

            expect(Metrics.safeTopPadding).toBeGreaterThanOrEqual(0);
            expect(Metrics.safeBottomPadding).toBeGreaterThanOrEqual(0);
        });
    });

    describe('iOS Platform', () => {
        beforeEach(() => {
            mockPlatform.OS = 'ios';
        });

        it('should calculate correct metrics for iOS', () => {
            const Metrics = require('../metrics').default;

            expect(Metrics.navBarHeight).toBe(54);
            expect(Metrics.screenHeight).toBe(812);
            expect(Metrics.screenWidth).toBe(375);
            expect(Metrics.safeTopPadding).toBe(44);
            expect(Metrics.safeBottomPadding).toBe(34);
        });

        it('should handle zero safe area insets on iOS', () => {
            mockUseSafeAreaInsets.mockReturnValue({
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
            });

            const Metrics = require('../metrics').default;

            expect(Metrics.safeTopPadding).toBe(36); // verticalScale(30)
            expect(Metrics.safeBottomPadding).toBe(20);
        });

        it('should handle landscape orientation', () => {
            mockDimensions.get.mockReturnValue({ width: 812, height: 375, scale: 2, fontScale: 1 });

            const Metrics = require('../metrics').default;

            expect(Metrics.screenHeight).toBe(812);
            expect(Metrics.screenWidth).toBe(375);
        });
    });

    describe('Android Platform', () => {
        beforeEach(() => {
            mockPlatform.OS = 'android';
        });

        it('should calculate correct metrics for Android', () => {
            const Metrics = require('../metrics').default;

            expect(Metrics.navBarHeight).toBe(66);
            expect(Metrics.screenHeight).toBe(812);
            expect(Metrics.screenWidth).toBe(375);
            expect(Metrics.safeTopPadding).toBe(18); // verticalScale(15)
            expect(Metrics.safeBottomPadding).toBe(0);
        });

        it('should handle zero safe area top on Android', () => {
            mockUseSafeAreaInsets.mockReturnValue({
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
            });

            const Metrics = require('../metrics').default;

            expect(Metrics.safeTopPadding).toBe(18); // verticalScale(15) - Android always uses this
            expect(Metrics.safeBottomPadding).toBe(0);
        });
    });

    describe('Edge Cases', () => {
        it('should handle equal width and height dimensions', () => {
            mockDimensions.get.mockReturnValue({ width: 375, height: 375, scale: 2, fontScale: 1 });

            const Metrics = require('../metrics').default;

            expect(Metrics.screenHeight).toBe(375);
            expect(Metrics.screenWidth).toBe(375);
        });

        it('should handle very small dimensions', () => {
            mockDimensions.get.mockReturnValue({ width: 100, height: 200, scale: 1, fontScale: 1 });

            const Metrics = require('../metrics').default;

            expect(Metrics.screenHeight).toBe(200);
            expect(Metrics.screenWidth).toBe(100);
        });

        it('should handle very large dimensions', () => {
            mockDimensions.get.mockReturnValue({ width: 1920, height: 1080, scale: 3, fontScale: 1 });

            const Metrics = require('../metrics').default;

            expect(Metrics.screenHeight).toBe(1920);
            expect(Metrics.screenWidth).toBe(1080);
        });
    });

    describe('Platform-specific Navigation Bar Height', () => {
        it('should use correct nav bar height for iOS', () => {
            mockPlatform.OS = 'ios';

            const Metrics = require('../metrics').default;

            expect(Metrics.navBarHeight).toBe(54);
        });

        it('should use correct nav bar height for Android', () => {
            mockPlatform.OS = 'android';

            const Metrics = require('../metrics').default;

            expect(Metrics.navBarHeight).toBe(66);
        });

        it('should handle unknown platform', () => {
            mockPlatform.OS = 'web' as any;

            const Metrics = require('../metrics').default;

            // Should default to Android values (non-iOS)
            expect(Metrics.navBarHeight).toBe(66);
        });
    });
});
