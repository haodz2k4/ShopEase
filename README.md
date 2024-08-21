
# Shopease

**Version:** 1.0.0

## Mô tả Dự án

**Shopease** là một hệ thống quản lý và thương mại điện tử, bao gồm các tính năng dành cho cả người dùng cuối (clients) và quản trị viên (admin). Dự án sử dụng Node.js với Express để cung cấp API cho các chức năng của hệ thống, và Mongoose để làm việc với cơ sở dữ liệu MongoDB.

## Cài đặt

1. **Clone Repository**

   ```bash
   git clone <repository-url>
   cd shopease
   ```

2. **Cài đặt Dependencies**

   ```bash
   npm install
   ```

3. **Cấu hình Môi Trường**

   Tạo file `.env` từ file mẫu `.env.example` và cấu hình các biến môi trường cần thiết.

4. **Khởi động Dự án**

   ```bash
   npm start
   ```

## Thư Viện

Dự án sử dụng các thư viện và phụ thuộc sau:

- `express`: Framework cho Node.js.
- `mongoose`: Thư viện ODM cho MongoDB.
- `joi`: Thư viện để validate dữ liệu.
- `bcrypt`: Thư viện để hash mật khẩu.
- `jsonwebtoken`: Thư viện để làm việc với JWT.
- `nodemailer`: Thư viện gửi email.
- `cloudinary`: Dịch vụ lưu trữ hình ảnh.
- `ioredis`: Thư viện Redis.
- `dotenv`: Đọc biến môi trường từ file `.env`.

## Cấu Trúc Endpoint

### 1. Endpoint cho Client

- **[GET] `/products`**

  Lấy danh sách sản phẩm với tùy chọn lọc theo trạng thái (`status="active"`).

- **[GET] `/products/:id`**

  Lấy thông tin chi tiết của sản phẩm theo ID.

- **[POST] `/cart/add`**

  Thêm sản phẩm vào giỏ hàng.

- **[PATCH] `/cart/update`**

  Cập nhật số lượng sản phẩm trong giỏ hàng.

- **[DELETE] `/cart/remove/:productId`**

  Xóa sản phẩm khỏi giỏ hàng.

- **[POST] `/checkout`**

  Xử lý thanh toán và đặt hàng.

### 2. Endpoint cho Admin

- **[GET] `/admin/products`**

  Lấy danh sách tất cả sản phẩm. (Không cần query parameters, hiển thị tất cả sản phẩm)

- **[POST] `/admin/products`**

  Thêm sản phẩm mới vào hệ thống.

- **[PATCH] `/admin/products/:id`**

  Cập nhật thông tin sản phẩm theo ID.

- **[DELETE] `/admin/products/:id`**

  Xóa sản phẩm theo ID.

- **[POST] `/admin/auth/login`**

  Đăng nhập cho quản trị viên.

- **[POST] `/admin/auth/logout`**

  Đăng xuất cho quản trị viên.

## Các Tính Năng

- **Quản lý sản phẩm:** Admin có thể thêm, cập nhật, xóa và xem tất cả sản phẩm. Client có thể xem sản phẩm và thêm vào giỏ hàng.

- **Giỏ hàng:** Client có thể quản lý sản phẩm trong giỏ hàng và thực hiện thanh toán.

- **Xác thực:** Sử dụng JWT để bảo mật API và phân quyền cho các chức năng admin và client.

- **Gửi Email:** Sử dụng Nodemailer để gửi email xác nhận và thông báo.

## Hướng Dẫn Phát Triển

1. **Tạo API mới**

   Thêm endpoint mới vào thư mục `routes` và cập nhật các controller tương ứng trong thư mục `controllers`.

2. **Validate Dữ Liệu**

   Sử dụng Joi để xác thực dữ liệu đầu vào trong các controller.

3. **Quản lý Mongoose**

   Cập nhật mô hình và schema trong thư mục `models`.

4. **Cập Nhật Frontend**

   Nếu có yêu cầu frontend, cập nhật giao diện người dùng tương ứng.

## Tài Liệu

- **API Documentation:** Tài liệu API chi tiết được cung cấp tại [link-to-api-docs].

## Cộng Đồng

- **Report Issues:** [link-to-issues]
- **Contribute:** [link-to-contribute]

## License

Shopease is licensed under the ISC License. See [LICENSE](./LICENSE) for details.
```

Hãy thay thế các placeholder như `<repository-url>`, `[link-to-api-docs]`, `[link-to-issues]`, và `[link-to-contribute]` bằng thông tin thực tế của dự án của bạn.
