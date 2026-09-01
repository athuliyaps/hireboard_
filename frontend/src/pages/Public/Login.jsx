import { Link, useNavigate } from 'react-router-dom'
import { ROUTES } from '../../constant/routePaths'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginThunk } from '../../store/auth.store'

export const Login = () => {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {loading,error} = useSelector((state)=>state.auth)

    const handleSubmit =async (e)=>{
    e.preventDefault()
      const result = await dispatch(loginThunk({email,password,role:'user'}))
      if(loginThunk.fulfilled.match(result))
        navigate(ROUTES.HOME)
    }
  return (
      <>
        <div className='min-h-screen flex items-center justify-center px-4 py-16'>
            <div className='w-full max-w-sm bg-panel border border-border rounded-lg p-8'>
                <h1 className='text-2xl font-bold text-text mb-1'>
                    Hire <span className='text-primary'>Board</span>
                </h1>
                <p className='text-muted text-sm mb-6'>Sign in</p>
                <form onSubmit={handleSubmit} className='space-y-4'>
    
                <div>
                    <label className='block text-sm text-muted mb-1.5'>Email</label>
                    <input
                    type='email'
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    className='w-full bg-bg border border-border rounded-md px-3 py-2 text-text text-sm focus:outline-none focus:ring-2 focus:ring-primary'
                    placeholder='login@gmail.com'
                    />
                </div>
    
                <div>
                <label className='block text-sm text-muted mb-1.5'>
                 Password
                </label>
                <input
                type='password'
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                placeholder='*****'
                className='w-full bg-bg border border-border rounded-md px-3 py-2 text-text text-sm focus:outline-none focus:ring-2 focus:ring-primary'
                />
                </div>
           {
            error && <p className='text-danger text-sm'>{error}</p>
           }
               <button
               type='submit'
               disabled={loading}
               className='w-full bg-primary text-white text-sm font-medium py-2.5 rounded-md hover:opacity-90 transition-opacity disabled:opacity-50'
               >
                {loading ?'Signing in..':'Sign In'}
               </button>
             </form>
    
    <p className='text-muted text-sm text-center mt-4'>
        Don't have an account?{''}
        <Link to={ROUTES.ADMIN_REGISTER}
        className="text-primary hover:underline"
        >
            Register
        </Link>
    </p>
            </div>
        </div>
        </>
  )
}
