import { Pencil, Plus, Search, Trash2 } from "lucide-react"

export const JobListingAdmin = () => {
  const dummyJobs = [
    { id: 1, title: 'Frontend Developer', category: 'Engineering', experienceLevel: 'Mid', status: 'active' },
    { id: 2, title: 'UI/UX Designer', category: 'Design', experienceLevel: 'Entry', status: 'active' },
    { id: 3, title: 'Sales Executive', category: 'Sales', experienceLevel: 'Senior', status: 'closed' },
  ]
  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-text mb-1">Jobs</h1>
          <p className="text-muted text-sm">Manage job postings</p>
        </div>
        <button className="flex items-center gap-2 bg-primary text-white text-sm font-medium px-4 py-2.5 rounded-md hover:opacity-90 transition-opacity">
          <Plus size={18} />
          Create Job
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-4">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input
            type="text"
            placeholder="Search jobs..."
            className="w-full bg-panel border border-border rounded-md pl-9 pr-3 py-2 text-text text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <select className="bg-panel border border-border rounded-md px-3 py-2 text-text text-sm focus:outline-none focus:ring-2 focus:ring-primary">
          <option value="">All Categories</option>
          <option value="Engineering">Engineering</option>
          <option value="Design">Design</option>
          <option value="Sales">Sales</option>
        </select>

        <select className="bg-panel border border-border rounded-md px-3 py-2 text-text text-sm focus:outline-none focus:ring-2 focus:ring-primary">
          <option value="">All Levels</option>
          <option value="Entry">Entry</option>
          <option value="Mid">Mid</option>
          <option value="Senior">Senior</option>
        </select>
      </div>

      <div className="bg-panel border border-border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-muted text-left">
              <th className="px-4 py-3 font-medium">Title</th>
              <th className="px-4 py-3 font-medium">Category</th>
              <th className="px-4 py-3 font-medium">Experience</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {dummyJobs.map((job) => (
              <tr key={job.id} className="border-b border-border last:border-0">
                <td className="px-4 py-3 text-text">{job.title}</td>
                <td className="px-4 py-3 text-muted">{job.category}</td>
                <td className="px-4 py-3 text-muted">{job.experienceLevel}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      job.status === 'active'
                        ? 'bg-success/10 text-success'
                        : 'bg-danger/10 text-danger'
                    }`}
                  >
                    {job.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2">
                    <button className="p-1.5 rounded-md text-muted hover:bg-bg hover:text-primary transition-colors">
                      <Pencil size={16} />
                    </button>
                    <button className="p-1.5 rounded-md text-muted hover:bg-bg hover:text-danger transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between mt-4">
        <p className="text-muted text-sm">Showing 1-3 of 3 jobs</p>
        <div className="flex gap-1">
          <button className="px-3 py-1.5 rounded-md border border-border text-muted text-sm hover:bg-panel">
            Previous
          </button>
          <button className="px-3 py-1.5 rounded-md bg-primary text-white text-sm">1</button>
          <button className="px-3 py-1.5 rounded-md border border-border text-muted text-sm hover:bg-panel">
            Next
          </button>
        </div>
      </div>

    </>
  )
}

