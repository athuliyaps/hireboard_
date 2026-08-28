export const JobForm = () => {
  return (
    <>
   <h1 className="text-2xl font-bold text-text mb-1">Create Jobs</h1>
   <p className="text-muted text-sm mb-6">Fill new job details</p>
   <form className="bg-panel border border-border rounded-lg p-6 space-y-5 max-w-2xl">
        <div>
          <label className="block text-sm text-muted mb-1.5">Job Title</label>
          <input
            type="text"
            placeholder="e.g. Frontend Developer"
            className="w-full bg-bg border border-border rounded-md px-3 py-2 text-text text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

      <div>
          <label className="block text-sm text-muted mb-1.5">Description</label>
          <textarea
            rows={4}
            placeholder="Job description..."
            className="w-full bg-bg border border-border rounded-md px-3 py-2 text-text text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-muted mb-1.5">Category</label>
            <select className="w-full bg-bg border border-border rounded-md px-3 py-2 text-text text-sm focus:outline-none focus:ring-2 focus:ring-primary">
              <option value="">Select category</option>
              <option value="Engineering">Engineering</option>
              <option value="Design">Design</option>
              <option value="Marketing">Marketing</option>
              <option value="Sales">Sales</option>
              <option value="Operations">Operations</option>
              <option value="Finance">Finance</option>
            </select>
          </div>

         <div>
            <label className="block text-sm text-muted mb-1.5">Experience Level</label>
            <select className="w-full bg-bg border border-border rounded-md px-3 py-2 text-text text-sm focus:outline-none focus:ring-2 focus:ring-primary">
              <option value="">Select level</option>
              <option value="Entry">Entry</option>
              <option value="Mid">Mid</option>
              <option value="Senior">Senior</option>
            </select>
          </div>
        </div>

      <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-muted mb-1.5">Location</label>
            <input
              type="text"
              placeholder="e.g. Kochi, India"
              className="w-full bg-bg border border-border rounded-md px-3 py-2 text-text text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

         <div>
            <label className="block text-sm text-muted mb-1.5">Salary Range</label>
            <input
              type="text"
              placeholder="e.g. 6-10 LPA"
              className="w-full bg-bg border border-border rounded-md px-3 py-2 text-text text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
     <div>
          <label className="block text-sm text-muted mb-1.5">Status</label>
          <select className="w-full bg-bg border border-border rounded-md px-3 py-2 text-text text-sm focus:outline-none focus:ring-2 focus:ring-primary">
            <option value="active">Active</option>
            <option value="closed">Closed</option>
          </select>
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            className="bg-primary text-white text-sm font-medium px-5 py-2.5 rounded-md hover:opacity-90 transition-opacity"
          >
            Save Job
          </button>
          <button
            type="button"
            className="border border-border text-muted text-sm font-medium px-5 py-2.5 rounded-md hover:bg-bg transition-colors"
          >
            Cancel
          </button>
        </div>
</form>
    </>
  )
}