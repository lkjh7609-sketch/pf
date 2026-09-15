# 📧 Web3Forms Contact Form 설정 가이드

## 1. Web3Forms 계정 생성

1. **Web3Forms 웹사이트** 접속: https://web3forms.com
2. **"Get Started Free"** 클릭
3. 이메일 주소 입력 (문의 메일을 받을 이메일)
4. **Access Key** 받기

## 2. 환경 변수 설정

### 로컬 개발 (.env.local):
```bash
NEXT_PUBLIC_WEB3FORMS_KEY="your-access-key-here"
```

### Vercel 배포:
1. Vercel Dashboard → Settings → Environment Variables
2. 추가:
   - Name: `NEXT_PUBLIC_WEB3FORMS_KEY`
   - Value: Web3Forms에서 받은 Access Key
3. Redeploy

## 3. 기능

### Contact Form 필드:
- **Name**: 발신자 이름
- **Email**: 발신자 이메일 (답장용)
- **Message**: 문의 내용

### 전송 프로세스:
1. 사용자가 폼 작성
2. "Send Message" 클릭
3. Web3Forms API로 전송
4. 설정한 이메일로 수신
5. 성공/실패 메시지 표시

## 4. 이메일 형식

받게 되는 이메일:
```
Subject: Portfolio Contact from [Name]

From: [Email]
Name: [Name]
Message: [Message]
```

## 5. 무료 플랜 제한

- **월 250건** 제출 무료
- 스팸 필터링 포함
- 파일 첨부 지원 (Pro 플랜)
- 커스텀 리다이렉트 (Pro 플랜)

## 6. 추가 설정 (선택사항)

### 스팸 방지:
Web3Forms에는 기본 스팸 필터가 내장되어 있습니다.

### 자동 응답 이메일:
Pro 플랜에서 지원

### Webhook 연동:
Pro 플랜에서 Slack, Discord 등 연동 가능

## 7. 트러블슈팅

### "Failed to send message" 오류:
- Access Key가 올바른지 확인
- 네트워크 연결 확인
- Web3Forms 대시보드에서 제출 로그 확인

### 이메일이 오지 않음:
- 스팸 폴더 확인
- Web3Forms 대시보드에서 이메일 주소 확인
- 제출 로그에서 전송 상태 확인

## 8. 대안

무료 플랜으로 부족한 경우:
- **Resend**: API 기반, 월 3,000건 무료
- **SendGrid**: 월 100건 무료
- **직접 구현**: Supabase + Node Mailer

## 9. 사용 방법

1. https://web3forms.com 접속
2. 이메일 입력
3. Access Key 복사
4. `.env.local`에 추가
5. 완료!
