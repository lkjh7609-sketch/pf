# Ben Lee Portfolio

개발자의 포트폴리오 웹사이트

## 기술 스택

- **Next.js 14** - React 프레임워크
- **TypeScript** - 타입 안정성
- **Tailwind CSS** - 스타일링
- **Framer Motion** - 애니메이션

## 시작하기

### 1. 의존성 설치

```bash
npm install
```

### 2. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 열기

### 3. 프로덕션 빌드

```bash
npm run build
npm start
```

## 컨텐츠 추가하기

### 프로젝트 추가

`data/projects.ts` 파일을 편집하여 새로운 프로젝트를 추가:

```typescript
{
  id: 'unique-id',
  title: '프로젝트 제목',
  description: '프로젝트 설명',
  thumbnail: '/images/projects/thumb.jpg',
  images: [
    '/images/projects/image1.jpg',
    '/images/projects/image2.jpg',
  ],
  link: 'https://프로젝트-링크.com', // 선택사항
}
```

### 글/포스트 추가

`data/writings.ts` 파일을 편집하여 새로운 글을 추가:

```typescript
{
  id: 'unique-id',
  title: '글 제목',
  description: '글 설명',
  thumbnail: '/images/writings/thumb.jpg',
  images: [
    '/images/writings/image1.jpg',
  ],
  link: 'https://글-링크.com', // 선택사항
}
```

### 이미지 추가

이미지를 `public/images/` 폴더에 추가:
- 프로젝트 이미지: `public/images/projects/`
- 글 이미지: `public/images/writings/`

## 배포하기

### Vercel (권장)

1. [Vercel](https://vercel.com)에 가입
2. GitHub 저장소 연결
3. 자동 배포 완료

### Railway

```bash
npm install -g @railway/cli
railway login
railway init
railway up
```

### Render

1. [Render](https://render.com)에 가입
2. 새 Web Service 생성
3. GitHub 저장소 연결
4. Build Command: `npm install && npm run build`
5. Start Command: `npm start`

## 디자인 컬러

- **배경**: 흰색 (#FFFFFF)
- **베이지**: #F5F1E8, #E8DCC4, #D4C4A8
- **텍스트**: 검정색 (#000000)

## 문의

javerdose@gmail.com
