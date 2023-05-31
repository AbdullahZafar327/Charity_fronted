import React from 'react'
import Header from '../../components/Header'
import{
    Box,
    useTheme
} from '@mui/material'
import { useGetDonorsQuery } from '../../state/ApiState'
import {DataGrid} from '@mui/x-data-grid'
import { themeSettings } from '../../themes'
import Loader from '../../components/Loader'

const columns = [
    {
        field:'_id',
        headerName:' ID',
        flex: 1
    },
    {
        field:'name',
        headerName:' Name',
        flex: 0.5
    },
    {
        field:'email',
        headerName:'Email',
        flex: 1
    },
    {
        field:'phoneNumber',
        headerName:'Phone Number',
        flex: 0.5,
        renderCell: (params) =>{
            return params.value.replace(/^(\d{3})(\d{3})(\d{4})/, "($1)$2-$3")
        }
    },
    {
        field:'country',
        headerName:'Country',
        flex: 0.4
    },
    {
        field:'occupation',
        headerName:'Occupation',
        flex: 1
    },
    {
        field:'role',
        headerName:'Role',
        flex: 0.5
    },
]

const Donors = () => {
    const {data , isLoading} =useGetDonorsQuery();
    const theme = useTheme()
  return (
    <Box m="1.5rem 2.5rem">
        <Header title="DONORS" subtitle="List of Donors"/> 
        <Box
        mt="40px"
        height="75vh"
        >
            {!isLoading ? (
                <DataGrid
                loading={isLoading || !data}
                rows={data || []}
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

export default Donors
