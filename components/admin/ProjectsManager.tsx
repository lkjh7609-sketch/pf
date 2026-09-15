'use client'

export default function ProjectsManager() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Manage Projects</h2>
        <button className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800">
          Create New Project
        </button>
      </div>
      <div className="text-gray-500 text-center py-12">
        Projects CRUD interface coming soon...
      </div>
    </div>
  )
}
