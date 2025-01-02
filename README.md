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

### Cho iOS

#### Build với Account Apple Developer

1. Khi chạy script build, đăng nhập vào account Apple Developer để sử dụng credential từ tài khoản.

#### Build với Credential Local

1. Copy file `certificate.p12` và file `.mobileprovision` vào thư mục `credentials`.

2. Thêm đường dẫn và password của certificate vào file `credentials.json`.

3. Chạy script `build-local-credential-ios` để build iOS sử dụng credential local.

### Cho Android

1. Chạy script `generate-keychain-prod`.
2. Select platform `Android`.
3. Chọn profile `production`.
4. Chọn `Keystore: Manage everything needed to build your project`.
5. Chọn `Set up a new keystore` và bấm enter để tạo keystore.
6. Sau khi tạo xong bấm enter, chọn `Go back` để quay lại menu `credentials`.
7. Chọn `credentials.json: Upload/Download credentials between EAS servers and your local json`.
8. Chọn `Download credentials from EAS to credentials.json` để tải keystore về, keystore sẽ tự động thêm vào folder `credentials` và cũng tự update thông tin vào file `credentials.json`.
9. Bấm enter để quay lại menu, chọn `Upload credentials from credentials.json to EAS` để upload keystore lên EAS.

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

---
