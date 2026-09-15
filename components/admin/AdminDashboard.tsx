'use client'

import { signOut } from 'next-auth/react'
import { useState } from 'react'
import Link from 'next/link'
import ProjectsManager from './ProjectsManager'
import WritingsManager from './WritingsManager'
import PostsManager from './PostsManager'
import GuestbookManager from './GuestbookManager'

type Tab = 'posts' | 'projects' | 'writings' | 'guestbook'

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>('posts')

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 md:py-4 flex justify-between items-center">
          <div className="flex items-center gap-4 md:gap-8">
            <h1 className="text-lg md:text-2xl font-bold">Admin Dashboard</h1>
            <nav className="flex gap-2 md:gap-4">
              <Link href="/" className="text-xs md:text-sm text-gray-600 hover:text-black">
                View Site
              </Link>
            </nav>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm text-gray-600 hover:text-black"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 md:py-6">
        <div className="bg-white rounded-lg shadow">
          <div className="border-b border-gray-200 overflow-x-auto">
            <nav className="flex gap-4 md:gap-8 px-4 md:px-6 min-w-max">
              {(['posts', 'projects', 'writings', 'guestbook'] as Tab[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-3 md:py-4 px-1 md:px-2 border-b-2 font-medium text-xs md:text-sm transition-colors whitespace-nowrap ${
                    activeTab === tab
                      ? 'border-black text-black'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab === 'posts' ? 'Board Posts' :
                   tab === 'guestbook' ? 'Guestbook' :
                   tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-4 md:p-6">
            {activeTab === 'posts' && <PostsManager />}
            {activeTab === 'projects' && <ProjectsManager />}
            {activeTab === 'writings' && <WritingsManager />}
            {activeTab === 'guestbook' && <GuestbookManager />}
          </div>
        </div>
      </div>
    </div>
  )
}
