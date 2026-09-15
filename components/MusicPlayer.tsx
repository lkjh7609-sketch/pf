'use client'

import { useState, useRef, useEffect } from 'react'

interface MusicPlayerProps {
  bgmUrl: string
  title?: string
}

export default function MusicPlayer({ bgmUrl, title }: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(0.5)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
  }, [volume])

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value)
    setVolume(newVolume)
    if (audioRef.current) {
      audioRef.current.volume = newVolume
    }
  }

  return (
    <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 bg-white/90 backdrop-blur-md rounded-lg shadow-lg p-3 md:p-4 border border-gray-200 z-50">
      <audio
        ref={audioRef}
        src={bgmUrl}
        loop
        onEnded={() => setIsPlaying(false)}
      />

      <div className="flex items-center gap-2 md:gap-3">
        <button
          onClick={togglePlay}
          className="w-9 h-9 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-black text-white hover:bg-gray-800 transition-colors flex-shrink-0"
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? (
            <svg className="w-3.5 h-3.5 md:w-4 md:h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
            </svg>
          ) : (
            <svg className="w-3.5 h-3.5 md:w-4 md:h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>

        <div className="flex flex-col gap-0.5 md:gap-1">
          <span className="text-[10px] md:text-xs font-medium text-gray-700">🎵 BGM</span>
          <div className="flex items-center gap-1.5 md:gap-2">
            <svg className="w-2.5 h-2.5 md:w-3 md:h-3 text-gray-400 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" />
            </svg>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className="w-16 md:w-20 h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #000 0%, #000 ${volume * 100}%, #e5e7eb ${volume * 100}%, #e5e7eb 100%)`
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
