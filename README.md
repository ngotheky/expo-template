# Config and Build with EAS

## 1. Init project

Run the following command to init project:

```bash
npx create-expo-app app-name --template @kyngo/expo-template
```

Where `app-name` is the project name. For example:

```bash
npx create-expo-app my-app --template @kyngo/expo-template
```

## 2. Create App and .env File

### Create 3 Apps on Expo Dev

Create 3 apps on [Expo Dev](https://expo.dev), one app for each environment (development, staging, production).

-   Reason: Expo limits each project to only 30 builds per month, so separating apps helps the development environment not affect other environments.

### Environment Variable Configuration

Fill in the following information in the `.env` file corresponding to each environment:

-   `APP_NAME`
-   `SLUG`
-   `EXPO_PROJECT_ID`
-   `EAS_UPDATE_URL`

**Note:**

-   Expo will automatically generate iOS and Android folders on the build server.
-   When changing the app name, you need to create a new app to avoid build errors.

---

## 3. Config Build

### Install EAS cli

```bash
npm install -g eas-cli
```

### For iOS

#### Build with Apple Developer Account

1. When running the build script, log in to your Apple Developer account to use credentials from the account.

#### Build with Local Credential

1. Copy the `certificate.p12` file and `.mobileprovision` file to the `credentials` folder.

2. Add the certificate path and password to the `credentials.json` file.

3. Run the `build-local-credential-ios` script to build iOS using local credentials.

### For Android

Run the `generate-keystore` script

---

## 4. Config Auto Submit

### For Android

1. Access [Google Cloud Console](https://console.cloud.google.com/).
2. Go to **IAM & Admin** > **Service Account** > **Create Service Account**.
3. Fill in the form to create a service account.
    - In the **Grant this service account access to project** section, select role: - **Service Accounts** > **Service Account User**.

#### Create Key

1. Select **Menu Actions** > **Manage Keys**.

2. Select **Add Key** > **Create Key**.

3. Rename the downloaded JSON file to `play-store.json`, place it in the project root directory.

4. Copy the service account email.

5. Go to [Google Play Console](https://play.google.com/console), invite the email with admin role.

6. Enable [Google Play Android Developer API](https://console.cloud.google.com/apis/library/androidpublisher.googleapis.com).

7. Run the `build-and-submit-android-prod` script to submit the app to Internal Test (can be adjusted in `eas.json`).

**Note:**

-   Submit manually for the first time before using EAS submit.

### For iOS

1. Edit the build account information in the `eas.json` file.

2. Run the `build-and-submit-ios-prod` script to submit the app to Testflight.

## 5. Config EAS (Option)

-   Build scripts are already written and configured in `eas.json`.
-   You can edit or add new build commands according to the following doc: ([Common properties for native platforms](https://console.cloud.google.com/apis/library/androidpublisher.googleapis.com))
-   You can generate `ios` and `android` folders and build with `Xcode` using the following command

```bash
npx expo prebuild
```

-   You can build android locally without generating the android folder, using the `build-android-dev-local` script. After building, it will create a build file in the project without uploading to expo

**Note:**

-   Currently both ios and android are built on expo's server so it will be slower than usual
-   Build size when building on expo's server will also be larger compared to local builds

## 6. Configure with app config (`app.config.ts`)

-   You can add/remove permissions in the `permissions` section
-   Edit plugins, permission request text, splash screen, notification icon in `plugins`
    For more reference see ([app.json / app.config.js](https://docs.expo.dev/versions/latest/config/app/))

## 7. Eas update (code push)

-   Eas update works like code push from `appcenter`
-   The app will receive new code according to the channel configured in `eas.json`

### Config auto update CI

1. Get access token
   Go to https://expo.dev/settings/access-tokens select `Create Token` to create access token

2. Setting on git

### Github

Go to **Settings** > **Actions secrets and variables** > **Actions** > **New repository secret** create 1 repository secret with name `EXPO_TOKEN` and paste the expo account access token then select **Add secret** to add access token

### Gitlab

Go to **Settings** > **CI/CD** > **Variables** create 1 variable with name `EXPO_TOKEN` and paste the expo account access token then select **Add variable** to add access token

**Note:**

-   Will run when there is a merge request merged into the branch
-   CI only works with `staging` branch and `develop` branch
-   With `main` branch being the `production` environment, you need to update manually to ensure safety
-   To add branches or modify CI, you need to modify the `.github/workflows/eas-update.yml` file for github and `.gitlab-ci.yml` file for gitlab

## Dependencies

-   [`@react-native-async-storage/async-storage`](https://github.com/react-native-async-storage/async-storage)
-   [`@react-native-community/datetimepicker`](https://github.com/react-native-datetimepicker/datetimepicker)
-   [`@react-native-community/netinfo`](https://github.com/react-native-netinfo/react-native-netinfo)
-   [`@react-navigation/bottom-tabs`](https://reactnavigation.org/docs/bottom-tab-navigator)
-   [`@shopify/flash-list`](https://shopify.github.io/flash-list/)
-   [`@tanstack/react-query`](https://tanstack.com/query/v5)
-   [`axios`](https://axios-http.com/)
-   [`@alessiocancian/react-native-actionsheet`](https://github.com/alessiocancian/react-native-actionsheet)
-   [`dayjs`](https://day.js.org/)
-   [`expo-camera`](https://docs.expo.dev/versions/latest/sdk/camera/)
-   [`expo-image-picker`](https://docs.expo.dev/versions/latest/sdk/imagepicker/)
-   [`expo-location`](https://docs.expo.dev/versions/latest/sdk/location/)
-   [`expo-router`](https://expo.github.io/router/docs)
-   [`i18next`](https://www.i18next.com/)
-   [`lodash`](https://lodash.com/)
-   [`nativewind`](https://www.nativewind.dev/)
-   [`numeral`](http://numeraljs.com/)
-   [`patch-package`](https://github.com/ds300/patch-package)
-   [`react-native-maps`](https://github.com/react-native-maps/react-native-maps)
-   [`react-native-modal-datetime-picker`](https://github.com/mmazzarolo/react-native-modal-datetime-picker)
-   [`react-native-modalize`](https://github.com/jeremybarbet/react-native-modalize)
-   [`react-native-onesignal`](https://github.com/OneSignal/react-native-onesignal)
-   [`react-hook-form`](https://react-hook-form.com/)
-   [`yup`](https://github.com/jquense/yup)
-   [`zustand`](https://docs.pmnd.rs/zustand/getting-started/introduction)
-   [`tailwindcss`](https://tailwindcss.com/)
-   [`jest-expo`](https://github.com/expo/expo/tree/main/packages/jest-expo/)

## Technologies Used

### Core Technologies

-   **React Native**: Version 0.76.3 - Framework for developing cross-platform mobile applications
-   **Expo**: Version 52.0.11 - Development and deployment toolkit for React Native
-   **TypeScript**: Version 5.3.3 - Static type-checking programming language based on JavaScript
-   **Expo Router**: Version 3.1.0 - File-based routing for Expo applications

### State Management & Networking

-   **Zustand**: Compact, fast and powerful state management
-   **React Query**: Manage, cache and synchronize state from server

### UI & Styling

-   **NativeWind**: Use Tailwind CSS in React Native
-   **Tailwind CSS**: Version 4.0.0 - Utility CSS framework for rapid UI creation

### Form & Validation

-   **React Hook Form**: Efficient form management with minimal renders
-   **Yup**: Value validation and object parsing library

### Notification & Services

-   **OneSignal**: Cross-platform push notification service
-   **Expo Updates**: Over-the-air updates without releasing new app
-   **Expo Location**: Geolocation service

### Testing

-   **Jest**: Testing framework for JavaScript
-   **React Testing Library**: Testing library for React and React Native

## Directory Structure

```
based-expo/
├── app/                         # Expo Router-based application code
│   ├── (main)/                  # Main application screens
│   │   ├── home/                # Home screen components & logic
│   │   ├── message/             # Message/chat screens
│   │   ├── my-page/             # User profile pages
│   │   ├── notification/        # Notification screens
│   │   ├── settings/            # App settings screens
│   │   └── _layout.tsx          # Layout for main app screens
│   ├── auth/                    # Authentication screens
│   ├── profile/                 # Profile related screens
│   ├── _layout.tsx              # Root layout component
│   ├── +not-found.tsx           # 404 page
│   └── loading.tsx              # Loading screen
│
├── api/                         # API integration and services
│   ├── modules/                 # API endpoints organized by modules
│   ├── interface/               # API interface definitions
│   └── request.ts               # Base API request configuration
│
├── assets/                      # Static assets like images, fonts
│
├── components/                  # Reusable UI components
│   ├── base/                    # Base/foundation components
│   └── __tests__/               # Component tests
│
├── hooks/                       # Custom React hooks
│   ├── usePaging.ts             # Pagination hook
│   └── useNotification.ts       # Notification management hook
│
├── provider/                    # React Context providers
│   └── index.tsx                # Main provider component
│
├── stacks/                      # Navigation stacks
│
├── store/                       # State management (Zustand)
│   ├── useUserProfile.ts        # User profile state
│   ├── useLanguage.ts           # Language settings state
│   └── configs.ts               # Store configuration
│
├── types/                       # TypeScript types/interfaces
│   ├── enums.ts                 # Enum definitions
│   ├── general.ts               # General type definitions
│   ├── notification.ts          # Notification-related types
│   └── user.ts                  # User-related types
│
├── utils/                       # Utility functions
│   ├── constants.ts             # Application constants
│   ├── date.ts                  # Date manipulation utilities
│   ├── formatter.ts             # Data formatting utilities
│   ├── helper.ts                # General helper functions
│   ├── i18next.ts               # i18n configuration
│   ├── logger.ts                # Logging utilities
│   ├── metrics.ts               # Metrics and analytics helpers
│   ├── permission.ts            # Permission handling utilities
│   ├── validate.ts              # Validation helpers
│   ├── yupValidate.ts           # Yup validation schemas
│   └── upload/                  # File upload utilities
│
├── __mocks__/                   # Mock files for testing
├── __tests__/                   # Test files
├── credentials/                 # Build credentials
│
├── app.config.ts                # Expo configuration file
├── babel.config.js              # Babel configuration
├── eas.json                     # EAS Build configuration
├── global.css                   # Global styles
├── package.json                 # Project dependencies
├── tailwind.config.js           # Tailwind CSS configuration
└── tsconfig.json                # TypeScript configuration
```

---
