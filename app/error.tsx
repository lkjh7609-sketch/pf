'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Application error:', error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <div className="text-6xl mb-6">⚠️</div>
        <h2 className="text-2xl font-light mb-4">문제가 발생했습니다</h2>
        <p className="text-gray-500 font-light mb-8">
          페이지를 불러오는 중 오류가 발생했습니다.
          <br />
          잠시 후 다시 시도해주세요.
        </p>
        <button
          onClick={reset}
          className="px-8 py-3 border border-black text-sm font-light
                     hover:bg-black hover:text-white transition-all duration-300"
        >
          다시 시도
        </button>
      </div>
    </div>
  )
}
