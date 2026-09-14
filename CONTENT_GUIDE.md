# 콘텐츠 수정 가이드

## 주요 텍스트 수정 파일

### 1. 메인 페이지 (Hero 섹션)
**파일:** `components/Hero.tsx`
- 이름: "Ben Lee"
- 직업: "Developer"
- 소개 문구: "안녕하세요. 34세 개발자입니다..."

### 2. 네비게이션
**파일:** `components/Navigation.tsx`
- 로고/이름: "Ben Lee"
- 메뉴 항목: "Projects", "Writing", "Contact"

### 3. 프로젝트 섹션
**파일:** `components/Projects.tsx`
- 제목: "Projects"
- 설명: "내가 작업한 프로젝트들"

**파일:** `data/projects.ts`
- 프로젝트 데이터 (제목, 설명, 이미지 경로, 링크)

### 4. 글/포스트 섹션
**파일:** `components/Writings.tsx`
- 제목: "Writing"
- 설명: "생각과 경험을 공유합니다"

**파일:** `data/writings.ts`
- 글 데이터 (제목, 설명, 이미지 경로, 링크)

### 5. 연락처 섹션
**파일:** `components/Contact.tsx`
- 제목: "Get In Touch"
- 설명: "프로젝트 문의나 협업 제안이 있으시면 연락주세요"
- 이메일: "javerdose@gmail.com"
- 하단 저작권: "© 2026 Ben Lee. All rights reserved."

### 6. 메타 정보 (SEO)
**파일:** `app/layout.tsx`
- 사이트 제목: "Ben Lee - Developer Portfolio"
- 설명: "34세 개발자의 포트폴리오"

## 색상 변경
**파일:** `tailwind.config.js`
- 베이지 색상 커스터마이징

## 전역 스타일
**파일:** `app/globals.css`
- 기본 폰트, 배경색 등
