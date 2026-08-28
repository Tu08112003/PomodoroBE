# Pomodoro Backend PRD

## 1. Định nghĩa sản phẩm

Pomodoro Backend là REST API NestJS phục vụ authenticated frontend và lưu trữ cloud các dữ liệu cá nhân của người dùng. Backend chạy độc lập, nhưng contract được thiết kế để frontend Pomodoro sử dụng cho optional cloud sync.

Backend không bắt buộc đối với anonymous mode: người dùng có thể sử dụng frontend với LocalStorage mà không có backend identity.

## 2. Actors và use cases

### Anonymous user

- Sử dụng frontend không cần tài khoản.
- Không có identity hoặc dữ liệu được lưu trong backend.
- Dữ liệu anonymous do frontend quản lý bằng LocalStorage.

### Authenticated user

- Register, login, refresh session và logout.
- Xem profile hiện tại.
- CRUD YouTube tracks, wallpapers và todos của chính mình.
- Không thể đọc hoặc sửa resource của user khác.

### Frontend client

- Gửi access token trong `Authorization: Bearer` header.
- Gửi credentials để browser quản lý refresh cookie HttpOnly.
- Không gửi `userId` trong resource payload; backend lấy owner từ JWT.

## 3. API scope

Tất cả route có global prefix `/api`.

### 3.1. Authentication và users

| Method | Route | Mục đích |
|---|---|---|
| POST | `/api/auth/register` | Tạo tài khoản và cấp access token |
| POST | `/api/auth/login` | Xác thực và cấp access token |
| POST | `/api/auth/refresh` | Rotate refresh token và cấp access token mới |
| POST | `/api/auth/logout` | Xóa refresh token đã lưu và clear cookie |
| GET | `/api/users/me` | Trả profile user hiện tại |

Validation chính:

- Email phải hợp lệ.
- Password dài từ 6 đến 128 ký tự.
- `displayName` tùy chọn, tối đa 100 ký tự.
- Password và refresh token không xuất hiện trong response public.

### 3.2. YouTube tracks

| Method | Route | Payload/behavior |
|---|---|---|
| GET | `/api/youtube-tracks` | Liệt kê track của owner, mới nhất trước |
| POST | `/api/youtube-tracks` | Nhận `url`, `title` và `videoId` tùy chọn |
| DELETE | `/api/youtube-tracks/:id` | Xóa track nếu thuộc owner |

URL phải hợp lệ; title là string bắt buộc; backend có thể extract video ID khi payload không cung cấp ID.

### 3.3. Wallpapers

| Method | Route | Payload/behavior |
|---|---|---|
| GET | `/api/wallpapers` | Liệt kê wallpaper của owner, mới nhất trước |
| POST | `/api/wallpapers` | Nhận URL, type và label tùy chọn |
| DELETE | `/api/wallpapers/:id` | Xóa wallpaper nếu thuộc owner |

`type` chỉ nhận `image`, `video` hoặc `custom`. URL phải hợp lệ; label tùy chọn tối đa 100 ký tự.

### 3.4. Todos

| Method | Route | Payload/behavior |
|---|---|---|
| GET | `/api/todos` | Liệt kê todo của owner |
| POST | `/api/todos` | Nhận `content`, tối đa 500 ký tự |
| PATCH | `/api/todos/:id` | Chỉ cập nhật `content` và/hoặc `completed` |
| DELETE | `/api/todos/:id` | Xóa todo nếu thuộc owner |

Create yêu cầu content không rỗng. Update không cho phép body rỗng và không cho client sửa `userId`, `createdAt` hoặc `updatedAt`.

## 4. Ownership và persistence requirements

Backend dùng bốn collection chính:

- `users`
- `youtube_tracks`
- `wallpapers`
- `todos`

Yêu cầu ownership:

- Mọi list query lọc theo authenticated user.
- Mutation resource dùng điều kiện kết hợp `_id` và `userId`.
- Resource không tồn tại hoặc thuộc user khác trả `404`, không tiết lộ sự tồn tại.
- ObjectId sai format trả `400`.
- `userId` luôn lấy từ JWT và không nhận từ client body.
- Resource được sort theo timestamp phù hợp.

## 5. Security và validation

- Access JWT có thời hạn 15 phút.
- Refresh JWT có thời hạn 7 ngày.
- Refresh token được gửi trong HttpOnly cookie với path `/api/auth/refresh`, `sameSite: strict` và `secure` ở production.
- Refresh token được hash trong database và rotate sau mỗi lần refresh; token cũ bị vô hiệu hóa.
- Logout xóa refresh token đã lưu và clear cookie.
- Password hash dùng bcrypt 12 rounds.
- Helmet cung cấp security headers.
- CORS bật credentials và lấy origin từ environment.
- Global `ValidationPipe` bật `whitelist`, `transform` và `forbidNonWhitelisted`.
- Global exception filter chuẩn hóa lỗi và không lộ chi tiết database.
- Throttling áp dụng global qua `APP_GUARD`, với giới hạn mặc định từ `THROTTLE_LIMIT` trong `THROTTLE_TTL` giây; auth routes có các cấu hình giới hạn riêng nếu được module áp dụng.

## 6. Error contract

```json
{
  "statusCode": 401,
  "message": "Invalid credentials",
  "error": "Unauthorized",
  "timestamp": "2026-08-25T10:00:00.000Z",
  "path": "/api/auth/login"
}
```

Quy ước:

- `400`: DTO, ObjectId hoặc schema validation không hợp lệ.
- `401`: thiếu hoặc access JWT không hợp lệ/hết hạn.
- `404`: resource không tồn tại hoặc không thuộc owner.
- `409`: duplicate email hoặc duplicate key.
- Lỗi ngoài dự kiến trả thông tin generic, không trả stack hoặc database details.

## 7. Non-goals

Backend không chịu trách nhiệm cho:

- UI, rendering hoặc browser LocalStorage.
- Pomodoro timer state.
- Ambient mixer và local MP3 assets.
- Curated wallpaper/YouTube catalog.
- Anonymous user identity.
- Điều phối timezone cho daily todo reset ở frontend.
- Offline queue bền vững hoặc conflict resolution nâng cao.

## 8. Acceptance và verification status

Đã triển khai:

- Auth lifecycle register/login/refresh/logout và profile.
- Ownership-scoped CRUD cho todos, wallpapers và YouTube tracks.
- DTO validation, ObjectId validation và standardized error response.
- Helmet, CORS credentials, cookie-parser, JWT guards và throttling.
- Backend build, lint, 8 unit tests và e2e smoke test đã pass trong lần verification gần nhất.

Còn deferred:

- Full HTTP e2e với MongoDB test database riêng.
- Manual register → login → profile → CRUD → cross-user isolation.
- Kiểm thử token expiry, refresh replay/rotation và duplicate-email race trong môi trường database riêng.
- Không dùng MongoDB Atlas production cho test.
