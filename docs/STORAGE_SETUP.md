# 📸 Supabase Storage 설정 가이드

이미지 업로드 기능을 사용하려면 Supabase Storage를 설정해야 합니다.

## 1. Supabase Storage Bucket 생성

1. **Supabase Dashboard** 접속 (https://supabase.com/dashboard)
2. 프로젝트 선택
3. **Storage** 메뉴 클릭
4. **New Bucket** 클릭
5. Bucket 설정:
   - Name: `images`
   - Public bucket: ✅ **체크** (공개 접근 허용)
   - Create bucket 클릭

## 2. 환경 변수 설정

### 로컬 개발 (.env.local):
```bash
NEXT_PUBLIC_SUPABASE_URL="https://bjxatvkmajmicdamrjam.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
```

**ANON KEY 찾기:**
1. Supabase Dashboard → Settings → API
2. **Project API keys** 섹션
3. `anon` `public` 키 복사

### Vercel 배포:
1. Vercel Dashboard → Settings → Environment Variables
2. 다음 변수 추가:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Redeploy

## 3. Storage 정책 설정 (선택사항)

기본적으로 Public bucket은 읽기가 가능하지만, 업로드를 제한하려면:

1. **Storage** → **Policies** → `images` bucket 선택
2. **New Policy** 클릭
3. **Insert** 정책 추가:
   ```sql
   -- 모든 인증된 사용자 허용
   CREATE POLICY "Allow authenticated uploads"
   ON storage.objects FOR INSERT
   TO authenticated
   WITH CHECK (bucket_id = 'images');
   ```

## 4. 이미지 업로드 사용법

### Admin Dashboard에서:

1. `/admin` 로그인
2. **Projects** 또는 **Writings** 탭
3. Create/Edit 폼에서:
   - **"Upload Thumbnail"** 버튼 클릭
   - 이미지 선택 → 자동 업로드
   - URL이 자동으로 입력됨
   - 또는 직접 URL 입력 가능

### 지원 형식:
- JPG, PNG, GIF, WebP
- 최대 크기: 50MB (Supabase Free tier)

## 5. 업로드된 이미지 경로

업로드된 이미지는 다음 형식으로 저장됩니다:
```
https://[PROJECT-REF].supabase.co/storage/v1/object/public/images/uploads/[timestamp]-[random].[ext]
```

## 6. 트러블슈팅

### "Failed to upload file" 오류:
- Bucket이 `images`로 생성되었는지 확인
- Bucket이 Public으로 설정되었는지 확인
- ANON KEY가 올바른지 확인

### CORS 오류:
- Supabase는 자동으로 CORS를 허용합니다
- 문제가 있다면 Supabase Dashboard → Settings → API 확인

### 이미지가 보이지 않음:
- Bucket이 Public인지 확인
- URL이 올바른지 확인
- 브라우저 개발자 도구에서 네트워크 탭 확인
