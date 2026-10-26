const express = require('express');
const app = express();

const htmlContent = `
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hệ Thống Quản Lý Dự Án</title>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
        body { background-color: #eef2f5; color: #1e293b; padding: 20px; }
        .dashboard-container { display: flex; max-width: 1400px; margin: 0 auto; background: #f8fafc; border-radius: 24px; overflow: hidden; box-shadow: 0 20px 25px -5px rgba(0,0,0,0.05); min-height: 880px; }
        
        /* Sidebar */
        .sidebar { width: 270px; background: #ffffff; padding: 24px 16px; border-right: 1px solid #f1f5f9; display: flex; flex-direction: column; gap: 20px; }
        .logo { display: flex; align-items: center; gap: 10px; font-size: 16px; font-weight: 700; color: #0f172a; padding: 0 4px; line-height: 1.2; }
        .logo-icon { width: 34px; height: 34px; background: #6366f1; border-radius: 8px; color: white; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .search-box { position: relative; }
        .search-box input { width: 100%; padding: 10px 12px 10px 36px; border: 1px solid #e2e8f0; border-radius: 12px; font-size: 13px; background: #f8fafc; outline: none; }
        .search-box i { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: #94a3b8; font-size: 12px; }
        .menu-group { display: flex; flex-direction: column; gap: 4px; }
        .menu-title { font-size: 11px; text-transform: uppercase; color: #94a3b8; font-weight: 600; padding: 8px; }
        .menu-item { display: flex; align-items: center; gap: 12px; padding: 10px 12px; color: #64748b; text-decoration: none; border-radius: 12px; font-size: 14px; font-weight: 500; transition: all 0.2s; cursor: pointer; }
        .menu-item:hover, .menu-item.active { background: #0f172a; color: white; }

        /* Main Content */
        .main-content { flex: 1; padding: 28px; display: flex; flex-direction: column; gap: 24px; }
        .header { display: flex; justify-content: space-between; align-items: center; }
        .header h1 { font-size: 22px; font-weight: 700; }
        .header-actions { display: flex; align-items: center; gap: 12px; }
        .btn-primary { background: #6366f1; color: white; border: none; padding: 10px 18px; border-radius: 20px; font-size: 13px; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 6px; transition: 0.2s; }
        .btn-primary:hover { background: #4f46e5; }
        .icon-btn { width: 38px; height: 38px; border-radius: 50%; border: 1px solid #e2e8f0; background: white; display: flex; align-items: center; justify-content: center; color: #64748b; cursor: pointer; position: relative; }
        
        /* Avatar Mặc Định UI */
        .avatar-circle { width: 36px; height: 36px; border-radius: 50%; background: #e2e8f0; color: #475569; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 13px; flex-shrink: 0; border: 1px solid #cbd5e1; }
        .avatar-circle.lead { background: #6366f1; color: white; border: none; }

        /* Sections */
        .tab-section { display: none; flex-direction: column; gap: 24px; }
        .tab-section.active { display: flex; }

        /* Stats Grid */
        .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
        .stat-card { background: white; padding: 18px; border-radius: 16px; border: 1px solid #f1f5f9; display: flex; align-items: center; gap: 16px; }
        .stat-icon { width: 42px; height: 42px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 18px; }
        .stat-val { font-size: 22px; font-weight: 700; margin-top: 2px; }
        .stat-label { font-size: 12px; color: #64748b; }
        .stat-sub { font-size: 10px; color: #94a3b8; }

        /* Grid Layouts */
        .grid-2-1 { display: grid; grid-template-columns: 2fr 1fr; gap: 20px; }
        .card { background: white; border-radius: 18px; padding: 20px; border: 1px solid #f1f5f9; }
        .card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
        .card-title { font-size: 15px; font-weight: 700; }

        /* Project Cards */
        .project-cards { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .p-card { background: #fafafa; border: 1px solid #f1f5f9; border-radius: 14px; padding: 16px; }
        .p-badge { display: inline-block; padding: 2px 8px; border-radius: 10px; font-size: 10px; font-weight: 600; background: #fef3c7; color: #d97706; margin-bottom: 8px; }
        .p-badge.done { background: #dcfce7; color: #15803d; }
        .p-badge.overdue { background: #fee2e2; color: #dc2626; }
        .p-title { font-size: 14px; font-weight: 700; margin-bottom: 6px; }
        .p-desc { font-size: 11px; color: #64748b; line-height: 1.4; margin-bottom: 12px; }
        .p-meta { font-size: 11px; color: #94a3b8; display: flex; justify-content: space-between; margin-bottom: 8px; }
        .progress-bar { height: 6px; background: #e2e8f0; border-radius: 3px; overflow: hidden; }
        .progress-fill { height: 100%; background: #22c55e; }

        /* Tasks & Table */
        .task-list { display: flex; flex-direction: column; gap: 10px; }
        .task-item { display: flex; align-items: center; justify-content: space-between; padding: 12px; background: #f8fafc; border-radius: 12px; font-size: 13px; }
        .task-left { display: flex; align-items: center; gap: 10px; font-weight: 600; }
        .team-table { width: 100%; border-collapse: collapse; font-size: 13px; }
        .team-table th { text-align: left; color: #94a3b8; padding-bottom: 12px; font-weight: 600; }
        .team-table td { padding: 10px 0; border-top: 1px solid #f1f5f9; }
        .user-info { display: flex; align-items: center; gap: 10px; font-weight: 500; }
        .status-online { color: #10b981; font-weight: 600; }

        /* Kanban Column Cards */
        .kanban-board { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; }
        .kanban-col { background: #f1f5f9; padding: 14px; border-radius: 14px; display: flex; flex-direction: column; gap: 10px; }
        .kanban-col-title { font-size: 12px; font-weight: 700; text-transform: uppercase; color: #64748b; display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px; }
        .kanban-card { background: white; padding: 12px; border-radius: 10px; border: 1px solid #e2e8f0; box-shadow: 0 1px 3px rgba(0,0,0,0.05); }
        .kanban-card-title { font-size: 13px; font-weight: 600; margin-bottom: 6px; }
        .kanban-card-meta { font-size: 11px; color: #94a3b8; display: flex; justify-content: space-between; align-items: center; }
    </style>
</head>
<body>
    <div class="dashboard-container">
        <!-- Sidebar Menu -->
        <div class="sidebar">
            <div class="logo">
                <div class="logo-icon"><i class="fa-solid fa-square-poll-vertical"></i></div> 
                <span>Hệ Thống Quản Lý Dự Án</span>
            </div>
            <div class="search-box"><i class="fa-solid fa-magnifying-glass"></i><input type="text" id="searchInput" onkeyup="filterContent()" placeholder="Tìm kiếm..."></div>
            <div class="menu-group">
                <div class="menu-title">Trang chủ</div>
                <a class="menu-item active" onclick="switchTab('overviewTab', this)"><i class="fa-solid fa-house"></i> Tổng quan</a>
                <a class="menu-item" onclick="switchTab('projectsTab', this)"><i class="fa-solid fa-layer-group"></i> Dự án (12)</a>
                <a class="menu-item" onclick="switchTab('tasksTab', this)"><i class="fa-solid fa-list-check"></i> Công việc (8)</a>
                <a class="menu-item" onclick="switchTab('kanbanTab', this)"><i class="fa-solid fa-table-cells-large"></i> Bảng Kanban</a>
                <a class="menu-item" onclick="switchTab('messagesTab', this)"><i class="fa-regular fa-comment"></i> Tin nhắn</a>
                <a class="menu-item" onclick="switchTab('calendarTab', this)"><i class="fa-regular fa-calendar"></i> Lịch biểu</a>
            </div>
            <div class="menu-group">
                <div class="menu-title">Khác</div>
                <a class="menu-item" onclick="switchTab('teamTab', this)"><i class="fa-solid fa-users"></i> Thành viên (5)</a>
                <a class="menu-item" onclick="switchTab('settingsTab', this)"><i class="fa-solid fa-gear"></i> Cài đặt tài khoản</a>
            </div>
        </div>

        <!-- Nội dung chính -->
        <div class="main-content">
            <div class="header">
                <h1 id="pageTitle">Tổng quan hệ thống</h1>
                <div class="header-actions">
                    <button class="btn-primary" onclick="createNewProject()"><i class="fa-solid fa-plus"></i> Dự án mới</button>
                    <div class="icon-btn" onclick="alert('Không có thông báo mới!')"><i class="fa-regular fa-bell"></i></div>
                    <div class="avatar-circle lead" title="Đồng Văn Tuyên">ĐT</div>
                </div>
            </div>

            <!-- Tab 1: Tổng quan -->
            <div id="overviewTab" class="tab-section active">
                <!-- Chỉ số đồng bộ -->
                <div class="stats-grid">
                    <div class="stat-card">
                        <div class="stat-icon" style="background:#e0f2fe; color:#0284c7;"><i class="fa-solid fa-folder-open"></i></div>
                        <div><div class="stat-label">Tổng số dự án</div><div class="stat-val" id="totalProjectCount">12</div><div class="stat-sub">dự án trong danh sách</div></div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon" style="background:#f3e8ff; color:#9333ea;"><i class="fa-solid fa-arrows-rotate"></i></div>
                        <div><div class="stat-label">Đang thực hiện</div><div class="stat-val">7</div><div class="stat-sub">dự án đang triển khai</div></div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon" style="background:#dcfce7; color:#16a34a;"><i class="fa-solid fa-check"></i></div>
                        <div><div class="stat-label">Đã hoàn thành</div><div class="stat-val">3</div><div class="stat-sub">dự án hoàn tất</div></div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon" style="background:#fee2e2; color:#dc2626;"><i class="fa-solid fa-flag"></i></div>
                        <div><div class="stat-label">Quá thời hạn</div><div class="stat-val">2</div><div class="stat-sub">dự án cần xử lý gấp</div></div>
                    </div>
                </div>

                <!-- Dự án & Lịch trình -->
                <div class="grid-2-1">
                    <div class="card">
                        <div class="card-header"><div class="card-title">Dự án nổi bật (Tiêu biểu)</div><i class="fa-solid fa-ellipsis-vertical" style="color:#94a3b8;"></i></div>
                        <div class="project-cards" id="projectContainer">
                            <div class="p-card">
                                <span class="p-badge">Đang tiến hành</span>
                                <div class="p-title">1. Thiết kế lại Ứng dụng Di động</div>
                                <div class="p-desc">Nâng cao trải nghiệm người dùng và tối ưu giao diện app di động.</div>
                                <div class="p-meta"><span>Hạn chót: 15/11/2026</span><b>65%</b></div>
                                <div class="progress-bar"><div class="progress-fill" style="width: 65%;"></div></div>
                            </div>
                            <div class="p-card">
                                <span class="p-badge overdue">Quá thời hạn</span>
                                <div class="p-title">2. Cấu hình Cú pháp Nginx SSL</div>
                                <div class="p-desc">Cấu hình chứng chỉ HTTPS và bảo mật gateway mạng.</div>
                                <div class="p-meta"><span>Hạn chót: 10/10/2026</span><b>40%</b></div>
                                <div class="progress-bar"><div class="progress-fill" style="width: 40%; background:#dc2626;"></div></div>
                            </div>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-header"><div class="card-title">Lịch họp sắp tới</div></div>
                        <div style="background:#f1f5f9; padding:14px; border-radius:12px;">
                            <span style="font-size:10px; background:#dbeafe; color:#2563eb; padding:2px 8px; border-radius:6px; font-weight:600;">Sắp diễn ra</span>
                            <div style="font-weight:700; font-size:14px; margin-top:8px;">Họp tiến độ DevOps & Observability</div>
                            <div style="font-size:12px; color:#64748b; margin-top:6px;"><i class="fa-solid fa-video"></i> Google Meet</div>
                            <div style="font-size:12px; color:#94a3b8; margin-top:4px;"><i class="fa-regular fa-clock"></i> 10:00 AM - 11:30 AM</div>
                        </div>
                    </div>
                </div>

                <!-- Task & Thành viên -->
                <div class="grid-2-1">
                    <div class="card">
                        <div class="card-header"><div class="card-title">Tổng hợp 8 Công việc (Đồng bộ)</div><button onclick="createNewTask()" style="background:none; border:none; color:#6366f1; font-weight:600; cursor:pointer;"><i class="fa-solid fa-plus"></i> Thêm Task</button></div>
                        <div class="task-list">
                            <div class="task-item"><div class="task-left"><i class="fa-regular fa-circle" style="color:#94a3b8;"></i> Cấu hình cảnh báo Prometheus Alerts</div><span class="p-badge">Cần làm</span></div>
                            <div class="task-item"><div class="task-left"><i class="fa-regular fa-circle" style="color:#94a3b8;"></i> Tạo bộ Dashboard hiển thị trên Grafana</div><span class="p-badge">Cần làm</span></div>
                            <div class="task-item"><div class="task-left"><i class="fa-solid fa-spinner" style="color:#d97706;"></i> Kết nối Cơ sở dữ liệu PostgreSQL</div><span class="p-badge">Đang làm</span></div>
                            <div class="task-item"><div class="task-left"><i class="fa-solid fa-spinner" style="color:#d97706;"></i> Triển khai giám sát Prometheus & Grafana</div><span class="p-badge">Đang làm</span></div>
                            <div class="task-item"><div class="task-left"><i class="fa-solid fa-triangle-exclamation" style="color:#dc2626;"></i> Tối ưu hóa truy vấn PostgreSQL Database</div><span class="p-badge overdue">Quá hạn</span></div>
                            <div class="task-item"><div class="task-left"><i class="fa-solid fa-triangle-exclamation" style="color:#dc2626;"></i> Sửa lỗi SSL Certificate trên Nginx</div><span class="p-badge overdue">Quá hạn</span></div>
                            <div class="task-item"><div class="task-left"><i class="fa-regular fa-circle-check" style="color:#10b981;"></i> Xây dựng giao diện Dashboard Tiếng Việt</div><span class="p-badge done">Xong</span></div>
                            <div class="task-item"><div class="task-left"><i class="fa-regular fa-circle-check" style="color:#10b981;"></i> Khởi tạo 9 Container trên Ubuntu Server</div><span class="p-badge done">Xong</span></div>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-header"><div class="card-title">Thành viên nhóm (5)</div></div>
                        <table class="team-table">
                            <thead><tr><th>Tên</th><th>Vai trò</th><th>Trạng thái</th></tr></thead>
                            <tbody>
                                <tr><td><div class="user-info"><div class="avatar-circle lead">ĐT</div><b>Đồng Văn Tuyên</b></div></td><td>Trưởng nhóm / DevOps Lead</td><td class="status-online">Hoạt động</td></tr>
                                <tr><td><div class="user-info"><div class="avatar-circle">MH</div> Nguyễn Minh Hoàng</div></td><td>Backend Developer</td><td class="status-online">Hoạt động</td></tr>
                                <tr><td><div class="user-info"><div class="avatar-circle">TH</div> Phạm Thị Hương</div></td><td>Frontend Developer</td><td class="status-online">Hoạt động</td></tr>
                                <tr><td><div class="user-info"><div class="avatar-circle">QA</div> Lê Quốc Anh</div></td><td>UI/UX Designer</td><td class="status-online">Hoạt động</td></tr>
                                <tr><td><div class="user-info"><div class="avatar-circle">HN</div> Vũ Hoàng Nam</div></td><td>QA / Tester</td><td class="status-online">Hoạt động</td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <!-- Tab 2: Danh sách 12 Dự án đầy đủ -->
            <div id="projectsTab" class="tab-section">
                <div class="card">
                    <div class="card-header"><div class="card-title">Tất cả 12 Dự án trong hệ thống</div><button class="btn-primary" onclick="createNewProject()"><i class="fa-solid fa-plus"></i> Tạo Dự Án</button></div>
                    <p style="color:#64748b; font-size:13px; margin-bottom:16px;">Danh sách đầy đủ 12 dự án phân bổ theo đúng số liệu báo cáo ở bảng Tổng quan.</p>
                    <div class="project-cards" id="fullProjectList">
                        <!-- 7 Đang tiến hành -->
                        <div class="p-card"><span class="p-badge">Đang tiến hành</span><div class="p-title">1. Thiết kế lại Ứng dụng Di động</div><div class="p-desc">Nâng cao trải nghiệm người dùng trên Android/iOS.</div><div class="p-meta"><span>Tiến độ</span><b>65%</b></div><div class="progress-bar"><div class="progress-fill" style="width:65%;"></div></div></div>
                        <div class="p-card"><span class="p-badge">Đang tiến hành</span><div class="p-title">2. Thiết kế Website Doanh nghiệp</div><div class="p-desc">Xây dựng giao diện công ty và tích hợp cổng thanh toán.</div><div class="p-meta"><span>Tiến độ</span><b>80%</b></div><div class="progress-bar"><div class="progress-fill" style="width:80%;"></div></div></div>
                        <div class="p-card"><span class="p-badge">Đang tiến hành</span><div class="p-title">3. Tích hợp Hệ thống Đăng nhập SSO</div><div class="p-desc">Đăng nhập một lần cho toàn bộ các dịch vụ nội bộ.</div><div class="p-meta"><span>Tiến độ</span><b>50%</b></div><div class="progress-bar"><div class="progress-fill" style="width:50%;"></div></div></div>
                        <div class="p-card"><span class="p-badge">Đang tiến hành</span><div class="p-title">4. Xây dựng Cổng tra cứu Task API</div><div class="p-desc">Phát triển dịch vụ RESTful cho mobile app tiêu thụ dữ liệu.</div><div class="p-meta"><span>Tiến độ</span><b>30%</b></div><div class="progress-bar"><div class="progress-fill" style="width:30%;"></div></div></div>
                        <div class="p-card"><span class="p-badge">Đang tiến hành</span><div class="p-title">5. Tối ưu hóa Lưu trữ Log Lokil/Promtail</div><div class="p-desc">Thu gom toàn bộ log container về hệ thống trung tâm.</div><div class="p-meta"><span>Tiến độ</span><b>75%</b></div><div class="progress-bar"><div class="progress-fill" style="width:75%;"></div></div></div>
                        <div class="p-card"><span class="p-badge">Đang tiến hành</span><div class="p-title">6. Cấu hình Backup tự động PostgreSQL</div><div class="p-desc">Tự động sao lưu dữ liệu hàng ngày sang storage phụ.</div><div class="p-meta"><span>Tiến độ</span><b>45%</b></div><div class="progress-bar"><div class="progress-fill" style="width:45%;"></div></div></div>
                        <div class="p-card"><span class="p-badge">Đang tiến hành</span><div class="p-title">7. Viết Tài liệu Hướng dẫn Vận hành</div><div class="p-desc">Tài liệu hóa quy trình đóng gói và triển khai dự án.</div><div class="p-meta"><span>Tiến độ</span><b>20%</b></div><div class="progress-bar"><div class="progress-fill" style="width:20%;"></div></div></div>

                        <!-- 3 Đã hoàn thành -->
                        <div class="p-card"><span class="p-badge done">Hoàn thành</span><div class="p-title">8. Khởi tạo Stack Docker Compose 9 Services</div><div class="p-desc">Dựng thành công toàn bộ container trên Ubuntu Server.</div><div class="p-meta"><span>Tiến độ</span><b>100%</b></div><div class="progress-bar"><div class="progress-fill" style="width:100%;"></div></div></div>
                        <div class="p-card"><span class="p-badge done">Hoàn thành</span><div class="p-title">9. Triển khai Nginx Reverse Proxy Gateway</div><div class="p-desc">Điều hướng truy cập các dịch vụ qua cổng 80 chuẩn xác.</div><div class="p-meta"><span>Tiến độ</span><b>100%</b></div><div class="progress-bar"><div class="progress-fill" style="width:100%;"></div></div></div>
                        <div class="p-card"><span class="p-badge done">Hoàn thành</span><div class="p-title">10. Thiết kế Cấu trúc Cơ sở dữ liệu Postgres</div><div class="p-desc">Khởi tạo các bảng quản lý task, user và phân quyền.</div><div class="p-meta"><span>Tiến độ</span><b>100%</b></div><div class="progress-bar"><div class="progress-fill" style="width:100%;"></div></div></div>

                        <!-- 2 Quá hạn -->
                        <div class="p-card"><span class="p-badge overdue">Quá thời hạn</span><div class="p-title">11. Cấu hình Cú pháp Nginx SSL</div><div class="p-desc">Cấu hình chứng chỉ HTTPS và bảo mật gateway mạng.</div><div class="p-meta"><span>Tiến độ</span><b>40%</b></div><div class="progress-bar"><div class="progress-fill" style="width:40%; background:#dc2626;"></div></div></div>
                        <div class="p-card"><span class="p-badge overdue">Quá thời hạn</span><div class="p-title">12. Nâng cấp phiên bản Node.js App Server</div><div class="p-desc">Cập nhật dependencies lên phiên bản mới nhất.</div><div class="p-meta"><span>Tiến độ</span><b>15%</b></div><div class="progress-bar"><div class="progress-fill" style="width:15%; background:#dc2626;"></div></div></div>
                    </div>
                </div>
            </div>

            <!-- Tab 3: Danh sách 8 Công việc (Đồng bộ Bảng Kanban) -->
            <div id="tasksTab" class="tab-section">
                <div class="card">
                    <div class="card-header"><div class="card-title">Danh sách 8 Công việc Hệ thống (Đồng bộ với Bảng Kanban)</div><a href="/api/tasks" target="_blank" style="font-size:12px; color:#6366f1; font-weight:600; text-decoration:none;"><i class="fa-solid fa-code"></i> Xem JSON API</a></div>
                    <div class="task-list" id="allTasksList">
                        <div class="task-item"><div class="task-left"><i class="fa-regular fa-circle" style="color:#94a3b8;"></i> 1. Cấu hình cảnh báo Prometheus Alerts</div><span class="p-badge">Cần làm</span></div>
                        <div class="task-item"><div class="task-left"><i class="fa-regular fa-circle" style="color:#94a3b8;"></i> 2. Tạo bộ Dashboard hiển thị trên Grafana</div><span class="p-badge">Cần làm</span></div>
                        <div class="task-item"><div class="task-left"><i class="fa-solid fa-spinner" style="color:#d97706;"></i> 3. Kết nối Cơ sở dữ liệu PostgreSQL</div><span class="p-badge">Đang làm</span></div>
                        <div class="task-item"><div class="task-left"><i class="fa-solid fa-spinner" style="color:#d97706;"></i> 4. Triển khai giám sát Prometheus & Grafana</div><span class="p-badge">Đang làm</span></div>
                        <div class="task-item"><div class="task-left"><i class="fa-solid fa-triangle-exclamation" style="color:#dc2626;"></i> 5. Tối ưu hóa truy vấn PostgreSQL Database</div><span class="p-badge overdue">Quá hạn</span></div>
                        <div class="task-item"><div class="task-left"><i class="fa-solid fa-triangle-exclamation" style="color:#dc2626;"></i> 6. Sửa lỗi SSL Certificate trên Nginx</div><span class="p-badge overdue">Quá hạn</span></div>
                        <div class="task-item"><div class="task-left"><i class="fa-regular fa-circle-check" style="color:#10b981;"></i> 7. Xây dựng giao diện Dashboard Tiếng Việt</div><span class="p-badge done">Đã xong</span></div>
                        <div class="task-item"><div class="task-left"><i class="fa-regular fa-circle-check" style="color:#10b981;"></i> 8. Khởi tạo 9 Container trên Ubuntu Server</div><span class="p-badge done">Đã xong</span></div>
                    </div>
                </div>
            </div>

            <!-- Tab 4: Bảng Kanban (Đồng bộ 2-2-2-2) -->
            <div id="kanbanTab" class="tab-section">
                <div class="card">
                    <div class="card-header"><div class="card-title">Bảng Kanban Tiến Độ (Đồng bộ 8 Công việc)</div><button class="btn-primary" onclick="createNewTask()"><i class="fa-solid fa-plus"></i> Thêm Thẻ mới</button></div>
                    <div class="kanban-board">
                        <!-- Cột TODO (2) -->
                        <div class="kanban-col">
                            <div class="kanban-col-title"><span><i class="fa-regular fa-circle"></i> Cần làm (Todo)</span><b>2</b></div>
                            <div class="kanban-card">
                                <div class="kanban-card-title">Cấu hình cảnh báo Prometheus Alerts</div>
                                <div class="kanban-card-meta"><span>Phụ trách: Nam</span><span class="p-badge">Chưa chạy</span></div>
                            </div>
                            <div class="kanban-card">
                                <div class="kanban-card-title">Tạo bộ Dashboard hiển thị trên Grafana</div>
                                <div class="kanban-card-meta"><span>Phụ trách: Tuyên</span><span class="p-badge">Chưa chạy</span></div>
                            </div>
                        </div>

                        <!-- Cột IN PROGRESS (2) -->
                        <div class="kanban-col">
                            <div class="kanban-col-title" style="color:#d97706;"><span><i class="fa-solid fa-spinner"></i> Đang làm (In Progress)</span><b>2</b></div>
                            <div class="kanban-card">
                                <div class="kanban-card-title">Kết nối Cơ sở dữ liệu PostgreSQL</div>
                                <div class="kanban-card-meta"><span>Phụ trách: Hoàng</span><span class="p-badge">Đang làm</span></div>
                            </div>
                            <div class="kanban-card">
                                <div class="kanban-card-title">Triển khai giám sát Prometheus & Grafana</div>
                                <div class="kanban-card-meta"><span>Phụ trách: Tuyên</span><span class="p-badge">Đang làm</span></div>
                            </div>
                        </div>

                        <!-- Cột OVERDUE (2) -->
                        <div class="kanban-col">
                            <div class="kanban-col-title" style="color:#dc2626;"><span><i class="fa-solid fa-triangle-exclamation"></i> Quá hạn (Overdue)</span><b>2</b></div>
                            <div class="kanban-card" style="border-left: 3px solid #dc2626;">
                                <div class="kanban-card-title">Tối ưu hóa truy vấn PostgreSQL Database</div>
                                <div class="kanban-card-meta"><span>Hạn: 18/10/2026</span><span class="p-badge overdue">Quá hạn</span></div>
                            </div>
                            <div class="kanban-card" style="border-left: 3px solid #dc2626;">
                                <div class="kanban-card-title">Sửa lỗi SSL Certificate trên Nginx</div>
                                <div class="kanban-card-meta"><span>Hạn: 12/10/2026</span><span class="p-badge overdue">Quá hạn</span></div>
                            </div>
                        </div>

                        <!-- Cột DONE (2) -->
                        <div class="kanban-col">
                            <div class="kanban-col-title" style="color:#16a34a;"><span><i class="fa-regular fa-circle-check"></i> Đã xong (Done)</span><b>2</b></div>
                            <div class="kanban-card">
                                <div class="kanban-card-title">Xây dựng giao diện Dashboard Tiếng Việt</div>
                                <div class="kanban-card-meta"><span>Phụ trách: Hương</span><span class="p-badge done">Hoàn thành</span></div>
                            </div>
                            <div class="kanban-card">
                                <div class="kanban-card-title">Khởi tạo 9 Container trên Ubuntu Server</div>
                                <div class="kanban-card-meta"><span>Phụ trách: Tuyên</span><span class="p-badge done">Hoàn thành</span></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Tab 5: Tin nhắn -->
            <div id="messagesTab" class="tab-section">
                <div class="card"><div class="card-title">Tin nhắn nhóm</div><p style="color:#64748b; margin-top:10px; font-size:13px;">Chưa có tin nhắn mới nào từ các thành viên trong dự án.</p></div>
            </div>

            <!-- Tab 6: Lịch biểu -->
            <div id="calendarTab" class="tab-section">
                <div class="card"><div class="card-title">Lịch làm việc</div><p style="color:#64748b; margin-top:10px; font-size:13px;">Lịch họp nhóm định kỳ vào thứ 6 hằng tuần.</p></div>
            </div>

            <!-- Tab 7: Thành viên với Avatar Mặc Định -->
            <div id="teamTab" class="tab-section">
                <div class="card">
                    <div class="card-title" style="margin-bottom:16px;">Danh sách Thành viên Dự án (5 Thành viên)</div>
                    <table class="team-table">
                        <thead><tr><th>Họ và Tên</th><th>Chức vụ / Vai trò</th><th>Email</th><th>Trạng thái</th></tr></thead>
                        <tbody>
                            <tr><td><div class="user-info"><div class="avatar-circle lead">ĐT</div><b>Đồng Văn Tuyên</b></div></td><td>Trưởng nhóm / DevOps Lead</td><td>dongvantuyen@example.com</td><td class="status-online">Trực tuyến</td></tr>
                            <tr><td><div class="user-info"><div class="avatar-circle">MH</div> Nguyễn Minh Hoàng</div></td><td>Backend Developer</td><td>hoangnm@example.com</td><td class="status-online">Trực tuyến</td></tr>
                            <tr><td><div class="user-info"><div class="avatar-circle">TH</div> Phạm Thị Hương</div></td><td>Frontend Developer</td><td>huongpt@example.com</td><td class="status-online">Trực tuyến</td></tr>
                            <tr><td><div class="user-info"><div class="avatar-circle">QA</div> Lê Quốc Anh</div></td><td>UI/UX Designer</td><td>anhlq@example.com</td><td class="status-online">Trực tuyến</td></tr>
                            <tr><td><div class="user-info"><div class="avatar-circle">HN</div> Vũ Hoàng Nam</div></td><td>QA / Tester</td><td>namvh@example.com</td><td class="status-online">Trực tuyến</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- Tab 8: Cài đặt -->
            <div id="settingsTab" class="tab-section">
                <div class="card"><div class="card-title">Cài đặt Tài khoản</div><p style="color:#64748b; margin-top:10px; font-size:13px;">Trưởng nhóm điều hành: Đồng Văn Tuyên (Ubuntu Server - Docker Container Stack).</p></div>
            </div>
        </div>
    </div>

    <script>
        // Hàm chuyển Tab Menu
        function switchTab(tabId, element) {
            document.querySelectorAll('.tab-section').forEach(tab => tab.classList.remove('active'));
            document.querySelectorAll('.menu-item').forEach(item => item.classList.remove('active'));
            
            document.getElementById(tabId).classList.add('active');
            element.classList.add('active');
            document.getElementById('pageTitle').innerText = element.innerText.trim();
        }

        // Tạo Dự Án Mới
        function createNewProject() {
            const name = prompt("Nhập tên dự án mới:");
            if (name) {
                const projectContainer = document.getElementById('projectContainer');
                const fullProjectList = document.getElementById('fullProjectList');
                const newProjectHTML = \`
                    <div class="p-card">
                        <span class="p-badge">Đang tiến hành</span>
                        <div class="p-title">\${name}</div>
                        <div class="p-desc">Dự án vừa được khởi tạo bởi Đồng Văn Tuyên.</div>
                        <div class="p-meta"><span>Tiến độ</span><b>10%</b></div>
                        <div class="progress-bar"><div class="progress-fill" style="width: 10%;"></div></div>
                    </div>
                \`;
                projectContainer.insertAdjacentHTML('beforeend', newProjectHTML);
                fullProjectList.insertAdjacentHTML('beforeend', newProjectHTML);
                
                let countElem = document.getElementById('totalProjectCount');
                countElem.innerText = parseInt(countElem.innerText) + 1;
                alert("Đã tạo dự án thành công!");
            }
        }

        // Thêm Task Mới
        function createNewTask() {
            const taskName = prompt("Nhập tên công việc mới:");
            if (taskName) {
                const taskList = document.getElementById('allTasksList');
                const newTaskHTML = \`
                    <div class="task-item">
                        <div class="task-left"><i class="fa-regular fa-circle" style="color:#94a3b8;"></i> \${taskName}</div>
                        <span class="p-badge">Đang tiến hành</span>
                    </div>
                \`;
                taskList.insertAdjacentHTML('beforeend', newTaskHTML);
                alert("Đã thêm công việc mới!");
            }
        }

        // Tìm kiếm nhanh
        function filterContent() {
            let input = document.getElementById('searchInput').value.toLowerCase();
            let cards = document.querySelectorAll('.p-card, .task-item, .kanban-card');
            cards.forEach(card => {
                let text = card.innerText.toLowerCase();
                card.style.display = text.includes(input) ? '' : 'none';
            });
        }
    </script>
</body>
</html>
`;

app.get('/', (req, res) => { res.send(htmlContent); });
app.get('/api/tasks', (req, res) => {
    res.json([
        { id: 1, task: "Cau hinh canh bao Prometheus Alerts", status: "Todo", member: "Vu Hoang Nam" },
        { id: 2, task: "Tao bo Dashboard hien thi tren Grafana", status: "Todo", member: "Dong Van Tuyen" },
        { id: 3, task: "Ket noi Co so du lieu PostgreSQL", status: "In Progress", member: "Nguyen Minh Hoang" },
        { id: 4, task: "Trien khai giam sat Prometheus & Grafana", status: "In Progress", member: "Dong Van Tuyen" },
        { id: 5, task: "Toi uu hoa truy van PostgreSQL Database", status: "Overdue", member: "Vu Hoang Nam" },
        { id: 6, task: "Sua loi SSL Certificate tren Nginx", status: "Overdue", member: "Dong Van Tuyen" },
        { id: 7, task: "Xay dung giao dien Dashboard Tieng Viet", status: "Done", member: "Pham Thi Huong" },
        { id: 8, task: "Khoi tao 9 Container tren Ubuntu Server", status: "Done", member: "Dong Van Tuyen" }
    ]);
});

app.listen(3000, () => console.log('App running on port 3000'));
