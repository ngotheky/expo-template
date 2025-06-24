# Test Scenarios Documentation

## Common Test Patterns

### 1. Component Rendering Tests

**Purpose**: Verify component renders correctly with different props

```typescript
describe('Rendering Tests', () => {
    it('renders with default props', () => {
        const { getByTestId } = render(<Component />);
        expect(getByTestId('component')).toBeTruthy();
    });

    it('renders with custom props', () => {
        const { getByTestId } = render(<Component customProp="value" />);
        expect(getByTestId('component')).toBeTruthy();
    });
});
```

### 2. Props Testing

**Purpose**: Ensure props are correctly applied and used

```typescript
describe('Props Tests', () => {
    it('applies className correctly', () => {
        const { getByTestId } = render(<Component className="custom" />);
        expect(getByTestId('component').props.className).toContain('custom');
    });

    it('passes data props correctly', () => {
        const data = { id: 1, name: 'Test' };
        const { getByTestId } = render(<Component data={data} />);
        expect(getByTestId('component').props.data).toEqual(data);
    });
});
```

### 3. User Interaction Tests

**Purpose**: Test user interactions and callbacks

```typescript
describe('Interaction Tests', () => {
    it('calls onPress when pressed', () => {
        const onPress = jest.fn();
        const { getByTestId } = render(<Component onPress={onPress} />);

        fireEvent.press(getByTestId('component'));
        expect(onPress).toHaveBeenCalled();
    });

    it('handles text input change', () => {
        const onChange = jest.fn();
        const { getByTestId } = render(<Component onChange={onChange} />);

        fireEvent.changeText(getByTestId('input'), 'new text');
        expect(onChange).toHaveBeenCalledWith('new text');
    });
});
```

### 4. State Management Tests

**Purpose**: Verify internal state changes

```typescript
describe('State Tests', () => {
    it('updates state on interaction', () => {
        const { getByTestId } = render(<Component />);

        fireEvent.press(getByTestId('toggle'));
        // Verify state change through UI updates
        expect(getByTestId('status')).toHaveTextContent('active');
    });
});
```

### 5. Error Handling Tests

**Purpose**: Test error states and edge cases

```typescript
describe('Error Handling Tests', () => {
    it('handles invalid props gracefully', () => {
        const { getByTestId } = render(<Component invalidProp={null} />);
        expect(getByTestId('component')).toBeTruthy();
    });

    it('shows error message when error occurs', () => {
        const { getByText } = render(<Component errorMessage="Error occurred" />);
        expect(getByText('Error occurred')).toBeTruthy();
    });
});
```

## Component-Specific Test Scenarios

### Input Components

#### StyledInput Test Scenarios

```typescript
// Focus/Blur behavior
it('applies focus styles when focused', () => {
    const { getByTestId } = render(<StyledInput />);
    const input = getByTestId('styled-input');

    fireEvent(input, 'focus');
    expect(input.props.className).toContain('border-primary');
});

// Error state
it('shows error styles when error present', () => {
    const { getByTestId } = render(<StyledInput errorMessage="Required" />);
    const input = getByTestId('styled-input');

    expect(input.props.className).toContain('border-red-600');
});

// Placeholder and value
it('displays placeholder when no value', () => {
    const { getByTestId } = render(<StyledInput placeholder="Enter text" />);
    const input = getByTestId('styled-input');

    expect(input.props.placeholder).toBe('Enter text');
});
```

#### StyledInputForm Test Scenarios

```typescript
// Form integration
it('integrates with react-hook-form correctly', () => {
    const mockForm = { control: {} };
    const { getByTestId } = render(<StyledInputForm name="test" form={mockForm} />);

    expect(getByTestId('styled-input')).toBeTruthy();
});

// Validation
it('shows validation errors', () => {
    const { getByTestId } = render(<StyledInputForm name="test" rules={{ required: 'Required field' }} />);

    // Trigger validation and check error display
});
```

### List Components

#### StyledList Test Scenarios

```typescript
// Empty state
it('shows no data component when list is empty', () => {
    const { getByTestId } = render(<StyledList data={[]} />);
    expect(getByTestId('styled-no-data')).toBeTruthy();
});

// Pagination
it('calls onLoadMore when reaching end', () => {
    const onLoadMore = jest.fn();
    const { getByTestId } = render(<StyledList data={mockData} onLoadMore={onLoadMore} />);

    // Simulate scroll to end
    fireEvent(getByTestId('flatlist'), 'onEndReached');
    expect(onLoadMore).toHaveBeenCalled();
});

// Pull to refresh
it('calls onRefresh when pulled', () => {
    const onRefresh = jest.fn();
    const { getByTestId } = render(<StyledList data={mockData} onRefresh={onRefresh} />);

    // Simulate pull to refresh
    fireEvent(getByTestId('refresh-control'), 'onRefresh');
    expect(onRefresh).toHaveBeenCalled();
});
```

#### StyledSectionList Test Scenarios

```typescript
// Section rendering
it('renders sections correctly', () => {
    const sections = [{ title: 'Section 1', data: ['Item 1', 'Item 2'] }];
    const { getByText } = render(<StyledSectionList sections={sections} />);

    expect(getByText('Section 1')).toBeTruthy();
});

// Momentum scrolling
it('handles momentum scroll correctly', () => {
    const onLoadMore = jest.fn();
    const { getByTestId } = render(<StyledSectionList sections={mockSections} onLoadMore={onLoadMore} />);

    // Simulate momentum scroll begin/end
    fireEvent(getByTestId('sectionlist'), 'onMomentumScrollBegin');
    fireEvent(getByTestId('sectionlist'), 'onEndReached');

    expect(onLoadMore).toHaveBeenCalledTimes(1);
});
```

### Button Components

#### StyledButton Test Scenarios

```typescript
// Icon rendering
it('renders prefix and suffix icons', () => {
    const prefixIcon = { uri: 'prefix.png' };
    const suffixIcon = { uri: 'suffix.png' };

    const { getAllByTestId } = render(<StyledButton title="Button" prefixIcon={prefixIcon} suffixIcon={suffixIcon} />);

    const images = getAllByTestId('styled-image');
    expect(images).toHaveLength(2);
});

// Disabled state
it('applies disabled styles when disabled', () => {
    const { getByTestId } = render(<StyledButton title="Button" disabled />);
    const button = getByTestId('styled-touchable');

    expect(button.props.disabled).toBe(true);
});
```

#### StyledTouchable Test Scenarios

```typescript
// Throttling
it('throttles rapid presses', () => {
    const onPress = jest.fn();
    const { getByTestId } = render(<StyledTouchable onPress={onPress} throttleTime={1000} />);
    const touchable = getByTestId('styled-touchable');

    // Rapid presses
    fireEvent.press(touchable);
    fireEvent.press(touchable);
    fireEvent.press(touchable);

    expect(onPress).toHaveBeenCalledTimes(1);
});
```

### Modal Components

#### StyledDateTimePicker Test Scenarios

```typescript
// Modal state
it('opens modal when touchable pressed', () => {
    const { getByTestId, queryByTestId } = render(
        <StyledDateTimePicker onConfirm={jest.fn()}>
            <Text>Select Date</Text>
        </StyledDateTimePicker>,
    );

    // Initially closed
    expect(queryByTestId('datetime-picker-modal')).toBeNull();

    // Opens when pressed
    fireEvent.press(getByTestId('styled-touchable'));
    expect(getByTestId('datetime-picker-modal')).toBeTruthy();
});

// Date formatting
it('formats date when formatter provided', () => {
    const onConfirm = jest.fn();
    const formatter = date => date.toISOString().split('T')[0];

    const { getByTestId } = render(
        <StyledDateTimePicker onConfirm={onConfirm} formatter={formatter}>
            <Text>Select Date</Text>
        </StyledDateTimePicker>,
    );

    fireEvent.press(getByTestId('styled-touchable'));
    fireEvent.press(getByTestId('confirm-button'));

    expect(onConfirm).toHaveBeenCalledWith(expect.stringMatching(/^\d{4}-\d{2}-\d{2}$/));
});
```

### Display Components

#### StyledText Test Scenarios

```typescript
// Internationalization
it('displays translated text with i18nText', () => {
    const { getByText } = render(<StyledText i18nText="common.hello" />);
    expect(getByText('common.hello')).toBeTruthy();
});

// Theme support
it('applies theme-based text color', () => {
    const { getByTestId } = render(<StyledText originValue="Test" />);
    const text = getByTestId('styled-text');

    // Should have theme-based color class
    expect(text.props.className).toMatch(/text-(textLight|textDark)/);
});
```

#### StyledImage Test Scenarios

```typescript
// Error fallback
it('shows default image on load error', () => {
    const { getByTestId } = render(<StyledImage source={{ uri: 'invalid-url.jpg' }} />);
    const image = getByTestId('styled-image');

    fireEvent(image, 'onError');

    // Should fallback to default image
    expect(image.props.source).toEqual(Images.photo.defaultImage);
});

// Source change
it('resets error state when source changes', () => {
    const { getByTestId, rerender } = render(<StyledImage source={{ uri: 'invalid-url.jpg' }} />);
    const image = getByTestId('styled-image');

    // Trigger error
    fireEvent(image, 'onError');

    // Change source
    rerender(<StyledImage source={{ uri: 'new-url.jpg' }} />);

    // Should use new source, not default
    expect(image.props.source).toEqual({ uri: 'new-url.jpg' });
});
```

## Advanced Test Scenarios

### Integration Tests

```typescript
describe('Component Integration', () => {
    it('works together in complex forms', () => {
        const { getByTestId } = render(
            <View>
                <StyledInputForm name="username" />
                <StyledInputForm name="password" />
                <StyledButton title="Submit" />
            </View>,
        );

        // Test form interactions
        fireEvent.changeText(getByTestId('username-input'), 'testuser');
        fireEvent.changeText(getByTestId('password-input'), 'password');
        fireEvent.press(getByTestId('submit-button'));

        // Verify form submission
    });
});
```

### Performance Tests

```typescript
describe('Performance Tests', () => {
    it('renders large lists efficiently', () => {
        const largeData = Array.from({ length: 1000 }, (_, i) => ({ id: i, name: `Item ${i}` }));

        const startTime = performance.now();
        render(<StyledList data={largeData} />);
        const endTime = performance.now();

        expect(endTime - startTime).toBeLessThan(100); // Should render in <100ms
    });
});
```

### Accessibility Tests

```typescript
describe('Accessibility Tests', () => {
    it('has proper accessibility labels', () => {
        const { getByTestId } = render(<StyledButton title="Submit" accessibilityLabel="Submit form" />);

        const button = getByTestId('styled-button');
        expect(button.props.accessibilityLabel).toBe('Submit form');
    });
});
```

---

_This document provides comprehensive test scenarios for all component types. Use these patterns as templates for creating new tests._
