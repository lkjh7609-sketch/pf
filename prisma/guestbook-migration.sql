-- Guestbook 테이블 생성
CREATE TABLE IF NOT EXISTS guestbook (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    message TEXT NOT NULL,
    "isPublic" BOOLEAN NOT NULL DEFAULT true,
    approved BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 인덱스 생성
CREATE INDEX IF NOT EXISTS idx_guestbook_approved ON guestbook(approved);
CREATE INDEX IF NOT EXISTS idx_guestbook_created ON guestbook("createdAt" DESC);
