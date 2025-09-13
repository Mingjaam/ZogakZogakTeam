<div align="center">
  <h1>🧩 조각조각</h1>
  <p><strong>노인과 보호자를 위한 추억 기록 및 관리 플랫폼</strong></p>
  
  ![React](https://img.shields.io/badge/React-19.1.1-61DAFB?style=for-the-badge&logo=react&logoColor=white)
  ![TypeScript](https://img.shields.io/badge/TypeScript-5.8.2-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
  ![Vite](https://img.shields.io/badge/Vite-6.2.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)
  ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
  ![Google Gemini](https://img.shields.io/badge/Google_Gemini-4285F4?style=for-the-badge&logo=google&logoColor=white)
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

- **Frontend**: React 19.1.1, TypeScript
- **Build Tool**: Vite 6.2.0
- **Styling**: Tailwind CSS
- **AI Integration**: Google Gemini AI
- **State Management**: React Hooks + Local Storage

## 📁 프로젝트 구조

```
zogakzogak/
├── components/           # UI 컴포넌트
│   ├── icons/           # 아이콘 컴포넌트
│   ├── modals/          # 모달 컴포넌트
│   └── screens/         # 화면 컴포넌트
│       ├── elderly/     # 노인용 화면
│       └── guardian/    # 보호자용 화면
├── hooks/               # 커스텀 훅
├── lib/                 # 외부 라이브러리 통합
├── App.tsx              # 메인 앱 컴포넌트
├── ElderlyApp.tsx       # 노인용 앱
└── GuardianApp.tsx      # 보호자용 앱
```

## 🛠️ 설치 및 실행

### 필수 요구사항
- Node.js (v18 이상)
- npm 또는 yarn

### 설치 과정

1. **저장소 클론**
   ```bash
   git clone <repository-url>
   cd zogakzogak
   ```

2. **의존성 설치**
   ```bash
   npm install
   ```

3. **환경 변수 설정**
   ```bash
   # .env.local 파일 생성
   echo "GEMINI_API_KEY=your_gemini_api_key_here" > .env.local
   ```

4. **개발 서버 실행**
   ```bash
   npm run dev
   ```

5. **브라우저에서 확인**
   ```
   http://localhost:5173
   ```

### 빌드 및 배포

```bash
# 프로덕션 빌드
npm run build

# 빌드 결과 미리보기
npm run preview
```

### 🚀 GitHub Pages 자동 배포

이 프로젝트는 GitHub Actions를 통해 자동으로 GitHub Pages에 배포됩니다.

#### 설정 방법

1. **GitHub 저장소 설정**
   - GitHub 저장소의 Settings > Pages로 이동
   - Source를 "GitHub Actions"로 설정

2. **자동 배포 활성화**
   - `main` 또는 `master` 브랜치에 코드를 푸시하면 자동으로 배포됩니다
   - 배포된 사이트는 `https://yourusername.github.io/zogakzogak/`에서 확인할 수 있습니다

3. **배포 확인**
   - Actions 탭에서 배포 상태를 확인할 수 있습니다
   - 배포가 완료되면 GitHub Pages에서 사이트를 확인할 수 있습니다

#### 배포 파일 구조
```
.github/
└── workflows/
    └── deploy.yml    # GitHub Actions 워크플로우
```

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
- **스마트 분류**: 사진 자동 분류 및 태깅

## 📱 반응형 디자인

- 모바일 우선 설계
- 태블릿 및 데스크톱 지원
- 노인 친화적 UI/UX
- 직관적인 네비게이션

## 🔧 개발 스크립트

```bash
npm run dev      # 개발 서버 실행
npm run build    # 프로덕션 빌드
npm run preview  # 빌드 결과 미리보기
```

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 문의

프로젝트에 대한 문의사항이 있으시면 이슈를 생성해 주세요.

## 🚀 배포 테스트

- **배포 시간**: 2024년 12월 19일
- **배포 상태**: 테스트 중

---

<div align="center">
  <p>Made with ❤️ for better elderly care</p>
  <p>© 2024 조각조각. All rights reserved.</p>
</div>