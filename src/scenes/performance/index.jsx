import React from 'react'
import {Box , useTheme } from '@mui/material'
import { useGetPerformanceStatQuery } from '../../state/ApiState'
import Header from '../../components/Header'
import Loader from '../../components/Loader'
import { DataGrid } from '@mui/x-data-grid'
import { useSelector } from 'react-redux'


const columns = [
  {
      field:'_id',
      headerName:' ID',
      flex: 1
  },
  {
      field:'userId',
      headerName:' User ID',
      flex: 1
  },
  {
      field:'createdAt',
      headerName:'CreatedAt',
      flex: 1
  },
  {
      field:'funds',
      headerName:'# of Funds',
      flex: 0.5,
      sortable:false,
      renderCell : (params) => params.value.length
  },
  {
      field:'cost',
      headerName:'Cost',
      flex: 1,
      renderCell : (params) => `${Number(params.value).toFixed(2)}`
  },
 
]

const Performance = () => {
    const theme = useTheme() ;
    const userId = useSelector((state) => state.global.userId)
    const { data  , isLoading} = useGetPerformanceStatQuery(userId)
    console.log(data)
  return (
    <Box m="1.5rem 2.5rem">
    <Header title="PERFORMANCE" subtitle="Track your Performance"/>
    <Box
      mt="40px"
      height="75vh"
      >
          {!isLoading ? (
              <DataGrid
              loading={isLoading || !data}
              rows={ (data && data.funds) || []}
              getRowId={(row) =>row._id}
              columns={columns}
              />
          ):(
              <Loader/>
          )}
      </Box>
 </Box>
  )
}

export default Performance
