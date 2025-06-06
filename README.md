# Intern PoC Project

Dự án Proof of Concept (PoC), bao gồm cả frontend và backend được containerized với Docker.

## 🏗️ Kiến trúc dự án

- **Frontend**: Next.js với TypeScript và Tailwind CSS
- **Backend**: Strapi CMS với TypeScript
- **Database**: SQLite (development)
- **Containerization**: Docker & Docker Compose

## 📁 Cấu trúc thư mục

```
├── docker-compose.yml          # Docker Compose configuration
├── frontend/                   # Next.js frontend application
│   ├── src/                   # Source code
│   ├── public/                # Static assets
│   ├── Dockerfile             # Frontend Docker configuration
│   └── package.json           # Frontend dependencies
├── backend/                    # Strapi backend application
│   ├── src/                   # Backend source code
│   ├── config/                # Strapi configuration
│   ├── data/                  # Database files
│   ├── Dockerfile             # Backend Docker configuration
│   └── package.json           # Backend dependencies
└── .vscode/                   # VS Code settings
```

## 🚀 Cài đặt và chạy dự án

### Yêu cầu hệ thống

- Node.js 22+
- Docker & Docker Compose
- Git

### 1. Clone repository

```bash
git clone <repository-url>
cd PoC
```

### 2. Cấu hình environment variables

#### Frontend

```bash
cd frontend
cp .env.example .env
# Chỉnh sửa các biến môi trường trong file .env
```

#### Backend

```bash
cd backend
cp .env.example .env
# Cấu hình database và các API keys cần thiết
```

### 3. Chạy với Docker Compose (Khuyến nghị)

```bash
# Chạy toàn bộ stack
docker-compose up -d

# Xem logs
docker-compose logs -f

# Dừng services
docker-compose down
```

### 4. Chạy development locally

#### Backend (Strapi)

```bash
cd backend
npm install
npm run develop
```

Backend sẽ chạy tại: http://localhost:1337

#### Frontend (Next.js)

```bash
cd frontend
npm install
npm run dev
```

Frontend sẽ chạy tại: http://localhost:3000

## 🔧 Scripts có sẵn

### Frontend

- `npm run dev` - Chạy development server
- `npm run build` - Build production
- `npm run start` - Chạy production server
- `npm run lint` - Kiểm tra code style

### Backend

- `npm run develop` - Chạy Strapi development
- `npm run start` - Chạy Strapi production
- `npm run build` - Build Strapi admin
- `npm run strapi` - Strapi CLI commands

## 🐳 Docker

### Build images riêng lẻ

```bash
# Build frontend
docker build -t poc-frontend ./frontend

# Build backend
docker build -t poc-backend ./backend
```

### Sử dụng Docker Compose

```bash
# Chạy tất cả services
docker-compose up

# Chạy specific service
docker-compose up frontend
docker-compose up backend

# Rebuild và chạy
docker-compose up --build
```

## 🛠️ Công nghệ sử dụng

### Frontend

- **Next.js 14+** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS
- **ESLint** - Code linting

### Backend

- **Strapi** - Headless CMS
- **TypeScript** - Type safety
- **SQLite** - Database (development)

## 📝 Development Notes

- TypeScript type checking được disable trong Docker build để tăng tốc độ build
- Frontend sử dụng environment variable `NEXT_DISABLE_TYPE_CHECKING=1`
- Backend sử dụng SQLite cho development, có thể chuyển sang PostgreSQL/MySQL cho production

## 🚦 API Endpoints

### Backend (Strapi)

- Admin Panel: http://localhost:1337/admin
- API Base: http://localhost:1337/api
- Documentation: http://localhost:1337/documentation

### Frontend

- Main App: http://localhost:3000

## 🤝 Contributing

1. Fork repository
2. Tạo feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Tạo Pull Request

## 📋 TODO

- [ ] Thêm testing setup
- [ ] Cấu hình CI/CD pipeline
- [ ] Thêm production database configuration
- [ ] Implement authentication
- [ ] Add API documentation

## 📞 Liên hệ

Dự án thực tập - PoC Implementation

---

_Cập nhật lần cuối: [Current Date]_
