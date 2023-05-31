import React ,{useState}from 'react'
import {Box , useMediaQuery} from '@mui/material'
import { Outlet } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import { useSelector } from 'react-redux'
import Sidebar from '../../components/Sidebar'
import { useGetUserQuery } from '../../state/ApiState'

const Layout = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)")
  const [isSidebarOpen , setIsSidebarOpen] = useState(true)
  const userId = useSelector((state) =>state.global.userId)
  const { data } = useGetUserQuery(userId)
  console.log(data)
                                                                                                                                                                                                                                   

  return (
    <Box display={isNonMobile ? "flex" : "block"} width='100%' height='100%'>
       <Sidebar
         user={data || {}}
         isNonMobile={isNonMobile}
         isSidebarOpen={isSidebarOpen}
         drawerWidth="250px"
         setIsSidebarOpen={setIsSidebarOpen}
        />
       <Box flexGrow={1}>
         <Navbar
         user={data || {}}
         setIsSidebarOpen={setIsSidebarOpen}
         isSidebarOpen={isSidebarOpen}
         />
         <Outlet/>
       </Box>
    </Box>
  )
}

export default Layout
                                                                                               