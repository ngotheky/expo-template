# Cursor Rules User Guide

The `.cursor` directory contains rules for the Cursor IDE to ensure code quality and consistency in the project. This guide explains how to use, modify, and create new rules.

## Important Note

**These rules ONLY apply to code generated or completed by Cursor AI**, including:

-   Auto-completions suggested by Cursor
-   Code generated through chat interactions
-   Code refactoring suggested by AI

These rules do NOT check existing code in your codebase - they guide the AI to follow your project's coding standards when generating new code.

## Directory Structure

```
.cursor/
├── rules/                    # Directory containing individual rule files
│   ├── component.rule.json   # Rules for components
│   ├── hooks.rule.json       # Rules for React hooks
│   ├── styling.rule.json     # Rules for styling and Tailwind
│   ├── typescript.rule.json  # Rules for TypeScript
│   ├── testing.rule.json     # Rules for unit testing
│   ├── naming.rule.json      # Rules for naming conventions
│   ├── folder-naming.rule.json # Rules for folder naming
│   ├── library-usage.rule.json # Rules for using libraries and generating code
│   ├── expo.rule.json        # Rules for using Expo
│   └── common.rule.json      # General best practices and code quality rules
├── rules.json                # Main configuration file connecting all rules
└── README.md                 # This guide
```

## Available Rules

### 1. Component Rules

-   **Component Naming**: Components must be named using PascalCase
-   **Component Export**: Components should use named exports
-   **Component Props Interface**: Components should have interfaces or types for props
-   **Memo for Complex Components**: Use React.memo for complex components
-   **Base Component Documentation**: Base components should have JSDoc documentation
-   **English Comments Only**: All comments must be written in English
-   **Component JSDoc Format**: Component JSDoc should follow standard format

### 2. Hooks Rules

-   **Hook Naming**: Custom hooks must start with 'use'
-   **Dependencies Array**: useEffect, useCallback, useMemo must have a dependencies array
-   **No Hooks Inside Callbacks**: Don't use hooks inside callbacks or conditions
-   **Exhaustive Dependencies**: Use exhaustive dependencies in hooks
-   **Custom Hook Return Type**: Custom hooks should have clearly defined return types
-   **English Hook Comments**: Hook comments must be in English

### 3. Styling Rules

-   **Tailwind ClassName**: Use className for Tailwind CSS
-   **StyleSheet at End of File**: StyleSheet.create should be at the end of the file
-   **Avoid Inline Styles**: Limit the use of inline styles
-   **Style Naming Convention**: Name styles using camelCase
-   **Use Theme Colors**: Use color variables from the theme
-   **English Style Comments**: Style-related comments must be in English

### 4. TypeScript Rules

-   **No Any**: Avoid using the any type
-   **Interface Naming**: Interfaces should start with 'I' or have descriptive suffixes
-   **Type Definitions**: Define types for objects and functions
-   **Explicit Return Type**: Functions should have explicit return types
-   **Use Type Aliases**: Use type aliases for complex types
-   **No Non-null Assertion**: Avoid using the non-null assertion operator (!)
-   **English TypeScript Comments**: TypeScript-related comments must be in English

### 5. Testing Rules

-   **Test Naming**: Test names should clearly describe the functionality being tested
-   **Use Describe Blocks**: Use describe blocks to group related tests
-   **Test Assertion**: Each test case should have at least one assertion
-   **Mock Naming**: Name mock functions clearly
-   **No Test Only/Skip**: Don't use .only/.skip in production code
-   **Test Coverage Comment**: Add comments explaining edge cases
-   **English Test Comments**: Test comments must be in English

### 6. Naming Rules

-   **CamelCase Variables**: Variables should be named using camelCase
-   **Constants Uppercase**: Constants should be named using UPPERCASE
-   **PascalCase Components**: Components must be named using PascalCase
-   **Specific Names**: Names should be specific and clear about their purpose
-   **Function Names Start with Verb**: Function names should start with a verb
-   **Boolean Variable Prefix**: Boolean variables should start with is, has, can, or should
-   **Array Names Plural**: Array names should be plural
-   **English Identifiers**: All identifiers must be in English

### 7. Folder Naming Rules

-   **Root Folders Lowercase**: Root folders should use lowercase (app, components)
-   **Feature Folders Kebab Case**: Feature folders should use kebab-case (user-profile)
-   **Component Folders PascalCase**: Component folders should use PascalCase (Button)
-   **Utility Folders CamelCase**: Utility folders should use camelCase (dateUtils)
-   **Test Folders Match Source**: Test folders should match source directory structure
-   **No Uppercase Folders**: Avoid uppercase in folder names (except for components)
-   **No Spaces in Folder Names**: Don't use spaces in folder names
-   **Special Folder Naming**: Special folders should follow naming conventions

### 8. Library Usage Rules

-   **Use Installed Libraries**: Prioritize using libraries already installed in the project
-   **Prefer Expo Libraries**: Prefer using Expo libraries when possible
-   **Check Before Install**: Check before installing new libraries
-   **Expo Install Syntax**: Use 'npx expo install' instead of npm/yarn
-   **Comment Library Purpose**: Add comments explaining the purpose of new libraries
-   **Prompt Install Missing**: Display prompt when using a library that is not installed
-   **Auto Generate Imports**: Automatically add import statements when using components
-   **English Library Comments**: Library-related comments must be in English

### 9. Expo Rules

-   **Use Expo Components**: Prioritize using Expo components when possible
-   **Expo SDK Version**: Check the Expo SDK version being used
-   **Expo Constants Usage**: Use expo-constants to access configuration information
-   **Expo Router Navigation**: Prefer using Expo Router for navigation
-   **Expo Splash Screen**: Use expo-splash-screen to manage splash screens
-   **Expo Updates**: Use expo-updates for OTA updates
-   **App Config Structure**: Check app.config.ts/app.json structure
-   **Expo Vector Icons**: Use @expo/vector-icons for icons
-   **Expo Status Bar**: Use expo-status-bar instead of StatusBar from react-native
-   **Expo Notifications**: Use expo-notifications for push notifications
-   **Expo Dev Client**: Use expo-dev-client for development builds
-   **Expo English Comments**: Expo-related comments must be in English
-   **Base Component Documentation**: Base components should have JSDoc documentation

### 10. Common Rules

-   **Use React Query for API Calls**: Use React Query for API calls instead of direct fetch or axios
-   **Avoid Direct API Calls**: Don't make direct API calls in components
-   **Use Zustand for Global State**: Use Zustand for global state management
-   **Avoid Redux**: Don't use Redux, prefer Zustand
-   **Use Base Components**: Use base components instead of direct React Native components
-   **No Direct Formatting in Components**: Don't format data directly in components
-   **No Direct Formatting Library Imports**: Don't import formatting libraries (dayjs, numeral, etc.) directly except in formatter.ts and date.ts
-   **Use Formatter Utilities**: Use formatter.ts for data formatting
-   **Use Date Utilities**: Use date.ts for date formatting and operations
-   **No Direct Dayjs Usage**: Don't use dayjs directly except in date.ts
-   **No Direct Numeral Usage**: Don't use numeral directly except in formatter.ts
-   **Avoid Recoil**: Don't use Recoil, prefer Zustand
-   **English Comments**: All comments must be in English

## How to Use

Cursor IDE will automatically apply these rules when generating code through AI completions or chat interactions. When Cursor AI suggests code, it will follow these rules to maintain your project's standards.

Severity levels affect how strictly the AI adheres to these rules:

-   **Error** (red): The AI will strictly avoid generating code that violates these rules
-   **Warning** (yellow): The AI will try to avoid these patterns but may suggest them if necessary
-   **Suggestion** (blue): The AI considers these as recommendations when generating code

## How to Customize Rules

### Enable/Disable Rules

To enable or disable a specific rule, edit the `.cursor/rules.json` file:

```json
{
    "rules": [
        {
            "path": "rules/component.rule.json",
            "enabled": true // true to enable, false to disable
        }
        // ...
    ]
}
```

### Change Severity Level

Open the corresponding rule file in the `rules/` directory and change the `severity` field:

```json
{
    "id": "example-rule",
    "severity": "warning" // Can be "error", "warning", or "suggestion"
}
```

### Add New Rules

1. Create a new file in the `rules/` directory (e.g., `my-custom.rule.json`)
2. Add the rule structure (see existing files as templates)
3. Add the path to the new file in `rules.json`

## Regex Patterns

The rules use regex patterns to guide the AI. Common patterns:

-   `filePattern`: Pattern to identify the type of file the rule applies to
-   `pattern`: Pattern to search for in the generated code

Examples:

-   `.+\\.(ts|tsx)$`: Apply to TypeScript and TSX files
-   `const\\s+[a-z][a-zA-Z0-9]*\\s*=`: Find const declarations with camelCase names
