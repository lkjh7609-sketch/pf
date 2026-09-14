# 👨‍💻 Ben Lee Portfolio

개인 포트폴리오 웹사이트 - Back-end & ABAP Developer

## 🚀 기술 스택

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Library**: React 18
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **i18n**: React Context API (한국어/영어)

### Backend
- **Database**: Supabase (PostgreSQL)
- **ORM**: Prisma
- **API**: Next.js Route Handlers

### DevOps
- **Hosting**: Vercel
- **Testing**: Jest + React Testing Library
- **Version Control**: Git + GitHub

## 📦 설치 및 실행

### 1. 저장소 클론
```bash
git clone https://github.com/lkjh7609-sketch/pf.git
cd pf
```

### 2. 의존성 설치
```bash
npm install
```

### 3. 환경 변수 설정
`.env.local` 파일 생성:
```bash
DATABASE_URL="postgresql://postgres:[PASSWORD]@[HOST]:5432/postgres"
```

### 4. 데이터베이스 설정
```bash
# Prisma 클라이언트 생성
npm run prisma:generate

# 마이그레이션 실행
npm run prisma:migrate

# 초기 데이터 추가
npm run db:seed
```

### 5. 개발 서버 실행
```bash
npm run dev
```

http://localhost:3000 접속

## 📚 문서

- [Supabase 설정 가이드](./docs/SUPABASE_SETUP.md)
- [분석 보고서](./analysis_report.md)

## 🧪 테스트

```bash
# 테스트 실행
npm test

# Watch 모드
npm run test:watch

# 커버리지
npm run test:coverage
```

## 🛠️ 주요 스크립트

```bash
npm run dev              # 개발 서버 시작
npm run build            # 프로덕션 빌드
npm run start            # 프로덕션 서버 시작
npm run lint             # ESLint 실행
npm run prisma:studio    # Prisma Studio (DB GUI)
npm run db:seed          # 데이터 시드
```

## 📁 프로젝트 구조

```
├── app/                    # Next.js App Router
│   ├── api/               # API Routes
│   │   ├── projects/      # 프로젝트 API
│   │   ├── writings/      # 글 API
│   │   └── posts/         # 게시판 API
│   ├── board/             # 게시판 페이지
│   └── layout.tsx         # 루트 레이아웃
├── components/            # React 컴포넌트
├── contexts/              # Context API (i18n)
├── data/                  # 정적 데이터 (레거시)
├── docs/                  # 문서
├── lib/                   # 유틸리티 함수
│   └── prisma.ts          # Prisma 클라이언트
├── messages/              # 다국어 메시지
├── prisma/                # Prisma 설정
│   ├── schema.prisma      # 데이터베이스 스키마
│   └── seed.ts            # 시드 스크립트
└── public/                # 정적 파일
```

## 🌟 주요 기능

- ✅ 반응형 디자인 (모바일/태블릿/데스크톱)
- ✅ 다국어 지원 (한국어/영어)
- ✅ 부드러운 애니메이션 (Framer Motion)
- ✅ 이미지 최적화 (next/image)
- ✅ SEO 최적화 (Metadata API)
- ✅ 접근성 (a11y) 지원
- ✅ 게시판 기능
- ✅ Supabase 데이터베이스 연동
- ✅ RESTful API

## 🔜 로드맵

- [ ] 프론트엔드를 API와 연결
- [ ] 관리자 대시보드 (NextAuth.js)
- [ ] 파일 업로드 (Supabase Storage)
- [ ] 댓글 기능
- [ ] 조회수 카운터
- [ ] 검색 기능

## 📄 라이센스

MIT License

## 👤 작성자

**Ben Lee (이재헌)**
- Email: javerdose@gmail.com
- Portfolio: [링크 추가 예정]

---

Built with ❤️ using Next.js and Supabase
