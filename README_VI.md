# Config và Build với EAS

## 1. Init project

Chạy command sau để init project:

```bash
npx create-expo-app app-name --template https://github.com/ngotheky/expo-template
```

Với `app-name` là tên project. Ví dụ:

```bash
npx create-expo-app my-app --template https://github.com/ngotheky/expo-template
```

## 2. Tạo App và File .env

### Tạo 3 App trên Expo Dev

Tạo 3 app trên [Expo Dev](https://expo.dev), mỗi môi trường (development, staging, production) tạo một app riêng.

-   Lý do: Expo giới hạn mỗi project chỉ được build 30 lần/tháng, nên việc tách app giúp môi trường development không ảnh hưởng đến các môi trường khác.

### Cấu hình Biến Môi Trường

Điền các thông tin sau vào file `.env` tương ứng với từng môi trường:

-   `APP_NAME`
-   `SLUG`
-   `EXPO_PROJECT_ID`
-   `EAS_UPDATE_URL`

**Lưu ý:**

-   Expo sẽ tự động sinh ra folder iOS và Android trên server build.
-   Khi đổi tên app, cần tạo lại app mới để tránh lỗi khi build.

---

## 3. Config Build

### Install EAS cli

```bash
npm install -g eas-cli
```

### Cho iOS

#### Build với Account Apple Developer

1. Khi chạy script build, đăng nhập vào account Apple Developer để sử dụng credential từ tài khoản.

#### Build với Credential Local

1. Copy file `certificate.p12` và file `.mobileprovision` vào thư mục `credentials`.

2. Thêm đường dẫn và password của certificate vào file `credentials.json`.

3. Chạy script `build-local-credential-ios` để build iOS sử dụng credential local.

### Cho Android

Chạy script `generate-keystore`

---

## 4. Config Auto Submit

### Cho Android

1. Truy cập [Google Cloud Console](https://console.cloud.google.com/).
2. Vào mục **IAM & Admin** > **Service Account** > **Create Service Account**.
3. Điền thông tin vào form để tạo service account.
    - Ở mục **Grant this service account access to project**, chọn role: - **Service Accounts** > **Service Account User**.

#### Tạo Key

1. Chọn **Menu Actions** > **Manage Keys**.

2. Chọn **Add Key** > **Create Key**.

3. Đổi tên file JSON tải về thành `play-store.json`, đặt vào thư mục gốc dự án.

4. Copy email service account.

5. Vào [Google Play Console](https://play.google.com/console), mời email với vai trò admin.

6. Enable [Google Play Android Developer API](https://console.cloud.google.com/apis/library/androidpublisher.googleapis.com).

7. Chạy script `build-and-submit-android-prod` để submit app lên Internal Test (có thể điều chỉnh trong `eas.json`).

**Lưu ý:**

-   Submit thủ công một bản đầu tiên trước khi sử dụng EAS submit.

### Cho iOS

1. Chỉnh sửa thông tin account build trong file `eas.json`.

2. Chạy script `build-and-submit-ios-prod` để submit app lên Testflight.

## 5. Config EAS (Option)

-   Các script build đã được viết sẵn và config trong `eas.json`.
-   Có thể chỉnh sửa hoặc thêm mới các lệnh build theo doc sau: ([Common properties for native platforms](https://console.cloud.google.com/apis/library/androidpublisher.googleapis.com))
-   Có thể generate `ios` và `android` folder và build với `Xcode` bằng command sau

```bash
npx expo prebuild
```

-   Có thể build android dưới local mà không cần generate folder android, bằng script `build-android-dev-local`. Sau khi build sẽ tạo ra file build trong project mà không upload lên expo

**Lưu ý:**

-   Hiện tại cả ios và android đều build trên server của expo nên sẽ lâu hơn bình thường
-   Dung lượng build khi build trên server của expo cũng sẽ lớn hơn so với build local

## 6. Configure with app config (`app.config.ts`)

-   Có thể thêm/bớt quyền ở mục `permissions`
-   Chỉnh sửa plugins, text xin quyền, splash screen, icon notification ở `plugins`
    Tham khảo thêm tại ([app.json / app.config.js](https://docs.expo.dev/versions/latest/config/app/))

## 7. Eas update (code push)

-   Eas update hoạt động giống như code push của `appcenter`
-   App sẽ nhận code mới theo channel được config trong `eas.json`

### Config auto update CI

1. Lấy access token
   Vào https://expo.dev/settings/access-tokens chọn `Create Token` để tạo access token

2. Setting trên git

### Github

Vào **Settings** > **Actions secrets and variables** > **Actions** > **New repository secret** tạo 1 repository secret với tên `EXPO_TOKEN` và paste access token của account expo vào sao đó chọn **Add secret** để add access token

### Gitlab

Vào **Settings** > **CI/CD** > **Variables** tạo 1 variable với tên `EXPO_TOKEN` và paste access token của account expo vào sao đó chọn **Add variable** để add access token

**Lưu ý:**

-   Sẽ chạy khi có merge request đc merge vào nhánh
-   CI chỉ hoạt động với nhánh `staging` và nhánh `develop`
-   Với nhánh `main` là môi trường `production` nên sẽ phải update bằng tay để đảm bảo an toàn
-   Để thêm nhánh hoặc sửa lại CI thì cần sửa lại file `.github/workflows/eas-update.yml` đối với github và file `.gitlab-ci.yml` đối với gitlab hoặc amela git

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

## Công Nghệ Sử Dụng

### Core Technologies

-   **React Native**: Phiên bản 0.76.3 - Framework để phát triển ứng dụng di động đa nền tảng
-   **Expo**: Phiên bản 52.0.11 - Bộ công cụ phát triển và triển khai React Native
-   **TypeScript**: Phiên bản 5.3.3 - Ngôn ngữ lập trình static type-checking dựa trên JavaScript
-   **Expo Router**: Phiên bản 3.1.0 - File-based routing cho ứng dụng Expo

### State Management & Networking

-   **Zustand**: Quản lý state nhỏ gọn, nhanh chóng và mạnh mẽ
-   **React Query**: Quản lý, cache và đồng bộ hóa state từ server

### UI & Styling

-   **NativeWind**: Dùng Tailwind CSS trong React Native
-   **Tailwind CSS**: Phiên bản 4.0.0 - Framework CSS tiện ích để tạo UI nhanh chóng

### Form & Validation

-   **React Hook Form**: Quản lý form hiệu quả với ít render
-   **Yup**: Bộ xác thực giá trị và parse đối tượng

### Notification & Services

-   **OneSignal**: Dịch vụ push notification đa nền tảng
-   **Expo Updates**: Over-the-air updates không cần phát hành app mới
-   **Expo Location**: Dịch vụ định vị địa lý

### Testing

-   **Jest**: Framework testing cho JavaScript
-   **React Testing Library**: Thư viện testing cho React và React Native

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
