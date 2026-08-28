# PLAN.md - Kế hoạch Triển khai Dự án Pomodoro (Chi tiết Tasks - Next.js)

## Quy trình Tổng quát (Pipeline Workflow)
Dự án tuân thủ nghiêm ngặt lộ trình 4 bước chuẩn:
1. **Planning:** Xác lập yêu cầu (PRD), Kiến trúc (TECH_ARCHITECTURE) và Kế hoạch chi tiết (PLAN).
2. **Design (Google Stitch):** Tạo giao diện UI, layout và Design System bằng Google Stitch MCP.
3. **Download Design từ Stitch:** Trích xuất HTML/CSS, Design Tokens & Mockups từ Stitch.
4. **Code (Convert Design to Next.js Component):** Xây dựng ứng dụng Next.js hoàn chỉnh với đầy đủ tương tác và logic kinh doanh.

---

## Danh sách Tasks Chi tiết Theo Giai đoạn (Work Breakdown Structure)

### Giai đoạn 1: Planning & Khởi tạo Bộ khung Dự án (Project Setup)
- [x] **Task 1.1:** Đọc và chốt các tài liệu `docs/PRD.md`, `docs/TECH_ARCHITECTURE.md`, `docs/PLAN.md`.
- [x] **Task 1.2:** Khởi tạo cấu trúc dự án Next.js App Router + TypeScript (`package.json`, `next.config.mjs`, `tsconfig.json`).
- [x] **Task 1.3:** Cài đặt các thư viện bổ trợ (`tailwindcss`, `@tailwindcss/postcss`, `lucide-react`, `framer-motion`, `canvas-confetti`).
- [x] **Task 1.4:** Cấu hình TailwindCSS với các utility Glassmorphism đặc thù (`backdrop-blur`, border mờ, glass gradients, frosted card styles).
- [x] **Task 1.5:** Khởi tạo cây thư mục chuẩn (`src/app/`, `src/components/`, `src/context/`, `src/hooks/`, `src/services/`, `src/types/`, `src/utils/`, `src/data/`, `src/i18n/`).
- [x] **Task 1.6:** Chuẩn bị tài nguyên tĩnh ban đầu (file audio white noise MP3 sống động trong `public/audio/` và danh sách hình nền HD mặc định trong `src/data/presets.ts`).

---

### Giai đoạn 2: UI Design via Google Stitch (Stitch MCP)
- [x] **Task 2.1:** Soạn thảo tài liệu `DESIGN.md` quy định Design Tokens (Glassmorphism palette, Typography, Frosted glass cards, Spacing, Animation).
- [x] **Task 2.2:** Khởi tạo project Pomodoro trên Stitch MCP server (`projects/9048666022125309703`).
- [x] **Task 2.3:** Thiết kế Screen 1: Layout Tổng thể Workspace (Background layer, Frosted Glass Containers, Dimmer Overlay).
- [x] **Task 2.4:** Thiết kế Screen 2: Central Pomodoro Focus Timer UI (Số đếm lớn, Circular progress indicator, Control buttons, Zen Mode entry).
- [x] **Task 2.5:** Thiết kế Screen 3: Navigation Dock linh hoạt (Floating dock với các icon thủy tinh chuyển đổi panels).
- [x] **Task 2.6:** Thiết kế Screen 4: YouTube Lo-fi Music Player Panel (Station selector cards, Search input, Volume slider, Player status).
- [x] **Task 2.7:** Thiết kế Screen 5: Ambient White Noise Mixer Panel (Grid 8-12 audio cards, Volume sliders, Toggle switches, Presets bar).
- [x] **Task 2.8:** Thiết kế Screen 6: Wallpaper Studio Panel (Tab ảnh tĩnh HD, Live video loops, Custom URL form, Dimmer/Blur sliders).
- [x] **Task 2.9:** Thiết kế Screen 7: Daily Todo List Panel (Task input form, Checklist items, Progress bar, Daily Reset notification badge).
- [x] **Task 2.10:** Xuất và áp dụng Design System chính thức qua Stitch MCP.

---

### Giai đoạn 3: Download & Trích xuất Design từ Stitch
- [x] **Task 3.1:** Trích xuất HTML/CSS gốc và component mockups từ các màn hình trên Stitch.
- [x] **Task 3.2:** Quy đổi các thuộc tính thiết kế từ Stitch thành CSS Variables & Tailwind Utility Tokens tương thích với Next.js trong `src/app/globals.css`.
- [x] **Task 3.3:** Thu thập và phân loại toàn bộ SVG icons, màu sắc, bóng mờ và hiệu ứng glassmorphism vào codebase.

---

### Giai đoạn 4: Code Implementation - Next.js Component Conversion

#### 4.1. Core Layout & Navigation Framework
- [x] **Task 4.1.1:** Xây dựng Next.js App Router Root Layout (`src/app/layout.tsx`) và `src/app/page.tsx`.
- [x] **Task 4.1.2:** Xây dựng component `BackgroundLayer` hỗ trợ rendering linh hoạt Ảnh tĩnh HD, Live Video Loop (`loop autoplay muted`), và Custom URL.
- [x] **Task 4.1.3:** Xây dựng `DimmerOverlay` điều khiển độ tối (Brightness 10%-85%) và độ mờ (Backdrop Blur 0-20px) của hình nền với dải màu sắc trực quan.
- [x] **Task 4.1.4:** Xây dựng `NavigationDock` dạng thanh công cụ nổi Glassmorphism với icon chuyển đổi panels và công tắc `Zen Mode`.

#### 4.2. Central Pomodoro Focus Timer
- [x] **Task 4.2.1:** Viết custom hook `usePomodoro` quản lý đếm ngược, chuyển đổi giữa Work (25m), Short Break (5m), Long Break (15m), và tuỳ chỉnh số phút.
- [x] **Task 4.2.2:** Xây dựng component `PomodoroTimer` với font số lớn thanh lịch (JetBrains Mono), vòng tròn tiến độ (Circular SVG Progress), nút Play/Pause/Reset.
- [x] **Task 4.2.3:** Tích hợp âm thanh thông báo chuông (Audio Chime) khi kết thúc session đếm giờ.
- [x] **Task 4.2.4:** Xây dựng tính năng `Zen Mode`: 1-click ẩn toàn bộ Dock & Widgets xung quanh để chỉ giữ lại Đồng hồ và Hình nền thư giãn.

#### 4.3. YouTube Lo-fi Music Player
- [x] **Task 4.3.1:** Viết component `YouTubePlayerPanel` tích hợp YouTube IFrame Player API (`youtube-nocookie.com`).
- [x] **Task 4.3.2:** Hiển thị danh sách các đài Lofi Station tuyển chọn dạng video không livestream (Lofi Girl Relax, Lofi Girl Sleep, 1 A.M Study Session, Chillhop Essentials, Code-Fi).
- [x] **Task 4.3.3:** Tích hợp ô dán URL YouTube tự động trích xuất `videoId` hoặc `playlistId` (hỗ trợ tự động lặp lại `loop=1`).
- [x] **Task 4.3.4:** Tích hợp bộ điều khiển trình phát: Nút Play/Pause, Mute/Unmute, Volume Slider và thông tin track đang phát.

#### 4.4. Ambient White Noise Mixer
- [x] **Task 4.4.1:** Viết custom hook `useAudioMixer` sử dụng HTML5 Audio và bộ 8 file MP3 âm thanh thật lưu trong `public/audio/`.
- [x] **Task 4.4.2:** Xây dựng component `AmbientMixerPanel` với bộ danh sách 8 âm thanh môi trường sống động (Mưa rào, Sấm chớp, Lửa trại, Gió rừng, Sóng biển, Chim hót, Đêm rừng, Dòng suối).
- [x] **Task 4.4.3:** Tích hợp thanh trượt âm lượng có dải màu Sky Blue lấp đầy tiến độ, công tắc Toggle từng kênh và Master Volume control / Master Mute / Tắt hết.
- [x] **Task 4.4.4:** Tích hợp bộ Sound Presets gợi ý nhanh ("Mưa Ấm Cúng", "Đêm Cắm Trại", "Bờ Biển & Suối").

#### 4.5. Wallpaper Studio
- [x] **Task 4.5.1:** Xây dựng component `WallpaperPickerPanel` với bộ sưu tập phân loại theo Tĩnh (Static HD), Động (Live Video Loop), và Custom URL/Upload.
- [x] **Task 4.5.2:** Tích hợp bảng tinh chỉnh Dimmer (Độ tối 10%-85%) và Blur (0px-20px) với dải màu Indigo trực tiếp.

#### 4.6. Daily Todo List & Storage Reset Engine
- [x] **Task 4.6.1:** Viết custom hook `useDailyStorage` xử lý lưu trữ LocalStorage và phát hiện tự động khi bước sang ngày mới (theo mốc 00:00 local time).
- [x] **Task 4.6.2:** Lập trình cơ chế Reset hàng ngày: Tự động dọn dẹp các task đã xong và giữ lại task dở dang sang ngày mới.
- [x] **Task 4.6.3:** Xây dựng component `TodoListPanel` hỗ trợ Thêm mới, Đánh dấu hoàn thành (Toggle), Xoá task, cùng thanh tỉ lệ hoàn thành ("3/5 tasks completed").

#### 4.7. Multi-language Support (Đa ngôn ngữ VI/EN)
- [x] **Task 4.7.1:** Xây dựng `LanguageContext` và từ điển dịch thuật song ngữ (`src/i18n/translations.ts`).
- [x] **Task 4.7.2:** Tích hợp nút công tắc **VI / EN** trên TopBar lưu vết lựa chọn vào LocalStorage.

---

### Giai đoạn 5: Verification, Refinement & Delivery
- [x] **Task 5.1:** Kiểm thử tổng thể trải nghiệm UI/UX: Độ mượt của các lớp kính mờ Glassmorphism, hiệu ứng chuyển cảnh của panels.
- [x] **Task 5.2:** Kiểm thử hệ thống âm thanh: Đảm bảo âm thanh môi trường và nhạc YouTube phát song song không bị méo tiếng hay delay.
- [x] **Task 5.3:** Kiểm thử cơ chế Daily Reset của Todo List bằng cách kiểm tra timestamp ngày local `YYYY-MM-DD`.
- [x] **Task 5.4:** Kiểm thử hiển thị Responsive trên các kích thước màn hình (Desktop 1920x1080, Laptop 1366x768, Tablet 768px, Mobile 375px).
- [x] **Task 5.5:** Thực hiện kiểm tra TypeScript compile & Next.js production build (`npm run build` - Thành công 100%, 0 lỗi).
- [x] **Task 5.6:** Cập nhật tài liệu `PLAN.md`, đánh dấu các task hoàn thành và bàn giao dự án.


# Phase 6: Pomodoro Backend — NestJS + MongoDB

## Mục tiêu

Xây dựng backend API hoàn chỉnh cho Pomodoro, cho phép user đăng ký/đăng nhập và lưu trữ dữ liệu cá nhân (YouTube tracks, wallpapers, todos) trên cloud. Backend chạy độc lập, FE integrate ở phase sau.

## Quyết định thiết kế (từ Grill-me Session)

| Quyết định | Lựa chọn |
|:---|:---|
| Auth strategy | Hybrid — anonymous (LocalStorage) + optional login (cloud sync) |
| Auth method | Email/Password + JWT |
| JWT config | Access Token 15 phút + Refresh Token 7 ngày (HttpOnly cookie) |
| Database | MongoDB Atlas (cloud only, no local Docker) |
| Schema design | 4 collections riêng biệt: `users`, `youtube_tracks`, `wallpapers`, `todos` |
| API style | RESTful |
| NestJS structure | Modular — mỗi entity 1 module |
| Validation | `class-validator` + `class-transformer`, Global Pipes/Filters |
| Security | Helmet, CORS, Rate limiting (auth endpoints) |
| Data sync | FE tự handle — backend chỉ cần CRUD API |
| Scope | Backend only — không bao gồm FE integration |
| Port | 3001 |

---

## Phase 6 Implementation Checklist (Updated)

Phase 6 dùng NestJS 10, MongoDB Atlas và REST API độc lập cho frontend tích hợp ở phase sau. Tất cả endpoint có prefix `/api`. Auth dùng Email/Password + JWT trực tiếp qua `AuthService`; `passport-local` không thuộc phạm vi phase này vì chưa cần LocalStrategy.

### 6.1 Project setup và configuration

- [x] Giữ cấu trúc NestJS 10 modular, TypeScript strict, port mặc định `3001`.
- [x] Hoàn thiện dependencies runtime và thêm Jest, ts-jest, Supertest, Nest testing.
- [x] Tạo `package-lock.json` bằng `npm install`.
- [x] Cấu hình Helmet, CORS credentials, cookie-parser, global ValidationPipe và global exception filter.
- [x] Bắt buộc `MONGODB_URI`, `JWT_ACCESS_SECRET`, `JWT_REFRESH_SECRET` khi ứng dụng khởi động; không dùng fallback Mongo local hoặc JWT secret mặc định.
- [x] Giữ access token 15 phút, refresh token 7 ngày và CORS origin theo environment.

### 6.2 Common security và error handling

- [x] Giữ `@CurrentUser()`, `JwtAuthGuard` và `JwtRefreshGuard` dùng chung.
- [x] Thêm `ParseObjectIdPipe`: ID sai format trả `400 Bad Request`.
- [x] Thêm kiểm tra ObjectId cho `userId` từ JWT trước khi query.
- [x] Chuẩn hóa error response: `statusCode`, `message`, `error`, `timestamp`, `path`.
- [x] Map duplicate key thành `409`, CastError/schema validation thành `400`, không lộ chi tiết database.
- [x] Dùng atomic query `{ _id, userId }` cho resource mutation; resource không tồn tại hoặc khác owner trả `404`.

### 6.3 Auth và Users hardening

- [x] Hoàn thiện register/login/refresh/logout với access token trong body và refresh token HttpOnly cookie.
- [x] Hash password bcrypt 12 rounds; hash và rotate refresh token, invalidate token cũ.
- [x] Ẩn `password` và `refreshToken` khỏi Mongoose query mặc định; chỉ select khi AuthService cần.
- [x] Giữ cookie `httpOnly`, `sameSite=strict`, `secure` ở production và path `/api/auth/refresh` đồng nhất khi set/clear.
- [x] Profile chỉ trả `_id`, email, displayName, createdAt; không trả dữ liệu nhạy cảm.
- [x] JWT strategies fail fast nếu thiếu secret.
- [ ] Bổ sung test HTTP với MongoDB test riêng cho duplicate email race, token expiry và replay trong môi trường có database.

### 6.4 YouTube Tracks

- [x] Hoàn thiện `GET/POST/DELETE /api/youtube-tracks` với JWT protection.
- [x] Chỉ định collection `youtube_tracks`, giữ index theo user và timestamp.
- [x] Giữ body `{ url, videoId?, title }` và logic extract video ID hiện tại.
- [x] Validate ObjectId ở route delete, filter ownership ở mọi query và không trả `userId` public.

### 6.5 Wallpapers

- [x] Tạo `WallpapersModule`, schema, DTO, service và controller.
- [x] Dùng collection `wallpapers`, fields `url`, `type` (`image|video|custom`), optional `label`, `addedAt` và user index.
- [x] Hoàn thiện `GET/POST/DELETE /api/wallpapers` với validation URL/enum/label.
- [x] Áp dụng ownership query, sort theo `addedAt` và xử lý malformed/missing ID.

### 6.6 Todos

- [x] Tạo `TodosModule`, schema, DTO create/update, service và controller.
- [x] Dùng collection `todos`, timestamps, trimmed content, completed mặc định false và user index.
- [x] Hoàn thiện `GET/POST/PATCH/DELETE /api/todos`.
- [x] PATCH chỉ cho phép `content`/`completed`, từ chối body rỗng, và không cho sửa userId/timestamps.
- [x] Áp dụng atomic ownership query và `400` cho malformed ID / `404` cho resource không thuộc user.

### 6.7 Testing, verification và delivery

- [x] Thêm unit tests cho Auth duplicate-email, ObjectId pipe, Todo update/ownership và Wallpaper ownership/create (8 tests pass).
- [x] Thêm Jest e2e configuration và smoke test (1 test pass).
- [x] `npm run build` pass.
- [x] `npm run lint` pass không còn warning.
- [ ] Chạy e2e HTTP đầy đủ với MongoDB test riêng (`MONGODB_TEST_URI`), không dùng Atlas production.
- [ ] Manual smoke test register → login → protected profile → CRUD resources → cross-user access → refresh rotation → logout khi có test database.
- [x] **Task 6.8:** Khởi tạo Git repository PomodoroBE, đẩy mã nguồn lên GitHub qua các branch theo feature và tuân thủ commit convention.

## API contract

Các route giữ nguyên contract đã thống nhất:

| Resource | Endpoints |
|:---|:---|
| Auth | `POST /api/auth/register`, `/login`, `/refresh`, `/logout` |
| Users | `GET /api/users/me` |
| YouTube tracks | `GET/POST /api/youtube-tracks`, `DELETE /api/youtube-tracks/:id` |
| Wallpapers | `GET/POST /api/wallpapers`, `DELETE /api/wallpapers/:id` |
| Todos | `GET/POST /api/todos`, `PATCH/DELETE /api/todos/:id` |

Auth response trả `{ accessToken, user }`; refresh token chỉ nằm trong HttpOnly cookie. DTO resource không nhận `userId` từ client.

## Error contract

```json
{
  "statusCode": 401,
  "message": "Invalid credentials",
  "error": "Unauthorized",
  "timestamp": "2026-08-25T10:00:00.000Z",
  "path": "/api/auth/login"
}
```

Quy ước bắt buộc: DTO/ID không hợp lệ trả `400`; duplicate email trả `409`; resource không tồn tại hoặc không thuộc owner trả `404`; request protected thiếu/không hợp lệ JWT trả `401`.

## Verification commands

```bash
npm install
npm run build
npm run lint
npm test
npm run test:e2e
```

