import { SideBar } from '../components/SideBar'
import { Outlet } from 'react-router-dom'

export const AdminLayout = () => {
  return (
    <>
    <div className='flex bg-bg min-h-screen w-full overflow-x-hidden'>
<SideBar/>
<main className='flex-1 p-8 min-w-0 overflow-x-auto'>
    <Outlet/>
</main>
    </div>
    </>
  )
}
