'use client'

import { useEffect } from 'react'

export default function BoardError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Board error:', error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <div className="text-6xl mb-6">📋</div>
        <h2 className="text-2xl font-light mb-4">게시판을 불러올 수 없습니다</h2>
        <p className="text-gray-500 font-light mb-8">
          게시판 데이터를 불러오는 중 문제가 발생했습니다.
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={reset}
            className="px-8 py-3 border border-black text-sm font-light
                       hover:bg-black hover:text-white transition-all duration-300"
          >
            다시 시도
          </button>
          <a
            href="/"
            className="px-8 py-3 bg-black text-white text-sm font-light
                       hover:bg-gray-800 transition-all duration-300"
          >
            홈으로
          </a>
        </div>
      </div>
    </div>
  )
}
