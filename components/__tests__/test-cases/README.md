# Test Cases Documentation

Thư mục này chứa tất cả documentation liên quan đến test cases và coverage cho components.

## 📋 Các File Documentation

### 📊 [Coverage Report](./coverage-report.md)

Báo cáo chi tiết về test coverage hiện tại, bao gồm:

-   Tổng quan coverage (88.88% statements, 84% branches)
-   Phân tích từng component
-   Các khu vực cần cải thiện
-   Recommendations để tăng coverage

### 📝 [Test Case Tracker](./test-case-tracker.md)

Theo dõi chi tiết tất cả test cases, bao gồm:

-   Status của từng component (🟢 Fully Tested, 🟡 Partially Tested)
-   Checklist các test cases đã hoàn thành
-   Action items và priority
-   Test maintenance schedule

### 🎯 [Test Scenarios](./test-scenarios.md)

Hướng dẫn và template cho các test scenarios:

-   Common test patterns
-   Component-specific scenarios
-   Advanced testing techniques
-   Best practices

## 🚀 Quick Start

### Xem Coverage Hiện Tại

```bash
npm test -- --coverage --watchAll=false
```

### Chạy Test Specific Component

```bash
npm test components/__tests__/base/StyledButton.test.tsx
```

### Generate HTML Coverage Report

```bash
npm test -- --coverage --coverageReporters=html --watchAll=false
open coverage/lcov-report/index.html
```

## 📈 Current Status

**Overall Coverage**: 88.88% statements ✅  
**Total Components**: 17  
**Fully Tested**: 15 components (88.2%)  
**Test Cases**: 43 passing

### Components Cần Cải Thiện

-   **StyledSectionList**: 71.42% coverage (cần thêm test cho momentum scroll)
-   **StyledInputForm**: 100% coverage (chỉ thiếu 1 branch nhỏ)

## 🔧 Tools & Commands

### Coverage Commands

```bash
# Basic coverage
npm test -- --coverage --watchAll=false

# Coverage cho specific files
npm test -- --coverage --collectCoverageFrom="components/base/Styled*.tsx" --watchAll=false

# HTML report
npm test -- --coverage --coverageReporters=html --watchAll=false

# JSON report
npm test -- --coverage --coverageReporters=json --watchAll=false
```

### Test Debugging

```bash
# Verbose output
npm test -- --verbose

# Debug specific test
npm test -- --testNamePattern="renders correctly" --watchAll=false

# Run in watch mode
npm test -- --watch components/__tests__/base/
```

## 📋 Checklist Maintenance

### Weekly Review

-   [ ] Check coverage reports
-   [ ] Update test case status
-   [ ] Review failed tests
-   [ ] Update documentation

### Monthly Tasks

-   [ ] Add tests for new components
-   [ ] Refactor redundant tests
-   [ ] Performance review
-   [ ] Update test utilities

## 🎯 Coverage Goals

| Metric     | Current | Target | Status |
| ---------- | ------- | ------ | ------ |
| Statements | 88.88%  | >85%   | ✅     |
| Branches   | 84%     | >80%   | ✅     |
| Functions  | 83.33%  | >80%   | ✅     |
| Lines      | 88.88%  | >85%   | ✅     |

## 📞 Support

Nếu có thắc mắc về test cases hoặc cần hỗ trợ:

1. Check documentation trong thư mục này
2. Xem examples trong test files
3. Tham khảo [Test Scenarios](./test-scenarios.md) cho patterns

---

_Documentation được update thường xuyên để reflect current state của test suite._
