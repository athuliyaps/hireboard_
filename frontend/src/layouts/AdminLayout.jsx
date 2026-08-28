import { SideBar } from '../components/SideBar'
import { Outlet } from 'react-router-dom'

export const AdminLayout = () => {
  return (
    <>
    <div className='flex bg-bg min-h-screen'>
<SideBar/>
<main className='flex-1 p-8'>
    <Outlet/>
</main>
    </div>
    </>
  )
}
