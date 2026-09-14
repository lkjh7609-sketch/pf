# 🗄️ Supabase + Prisma 백엔드 설정 가이드

## 📋 개요

이 프로젝트는 Supabase PostgreSQL 데이터베이스와 Prisma ORM을 사용하여 백엔드를 구축합니다.

## 🚀 설정 단계

### 1. Supabase 데이터베이스 연결

1. [Supabase 대시보드](https://supabase.com/dashboard)에 로그인
2. 프로젝트 선택 (또는 새 프로젝트 생성)
3. **Settings** → **Database** 메뉴로 이동
4. **Connection string** 섹션에서 **URI** 복사

### 2. 환경 변수 설정

`.env.local` 파일을 열고 Supabase 연결 문자열을 추가:

```bash
DATABASE_URL="postgresql://postgres.[PROJECT-REF]:[YOUR-PASSWORD]@aws-0-ap-northeast-2.pooler.supabase.com:6543/postgres"
```

**주의**: `.env.local` 파일은 절대 Git에 커밋하지 마세요!

### 3. Prisma 클라이언트 생성

```bash
npm run prisma:generate
```

### 4. 데이터베이스 마이그레이션

```bash
npm run prisma:migrate
```

마이그레이션 이름을 입력하라는 프롬프트가 나타나면:
```
Enter a name for the new migration: › init
```

### 5. 초기 데이터 추가 (Seed)

```bash
npm run db:seed
```

이 명령은:
- 기존 `data/projects.ts`의 프로젝트 데이터를 DB로 마이그레이션
- 기존 `data/writings.ts`의 글 데이터를 DB로 마이그레이션
- 샘플 게시판 글 1개 생성

## 📊 데이터베이스 스키마

### Projects 테이블
```prisma
model Project {
  id          String   @id @default(cuid())
  title       String
  description String
  thumbnail   String
  images      String[] // 이미지 URL 배열
  link        String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

### Writings 테이블
```prisma
model Writing {
  id          String   @id @default(cuid())
  title       String
  description String
  thumbnail   String
  images      String[] // 이미지 URL 배열
  link        String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

### Posts 테이블 (게시판)
```prisma
model Post {
  id        String   @id @default(cuid())
  title     String
  author    String
  content   String   @db.Text
  files     Json?    // 첨부파일 정보 (JSON 배열)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

## 🔌 API 엔드포인트

### Projects
- `GET /api/projects` - 모든 프로젝트 조회
- `POST /api/projects` - 새 프로젝트 생성

### Writings
- `GET /api/writings` - 모든 글 조회
- `POST /api/writings` - 새 글 생성

### Posts (게시판)
- `GET /api/posts` - 모든 게시글 조회
- `POST /api/posts` - 새 게시글 생성

## 🛠️ 유용한 명령어

```bash
# Prisma Studio 실행 (데이터베이스 GUI)
npm run prisma:studio

# Prisma 클라이언트 재생성
npm run prisma:generate

# 새 마이그레이션 생성
npm run prisma:migrate

# 데이터 다시 시드
npm run db:seed
```

## 🔐 Vercel 배포 시 환경 변수 설정

1. Vercel 대시보드에서 프로젝트 선택
2. **Settings** → **Environment Variables**
3. `DATABASE_URL` 추가 (Supabase 연결 문자열)
4. 재배포

## 📝 다음 단계

1. ✅ Supabase 데이터베이스 연결
2. ✅ Prisma 스키마 작성
3. ✅ API Routes 생성
4. ⬜ 프론트엔드를 API와 연결
5. ⬜ 관리자 대시보드 구축 (Phase 3)
6. ⬜ 파일 업로드 기능 (Supabase Storage)

## 🐛 트러블슈팅

### 연결 오류
- Supabase 프로젝트가 활성화되어 있는지 확인
- `DATABASE_URL`이 정확한지 확인
- 비밀번호에 특수문자가 있다면 URL 인코딩 필요

### 마이그레이션 오류
```bash
# 마이그레이션 초기화
npx prisma migrate reset
```

**주의**: 이 명령은 모든 데이터를 삭제합니다!
