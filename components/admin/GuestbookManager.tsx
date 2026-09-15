'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface GuestbookEntry {
  id: string
  name: string
  message: string
  isPublic: boolean
  approved: boolean
  createdAt: string
}

export default function GuestbookManager() {
  const [entries, setEntries] = useState<GuestbookEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved'>('pending')

  useEffect(() => {
    fetchEntries()
  }, [])

  async function fetchEntries() {
    try {
      const response = await fetch('/api/guestbook/admin')
      if (!response.ok) throw new Error('Failed to fetch entries')
      const data = await response.json()
      setEntries(data)
    } catch (error) {
      console.error('Error fetching guestbook:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleApprove = async (id: string, approved: boolean) => {
    try {
      const response = await fetch(`/api/guestbook/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ approved }),
      })

      if (!response.ok) throw new Error('Failed to update')

      setEntries(entries.map(e => e.id === id ? { ...e, approved } : e))
    } catch (error) {
      console.error('Error updating entry:', error)
      alert('업데이트에 실패했습니다.')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('정말 삭제하시겠습니까?')) return

    try {
      const response = await fetch(`/api/guestbook/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) throw new Error('Failed to delete')

      setEntries(entries.filter(e => e.id !== id))
    } catch (error) {
      console.error('Error deleting entry:', error)
      alert('삭제에 실패했습니다.')
    }
  }

  const filteredEntries = entries.filter(entry => {
    if (filter === 'pending') return !entry.approved
    if (filter === 'approved') return entry.approved
    return true
  })

  if (loading) {
    return <div className="text-center py-12 text-gray-500">Loading...</div>
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Manage Guestbook</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1 text-sm rounded ${
              filter === 'all' ? 'bg-black text-white' : 'bg-gray-200'
            }`}
          >
            All ({entries.length})
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={`px-3 py-1 text-sm rounded ${
              filter === 'pending' ? 'bg-black text-white' : 'bg-gray-200'
            }`}
          >
            Pending ({entries.filter(e => !e.approved).length})
          </button>
          <button
            onClick={() => setFilter('approved')}
            className={`px-3 py-1 text-sm rounded ${
              filter === 'approved' ? 'bg-black text-white' : 'bg-gray-200'
            }`}
          >
            Approved ({entries.filter(e => e.approved).length})
          </button>
        </div>
      </div>

      {filteredEntries.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          No entries to display.
        </div>
      ) : (
        <div className="space-y-4">
          {filteredEntries.map((entry) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="border border-gray-200 rounded-lg p-4"
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                  <span className="font-semibold">{entry.name}</span>
                  {entry.isPublic ? (
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                      Public
                    </span>
                  ) : (
                    <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                      Private
                    </span>
                  )}
                  {entry.approved ? (
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                      Approved
                    </span>
                  ) : (
                    <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded">
                      Pending
                    </span>
                  )}
                </div>
                <span className="text-sm text-gray-500">
                  {new Date(entry.createdAt).toLocaleString('ko-KR')}
                </span>
              </div>

              <p className="text-gray-700 whitespace-pre-wrap mb-4">{entry.message}</p>

              <div className="flex gap-2">
                {!entry.approved ? (
                  <button
                    onClick={() => handleApprove(entry.id, true)}
                    className="px-3 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    Approve
                  </button>
                ) : (
                  <button
                    onClick={() => handleApprove(entry.id, false)}
                    className="px-3 py-1 text-sm bg-gray-500 text-white rounded hover:bg-gray-600"
                  >
                    Unapprove
                  </button>
                )}
                <button
                  onClick={() => handleDelete(entry.id)}
                  className="px-3 py-1 text-sm border border-red-300 text-red-600 rounded hover:bg-red-50"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
