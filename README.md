# HỆ THỐNG QUẢN LÝ DỰ ÁN (PROJECT MANAGEMENT SYSTEM)

**Môn học:** Triển khai và Quản trị Hệ thống Phần mềm
**Họ và tên Sinh viên:** Đồng Văn Tuyên
**Mã số Sinh viên:** DTC245180039

---

## 1. Giới thiệu Hệ thống
Hệ thống Quản lý Dự án được đóng gói và vận hành hoàn toàn trên nền tảng **Docker Compose** bao gồm **9 dịch vụ (containers)** tích hợp đầy đủ hạ tầng giám sát và bảo mật:
- **Web App**: Node.js/Express.js (Giao diện Tiếng Việt Zendo Dashboard).
- **Database**: PostgreSQL 15 & Công cụ quản trị pgAdmin.
- **Reverse Proxy**: Nginx (Tích hợp các Security Headers).
- **Monitoring Stack**: Prometheus, Grafana, cAdvisor.
- **Logging Stack**: Loki, Promtail.

---

## 2. Hướng dẫn Khởi chạy Hệ thống

### Yêu cầu môi trường:
- Hệ điều hành Ubuntu Server / Linux.
- Docker & Docker Compose V2.

### Các bước thực hiện:
1. Clone repository về máy:
   ```bash
   git clone [https://github.com/](https://github.com/)<USERNAME_GITHUB>/DTC245180039_Project-Management-System.git
   cd DTC245180039_Project-Management-System
