import { useState } from "react"
import {  useDispatch, useSelector } from "react-redux"
import { loginThunk } from "../../store/auth.store"
import { useNavigate } from "react-router-dom"
import { ROUTES } from "../../constant/routePaths"

export const AdminLogin = () => {
  const [email,setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { loading, error } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = async(e)=>{
    e.preventDefault()
    const result = await dispatch(loginThunk({
      email,
      password,
      role:'admin'
    }))
    if(loginThunk.fulfilled.match(result)){
    navigate(ROUTES.ADMIN_DASHBOARD)
    }
  }


  return (
    <>
     <div className="min-h-screen bg-bg flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-panel border border-border rounded-lg p-8">
        <h1 className="text-2xl font-bold text-text mb-1">
          Hire<span className="text-primary">Board</span>
        </h1>
        <p className="text-muted text-sm mb-6">Admin sign in</p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm text-muted mb-1.5">Email</label>
            <input
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
              type="email"
              className="w-full bg-bg border border-border rounded-md px-3 py-2 text-text text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="admin@hireboard.com"
            />
          </div>

          <div>
            <label className="block text-sm text-muted mb-1.5">Password</label>
            <input
            value={password}
              onChange={(e)=>setPassword(e.target.value)}
              type="password"
              className="w-full bg-bg border border-border rounded-md px-3 py-2 text-text text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="••••••••"
            />
          </div>
         {error && <p className="text-danger text-sm">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white text-sm font-medium py-2.5 rounded-md hover:opacity-90 transition-opacity"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
    </>
  )
}
