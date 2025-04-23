/**
 * Main index file for component tests
 * This file ensures that all component tests are included in test coverage
 */

// Base Components
import './base/StyledText.test.tsx';
import './base/StyledButton.test.tsx';
import './base/StyledImage.test.tsx';
import './base/StyledTouchable.test.tsx';
import './base/StyledNoData.test.tsx';
import './base/CheckBox.test.tsx';
import './base/modal/ModalizeManager.test.tsx';

describe('Component Tests', () => {
    it('should import all component tests', () => {
        // This test doesn't do anything specific
        // It's just to ensure that all test files are included in coverage
        expect(true).toBe(true);
    });
});
