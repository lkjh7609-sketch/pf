'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

interface GuestbookEntry {
  id: string
  name: string
  message: string
  isPublic: boolean
  approved: boolean
  createdAt: string
}

export default function GuestbookPage() {
  const [entries, setEntries] = useState<GuestbookEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    name: '',
    message: '',
    isPublic: true,
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  useEffect(() => {
    fetchEntries()
  }, [])

  async function fetchEntries() {
    try {
      const response = await fetch('/api/guestbook')
      if (!response.ok) throw new Error('Failed to fetch entries')
      const data = await response.json()
      setEntries(data)
    } catch (error) {
      console.error('Error fetching guestbook:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.message) return

    setSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('/api/guestbook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!response.ok) throw new Error('Failed to submit')

      setSubmitStatus('success')
      setFormData({ name: '', message: '', isPublic: true })
      setTimeout(() => setSubmitStatus('idle'), 5000)
    } catch (error) {
      console.error('Error submitting:', error)
      setSubmitStatus('error')
      setTimeout(() => setSubmitStatus('idle'), 5000)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md shadow-sm"
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/">
            <motion.span
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-xl font-bold hover:opacity-70 transition-opacity cursor-pointer"
            >
              Ben Lee
            </motion.span>
          </Link>
          <div className="flex gap-8 items-center">
            <Link href="/">
              <motion.span
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-sm hover:text-beige-dark transition-colors cursor-pointer"
              >
                Home
              </motion.span>
            </Link>
            <span className="text-sm text-beige-dark cursor-default">
              Guestbook
            </span>
          </div>
        </div>
      </motion.nav>

      <div className="max-w-4xl mx-auto px-6 pt-24 pb-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h1 className="text-2xl md:text-3xl font-light text-black mb-3">Guestbook</h1>
          <div className="w-12 h-px bg-gray-300 mx-auto mb-3"></div>
          <p className="text-sm text-gray-500 font-light">응원의 메시지를 남겨주세요!</p>
        </motion.div>

        {/* Write Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-beige-light p-6 md:p-8 rounded-lg mb-10"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Name *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-black text-sm"
                placeholder="Your name"
                required
                disabled={submitting}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Message *</label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-black resize-none text-sm"
                placeholder="Leave your message..."
                required
                disabled={submitting}
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="isPublic"
                checked={formData.isPublic}
                onChange={(e) => setFormData({ ...formData, isPublic: e.target.checked })}
                className="w-4 h-4"
                disabled={submitting}
              />
              <label htmlFor="isPublic" className="text-xs text-gray-600 font-light">
                공개 (체크 해제 시 관리자만 볼 수 있습니다)
              </label>
            </div>

            <div className="flex items-center gap-4">
              <button
                type="submit"
                disabled={submitting}
                className="px-8 py-3 bg-black text-white text-sm font-light
                           hover:bg-gray-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? 'Submitting...' : 'Submit'}
              </button>

              {submitStatus === 'success' && (
                <span className="text-green-600 text-xs font-light">
                  ✓ 메시지가 제출되었습니다! 관리자 승인 후 표시됩니다.
                </span>
              )}

              {submitStatus === 'error' && (
                <span className="text-red-600 text-xs font-light">
                  ✗ 제출에 실패했습니다. 다시 시도해주세요.
                </span>
              )}
            </div>
          </form>
        </motion.div>

        {/* Entries List */}
        <div>
          <h2 className="text-lg font-light text-black mb-4">Messages ({entries.length})</h2>
          <div className="w-12 h-px bg-gray-300 mb-6"></div>

          {loading ? (
            <div className="text-center py-12">
              <div className="w-6 h-6 border-2 border-black/20 border-t-black rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-sm text-gray-400 font-light">Loading...</p>
            </div>
          ) : entries.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <p className="text-2xl mb-3">📝</p>
              <p className="text-sm font-light">아직 메시지가 없습니다. 첫 번째 메시지를 남겨주세요!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {entries.map((entry, index) => (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white border border-gray-200 rounded-lg p-5 hover:border-beige-dark/50 transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">{entry.name}</span>
                      {entry.isPublic && (
                        <span className="text-xs bg-beige-light text-gray-600 px-2 py-0.5 rounded">
                          Public
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-gray-400 font-light">
                      {new Date(entry.createdAt).toLocaleDateString('ko-KR')}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 font-light whitespace-pre-wrap">{entry.message}</p>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
