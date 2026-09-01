import { Link, useNavigate } from 'react-router-dom'
import { ROUTES } from '../../constant/routePaths'
import { useState } from 'react'
import { register } from '../../services/authService'

export const Register = () => {
    const [formData, setFormData] = useState({
        name:'',
        email:'',
        password:''
    })
    const [error,setError] = useState('')
    const [loading,setLoading] = useState(false)
    const navigate = useNavigate()

    const handleChange = (e)=>{
        setFormData((prev)=>({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = async (e)=>{
        e.preventDefault()
        setError('')
        setLoading(true)
        try{
             await register(formData)
            alert('Registeration sucessful! Please sign in.')
            navigate(ROUTES.USER_LOGIN)

        }catch(err){
         setError(err.response?.data?.message || 'Registeration failed')
        }finally{
            setLoading(false)
        }
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
                <label className='block text-sm text-muted mb-1.5'>Name</label>
                <input
                type='text'
                value={formData.name}
                name='name'
                onChange={handleChange}
                className='w-full bg-bg border border-border rounded-md px-3 py-2 text-text text-sm focus:outline-none focus:ring-2 focus:ring-primary'
                placeholder='Enter full name'
                />
                </div>
        
                 <div>
                <label className='block text-sm text-muted mb-1.5'>Email</label>
                <input
                type='email'
                name='email'
                value={formData.email}
                onChange={handleChange}
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
                name='password'
                value={formData.password}
                onChange={handleChange}
                placeholder='*****'
                className='w-full bg-bg border border-border rounded-md px-3 py-2 text-text text-sm focus:outline-none focus:ring-2 focus:ring-primary'
                />
                </div>
            {error && <p className="text-danger text-sm">{error}</p>}

        
            <button
            type='submit'
            disabled={loading}
            className='w-full bg-primary text-white text-sm font-medium py-2.5 rounded-md hover:opacity-90 transition-opacity disabled:opacity-50'
            >

             {loading ? 'Creating account...' : 'Register'}
 
            </button>
            </form>
        
        <p className='text-muted text-sm text-center mt-4'>
            Already have an account ?{''}
            <Link to={ROUTES.USER_LOGIN}
            className="text-primary hover:underline"
            >
            Sign In
            </Link>
        </p>
            </div>
            </div>
    </>
  )
}
