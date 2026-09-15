'use client'

import { signOut } from 'next-auth/react'
import { useState } from 'react'
import Link from 'next/link'
import ProjectsManager from './ProjectsManager'
import WritingsManager from './WritingsManager'
import PostsManager from './PostsManager'

type Tab = 'projects' | 'writings' | 'posts'

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>('posts')

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-8">
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <nav className="flex gap-4">
              <Link href="/" className="text-sm text-gray-600 hover:text-black">
                View Site
              </Link>
            </nav>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="px-4 py-2 text-sm text-gray-600 hover:text-black"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="bg-white rounded-lg shadow">
          <div className="border-b border-gray-200">
            <nav className="flex gap-8 px-6">
              {(['posts', 'projects', 'writings'] as Tab[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab
                      ? 'border-black text-black'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab === 'posts' ? 'Board Posts' : tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'posts' && <PostsManager />}
            {activeTab === 'projects' && <ProjectsManager />}
            {activeTab === 'writings' && <WritingsManager />}
          </div>
        </div>
      </div>
    </div>
  )
}
