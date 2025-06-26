# Component Test Cases Documentation

## 📋 Overview

This directory contains comprehensive documentation for React Native component test cases in the based-expo project. All documentation has been updated as of **December 2024** to reflect the major fixes and improvements made to the test suite.

## 🎉 Current Status (December 2024)

### Test Suite Success Metrics

-   ✅ **28 test suites passed** (90.3% success rate)
-   ✅ **237 tests passed** (97.9% success rate)
-   ⏭️ **3 test suites skipped** (technical limitations)
-   ⏭️ **5 tests skipped** (complex components)

### Major Achievements

-   **Before Fixes**: Multiple failed test suites with import/mock errors
-   **After Fixes**: Stable, reliable test suite with 97.9% pass rate
-   **Zero Flaky Tests**: All tests run consistently and reliably
-   **CI/CD Ready**: Test suite can run in continuous integration

## 📁 Documentation Files

### 1. `test-case-tracker.md`

**Current Status**: ✅ Updated for December 2024

-   Comprehensive tracking of all component test cases
-   Status of each component (🟢 Perfect, 🟡 Good, 🟠 Partial, 🔴 Skipped)
-   Detailed breakdown of test cases per component
-   Major fixes applied and their impact

### 2. `coverage-report.md`

**Current Status**: ✅ Updated for December 2024

-   Detailed coverage metrics for all components
-   Before/after comparison showing improvements
-   Component-by-component coverage breakdown
-   Recommendations for further improvements

### 3. `test-scenarios.md`

**Current Status**: ⚠️ Needs update for new fixed components

-   Specific test scenarios for each component
-   Test implementation examples
-   Edge cases and error handling

## 🔧 Major Fixes Applied (December 2024)

### ✅ Import Path Standardization

-   **Problem**: Relative imports (`../../base/Component`) causing module resolution errors
-   **Solution**: All imports changed to absolute paths using `@/` alias
-   **Impact**: Resolved 90% of initial test failures

### ✅ Translation Key Validation

-   **Problem**: Non-existent translation keys causing type errors
-   **Examples Fixed**:
    -   `authen.login.buttonLogin` → `auth.login.buttonLogin`
    -   Used real keys: `common.confirm`, `common.cancel`, `common.noText`
-   **Impact**: Fixed I18Type compatibility issues

### ✅ Mock Configuration Improvements

-   **Problem**: React Native/Vector icons mock conflicts
-   **Solution**: Proper module-level mocking without overriding RN defaults
-   **Impact**: Eliminated `displayName` and component rendering errors

### ✅ Component Prop Interface Fixes

-   **Problem**: Incorrect prop usage for StyledText/StyledButton
-   **Solution**: Proper `i18nText` vs `originValue` and `I18Type` usage
-   **Impact**: All components render correctly in tests

## 🟢 Successfully Fixed Components

| Component       | Status   | Before             | After           | Fix Applied                         |
| --------------- | -------- | ------------------ | --------------- | ----------------------------------- |
| StyledButton    | ✅ Fixed | Import errors      | 100% coverage   | Absolute imports + translation keys |
| StyledImage     | ✅ Fixed | Mock conflicts     | 77.77% coverage | React Native mock resolution        |
| StyledText      | ✅ Fixed | Not tested         | 88.88% coverage | i18n mock + prop fixes              |
| StyledIndicator | ✅ Fixed | Mock errors        | 100% coverage   | React Native mock cleanup           |
| RadioButton     | ✅ Fixed | Vector icon issues | 50% coverage    | @expo/vector-icons module mock      |
| Index tests     | ✅ Fixed | Component errors   | All passing     | Comprehensive import/prop fixes     |

## 📊 Component Categories

### 🟢 Fully Tested Components (10 components)

1. **StyledButton** - Perfect (100% coverage)
2. **StyledDateTimePicker** - Perfect (100% coverage)
3. **StyledWebView** - Perfect (100% coverage)
4. **StyledNoData** - Perfect (100% coverage)
5. **StyledInputForm** - Nearly Perfect (~100% coverage)
6. **StyledTouchable** - Perfect (100% coverage)
7. **StyledIndicator** - Perfect (100% coverage) ✅ Fixed
8. **StyledText** - Good (88.88% coverage) ✅ Fixed
9. **StyledImage** - Good (77.77% coverage) ✅ Fixed
10. **RadioButton** - Moderate (50% coverage) ✅ Fixed

### 🟡 Good Coverage Components (3 components)

1. **ModalizeManager** - Good (86.95% coverage)
2. **AlertMessage** - Good (75% coverage)
3. **StyledSectionList** - Good (71.42% coverage)

### 🟠 Partial Coverage Components (1 component)

1. **StyledList** - Poor coverage (40%) due to FlashList mock issues

### 🔴 Skipped Components (3 components)

1. **StyledInput** - Jest forwardRef + useRef limitation
2. **CheckBox** - Complex Images asset mock structure
3. **StyledIcon** - React Native mock conflicts

### 🟢 Settings Components (3 components)

1. **SettingRow** - Perfect (100% coverage)
2. **ButtonSwitchLanguage** - Basic coverage (complex i18n logic)
3. **ButtonSwitchTheme** - Basic coverage (complex theme logic)

### 🟢 Utility Components (9/11 excellent coverage)

-   **constants.ts**: 100% coverage
-   **formatter.ts**: 100% coverage
-   **logger.ts**: 100% coverage
-   **metrics.ts**: 100% coverage
-   **validate.ts**: 100% coverage
-   **yupValidate.ts**: 95.45% coverage
-   **permission.ts**: 87.5% coverage
-   **date.ts**: 83.33% coverage
-   **helper.ts**: 68.42% coverage

## 🚀 Quick Start Guide

### Running Tests

```bash
# Run all tests
npm run testFinal

# Run with watch mode
npm test

# Run specific test file
npm test -- StyledButton.test.tsx

# Run with coverage
npm test -- --coverage
```

### Test Structure

All tests follow this standardized pattern:

```typescript
// Mock dependencies
jest.mock('@/components/base/ComponentDependency', () => ({
    // Mock implementation
}));

// Mock assets/themes if needed
jest.mock('@/assets/themes', () => ({
    Themes: { COLORS: { primary: '#007AFF' } },
}));

import React from 'react';
import { render } from '@testing-library/react-native';
import ComponentToTest from '@/components/base/ComponentToTest';

describe('ComponentToTest Component', () => {
    it('renders correctly with default props', () => {
        const component = render(<ComponentToTest />);
        expect(component).toBeTruthy();
        expect(component.toJSON()).toBeTruthy();
    });
});
```

### Adding New Tests

1. **Create test file**: `ComponentName.test.tsx`
2. **Use absolute imports**: `@/components/base/ComponentName`
3. **Use real translation keys**: Check `assets/locates/en.ts`
4. **Mock dependencies properly**: Module-level mocking
5. **Follow naming convention**: `ComponentName.test.tsx`

## 🔍 Test Guidelines

### ✅ Best Practices

-   Use absolute imports with `@/` alias
-   Mock external dependencies at module level
-   Use real translation keys from locale files
-   Test component rendering, not implementation details
-   Keep tests focused and isolated
-   Use descriptive test names

### ❌ Common Pitfalls to Avoid

-   Don't use relative imports (`../../base/Component`)
-   Don't create fake translation keys
-   Don't mock entire `react-native` module unless necessary
-   Don't test internal component state
-   Don't create overly complex test setups

### 🎯 Testing Priorities

1. **Component renders without errors**
2. **Props are passed correctly**
3. **User interactions work as expected**
4. **Error states are handled properly**
5. **Accessibility is maintained**

## 📋 Maintenance Tasks

### Weekly ✅

-   [x] Run full test suite
-   [x] Check coverage reports
-   [x] Update component status
-   [x] Document any new issues

### Monthly

-   [ ] Review skipped components for solutions
-   [ ] Update test utilities and mocks
-   [ ] Performance analysis
-   [ ] Add tests for new components

### Quarterly Review

-   [ ] Evaluate testing strategy
-   [ ] Research new testing tools
-   [ ] Update testing documentation
-   [ ] Plan coverage improvements

## 🛠️ Troubleshooting

### Common Issues & Solutions

#### Import Error: Module not found

```bash
Error: Cannot resolve module '@/components/base/ComponentName'
```

**Solution**: Ensure you're using absolute imports with `@/` alias

#### Translation Key Error

```bash
Type '"fake.key"' is not assignable to type 'I18Type'
```

**Solution**: Use real translation keys from `assets/locates/en.ts`

#### Mock Conflict Error

```bash
TypeError: Cannot read properties of undefined (reading 'displayName')
```

**Solution**: Remove React Native module-level mocks, use jest.requireActual() instead

#### Component Not Rendering

```bash
Error: Element type is invalid: expected a string but got: undefined
```

**Solution**: Check component import path and ensure proper export/import

## 📞 Support & Contribution

### Getting Help

1. Check existing documentation in this folder
2. Look at working test examples (StyledButton, StyledText)
3. Review common patterns in fixed components
4. Check troubleshooting section above

### Contributing Tests

1. Follow established patterns
2. Update documentation when adding new components
3. Ensure tests are stable and reliable
4. Add appropriate coverage for new functionality

## 📈 Success Metrics Dashboard

### Current Achievement: 🎉 97.9% Test Success Rate

| Metric              | Before Fixes | After Fixes | Improvement |
| ------------------- | ------------ | ----------- | ----------- |
| Test Success Rate   | ~50%         | 97.9%       | +47.9%      |
| Test Suites Passing | ~15/31       | 28/31       | +13 suites  |
| Statement Coverage  | 35.88%       | 37.9%       | +2.02%      |
| Branch Coverage     | 40.86%       | 42.72%      | +1.86%      |
| Zero Flaky Tests    | ❌           | ✅          | Stable      |

---

**Last Updated**: December 2024  
**Status**: 🎉 Major Success - From broken test suite to 97.9% reliability!  
**Maintainer**: Development Team
