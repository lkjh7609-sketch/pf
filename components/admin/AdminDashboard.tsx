'use client'

import { signOut } from 'next-auth/react'
import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

type Tab = 'projects' | 'writings' | 'posts'

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>('projects')

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
              {(['projects', 'writings', 'posts'] as Tab[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab
                      ? 'border-black text-black'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'projects' && <ProjectsManager />}
            {activeTab === 'writings' && <WritingsManager />}
            {activeTab === 'posts' && <PostsManager />}
          </div>
        </div>
      </div>
    </div>
  )
}

function ProjectsManager() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Manage Projects</h2>
        <button className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800">
          Add New Project
        </button>
      </div>
      <div className="text-gray-500 text-center py-12">
        Projects management coming soon...
      </div>
    </div>
  )
}

function WritingsManager() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Manage Writings</h2>
        <button className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800">
          Add New Writing
        </button>
      </div>
      <div className="text-gray-500 text-center py-12">
        Writings management coming soon...
      </div>
    </div>
  )
}

function PostsManager() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Manage Posts</h2>
        <button className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800">
          Add New Post
        </button>
      </div>
      <div className="text-gray-500 text-center py-12">
        Posts management coming soon...
      </div>
    </div>
  )
}
