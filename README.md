<p align="center">
  <img src="9e2e3090-6abb-414d-81ba-0ff0b121705d.png" alt="조각조각 로고" width="120"/>
</p>

<h1 align="center" style="color:#28A745;">조각조각</h1>


<div align="center">
  <p><strong>노인과 보호자를 위한 추억 기록 및 관리 플랫폼</strong></p>
  
  ![React](https://img.shields.io/badge/React-19.1.1-61DAFB?style=for-the-badge&logo=react&logoColor=white)
  ![TypeScript](https://img.shields.io/badge/TypeScript-5.8.2-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
  ![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.5.5-6DB33F?style=for-the-badge&logo=spring&logoColor=white)
  ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
  ![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)
</div>

---

## 📖 프로젝트 소개

**조각조각**은 노인과 보호자를 위한 디지털 추억 관리 플랫폼입니다. AI 기술을 활용하여 사진을 통한 추억 기록, 약물 관리, 위치 추적 등의 기능을 제공합니다.

### 🎯 주요 기능

#### 👴👵 노인용 기능
- **📸 추억 기록**: 사진 촬영을 통한 일상 기록
- **💊 약물 관리**: 복용 시간 알림 및 관리
- **🗺️ 위치 공유**: 실시간 위치 정보 공유
- **👥 인물 찾기**: AI를 활용한 인물 인식 및 찾기
- **📱 간편한 UI**: 노인 친화적인 직관적 인터페이스

#### 👨‍👩‍👧‍👦 보호자용 기능
- **📊 모니터링**: 노인의 일상 활동 모니터링
- **🔔 알림 관리**: 약물 복용, 위치 등 알림 수신
- **📷 갤러리 관리**: 노인이 촬영한 사진 관리
- **🗺️ 위치 추적**: 실시간 위치 확인
- **📱 통합 관리**: 모든 정보를 한 곳에서 관리

## 🚀 기술 스택

### Frontend
- **Framework**: React 19.1.1
- **Language**: TypeScript 5.8.2
- **Build Tool**: Vite 6.2.0
- **Styling**: Tailwind CSS
- **AI Integration**: Google Gemini AI
- **State Management**: React Hooks + Local Storage

### Backend
- **Framework**: Spring Boot 3.5.5
- **Language**: Java 24
- **Database**: PostgreSQL
- **Security**: Spring Security + JWT
- **API Documentation**: Swagger/OpenAPI 3
- **Build Tool**: Gradle

### Infrastructure
- **Database**: PostgreSQL
- **Authentication**: JWT (JSON Web Token)
- **File Storage**: Local File System
- **Deployment**: Docker (Optional)

## 📁 프로젝트 구조

```
ZogakZogakTeam/
├── frontend/                 # React 프론트엔드
│   ├── components/          # UI 컴포넌트
│   │   ├── icons/          # 아이콘 컴포넌트
│   │   ├── modals/         # 모달 컴포넌트
│   │   └── screens/        # 화면 컴포넌트
│   │       ├── elderly/    # 노인용 화면
│   │       └── guardian/   # 보호자용 화면
│   ├── contexts/           # React Context
│   ├── hooks/              # 커스텀 훅
│   ├── lib/                # 외부 라이브러리 통합
│   └── types/              # TypeScript 타입 정의
├── backend/                 # Spring Boot 백엔드
│   ├── src/main/java/      # Java 소스 코드
│   │   └── com/example/PieceOfPeace/
│   │       ├── analysis/   # AI 분석 서비스
│   │       ├── config/     # 설정 클래스
│   │       ├── diary/      # 일기 관리
│   │       ├── file/       # 파일 관리
│   │       ├── jwt/        # JWT 인증
│   │       ├── medication/ # 약물 관리
│   │       ├── memory/     # 추억 관리
│   │       ├── person/     # 인물 관리
│   │       └── user/       # 사용자 관리
│   └── src/main/resources/ # 설정 파일
└── uploads/                 # 업로드된 파일
```

## 🛠️ 설치 및 실행

### 필수 요구사항
- **Node.js** (v18 이상)
- **Java** (v24)
- **PostgreSQL** (v12 이상)
- **npm** 또는 **yarn**

### 1. 저장소 클론

```bash
git clone https://github.com/Mingjaam/ZogakZogakTeam.git
cd ZogakZogakTeam
```

### 2. 서브모듈 초기화

```bash
git submodule update --init --recursive
```

### 3. 데이터베이스 설정

PostgreSQL 데이터베이스를 생성하고 설정합니다:

```sql
CREATE DATABASE zogak;
CREATE USER postgres WITH PASSWORD '1234';
GRANT ALL PRIVILEGES ON DATABASE zogak TO postgres;
```

### 4. 백엔드 실행

```bash
cd backend
./gradlew bootRun
```

백엔드는 `http://localhost:8080`에서 실행됩니다.

### 5. 프론트엔드 실행

새 터미널에서:

```bash
cd frontend
npm install
npm run dev
```

프론트엔드는 `http://localhost:5173`에서 실행됩니다.

### 6. 환경 변수 설정 (선택사항)

프론트엔드에서 Google Gemini AI를 사용하려면:

```bash
# frontend/.env.local 파일 생성
echo "GEMINI_API_KEY=your_gemini_api_key_here" > frontend/.env.local
```

## 🔧 API 문서

백엔드 서버가 실행되면 Swagger UI에서 API 문서를 확인할 수 있습니다:

- **Swagger UI**: http://localhost:8080/swagger-ui.html
- **API Docs**: http://localhost:8080/v3/api-docs

### 주요 API 엔드포인트

#### 인증
- `POST /api/users/register` - 회원가입
- `POST /api/users/login` - 로그인

#### 일기 관리
- `GET /api/diaries` - 일기 목록 조회
- `POST /api/diaries` - 일기 생성
- `PUT /api/diaries/{id}` - 일기 수정
- `DELETE /api/diaries/{id}` - 일기 삭제

#### 추억 관리
- `GET /api/memories` - 추억 목록 조회
- `POST /api/memories` - 추억 생성
- `PUT /api/memories/{id}` - 추억 수정

#### 약물 관리
- `GET /api/medications` - 약물 목록 조회
- `POST /api/medications` - 약물 등록

## 🎨 주요 화면

### 노인용 화면
- 🏠 **홈 화면**: 주요 기능 접근
- 📸 **카메라**: 사진 촬영 및 추억 기록
- 🗺️ **지도**: 현재 위치 확인
- 💊 **약물 관리**: 복용 시간 알림
- 👥 **인물 찾기**: AI 인식 기능

### 보호자용 화면
- 📊 **대시보드**: 종합 모니터링
- 📷 **갤러리**: 노인 사진 관리
- 🗺️ **위치 추적**: 실시간 위치 확인
- 🔔 **알림 관리**: 다양한 알림 수신
- 👤 **프로필**: 계정 관리

## 🤖 AI 기능

- **이미지 인식**: Google Gemini AI를 활용한 사진 분석
- **인물 인식**: 촬영된 사진에서 인물 자동 인식
- **감정 분석**: 일기 내용의 감정 상태 분석
- **스마트 분류**: 사진 자동 분류 및 태깅

## 🔐 보안 기능

- **JWT 인증**: 안전한 토큰 기반 인증
- **비밀번호 암호화**: BCrypt를 사용한 비밀번호 해싱
- **CORS 설정**: 크로스 오리진 요청 보안
- **입력 검증**: 서버 측 데이터 검증

## 📱 반응형 디자인

- 모바일 우선 설계
- 태블릿 및 데스크톱 지원
- 노인 친화적 UI/UX
- 직관적인 네비게이션

## 🚀 배포

### Docker를 사용한 배포

```bash
# 백엔드 Docker 이미지 빌드
cd backend
docker build -t zogakzogak-backend .

# 프론트엔드 빌드
cd ../frontend
npm run build

# Docker Compose로 전체 서비스 실행
cd ..
docker-compose up -d
```

### GitHub Pages 배포

프론트엔드는 GitHub Actions를 통해 자동으로 GitHub Pages에 배포됩니다.

## 🧪 테스트

### 백엔드 테스트

```bash
cd backend
./gradlew test
```

### 프론트엔드 테스트

```bash
cd frontend
npm test
```

## 📊 데이터베이스 스키마

### 주요 테이블
- **users**: 사용자 정보
- **families**: 가족 관계
- **diaries**: 일기
- **memories**: 추억 (사진, 비디오)
- **medications**: 약물 정보
- **persons**: 인물 정보
- **emotions**: 감정 분석 결과

## 🔧 개발 스크립트

### 백엔드
```bash
./gradlew bootRun          # 개발 서버 실행
./gradlew build            # 프로덕션 빌드
./gradlew test             # 테스트 실행
```

### 프론트엔드
```bash
npm run dev                # 개발 서버 실행
npm run build              # 프로덕션 빌드
npm run preview            # 빌드 결과 미리보기
```

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.

## 📞 문의

프로젝트에 대한 문의사항이 있으시면 이슈를 생성해 주세요.

## 🚀 최근 업데이트

- **v1.0.0** (2024-12-19): 초기 버전 릴리스
- 로그인 500 오류 수정
- JWT Secret Key 보안 강화
- 예외 처리 개선
- 로깅 시스템 추가

---

<div align="center">
  <p>Made with ❤️ for better elderly care</p>
  <p>© 2024 조각조각. All rights reserved.</p>
</div>
