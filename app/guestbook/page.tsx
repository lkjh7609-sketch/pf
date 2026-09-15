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
              className="text-lg font-semibold cursor-pointer"
            >
              Ben Lee
            </motion.span>
          </Link>
          <Link href="/">
            <motion.span
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-sm font-medium hover:text-beige-dark transition-colors cursor-pointer"
            >
              Home
            </motion.span>
          </Link>
        </div>
      </motion.nav>

      <div className="max-w-4xl mx-auto px-6 pt-24 pb-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4">Guestbook</h1>
          <p className="text-gray-600">응원의 메시지를 남겨주세요!</p>
        </motion.div>

        {/* Write Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-beige-light p-6 rounded-lg mb-12"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Name *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-black"
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
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-black resize-none"
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
              <label htmlFor="isPublic" className="text-sm text-gray-700">
                공개 (체크 해제 시 관리자만 볼 수 있습니다)
              </label>
            </div>

            <div className="flex items-center gap-4">
              <button
                type="submit"
                disabled={submitting}
                className="px-6 py-2 bg-black text-white rounded hover:bg-gray-800 disabled:opacity-50"
              >
                {submitting ? 'Submitting...' : 'Submit'}
              </button>

              {submitStatus === 'success' && (
                <span className="text-green-600 text-sm">
                  ✓ 메시지가 제출되었습니다! 관리자 승인 후 표시됩니다.
                </span>
              )}

              {submitStatus === 'error' && (
                <span className="text-red-600 text-sm">
                  ✗ 제출에 실패했습니다. 다시 시도해주세요.
                </span>
              )}
            </div>
          </form>
        </motion.div>

        {/* Entries List */}
        <div>
          <h2 className="text-2xl font-semibold mb-6">Messages ({entries.length})</h2>

          {loading ? (
            <div className="text-center py-12 text-gray-500">Loading...</div>
          ) : entries.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p className="text-4xl mb-4">📝</p>
              <p>아직 메시지가 없습니다. 첫 번째 메시지를 남겨주세요!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {entries.map((entry, index) => (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white border border-gray-200 rounded-lg p-6"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-lg">{entry.name}</span>
                      {entry.isPublic && (
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                          Public
                        </span>
                      )}
                    </div>
                    <span className="text-sm text-gray-500">
                      {new Date(entry.createdAt).toLocaleDateString('ko-KR')}
                    </span>
                  </div>
                  <p className="text-gray-700 whitespace-pre-wrap">{entry.message}</p>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
