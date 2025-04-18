import React from 'react'
import Logo from '../logo/index'
import SidebarMenu from './menu'
function Sidebar() {
  return (
    <div className='w-[244px]'>
      <Logo/>
      <SidebarMenu/>
    </div>
  )
}

export default Sidebar