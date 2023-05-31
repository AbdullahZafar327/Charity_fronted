import React,{useState} from 'react'
import {DataGrid, dataGrid} from '@mui/x-data-grid'
import {useTheme , Box} from '@mui/material'
import { useGetTransactionsQuery } from '../../state/ApiState'
import Header from '../../components/Header'
import Loader from '../../components/Loader'
import DataGridCustom from '../../components/DataGridCustom'

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

const Transactions = () => {
    const theme = useTheme()

    const [page , setPage] = useState(0)
    const [pageSize, setPageSize] = useState(20)
    const [sort, setSort] = useState({})
    const [search, setSearch] = useState("")

    const [searchInput ,setSearchInput] = useState("")

    const {data , isLoading} = useGetTransactionsQuery({
        page,
        pageSize,
        sort: JSON.stringify(sort),
        search
    })
  

  return (
   <Box m="1.5rem 2.5rem">
     <Header title="TRANSACTIONS" subtitle="Entire list of Transactions around the globe" />
     <Box height="80vh"
     sx={{
        "& .MuiButton-text" :{
            color : theme.palette.secondary[100],
            
        }
     }}
     
     >
        {!isLoading ? (
            <DataGrid
            loading={isLoading || !data}
            rows={(data && data.transactions) || []}
            getRowId={(row) =>row._id}
            columns={columns}
            page={page}
            pageSize={pageSize}
            rowsPerPageOptions={[20 , 50 , 100]}
            pagination
            paginationMode='server'
            sortingMode='server'
            onPageChange={(newPage) =>setPage(newPage)}
            onPageSizeChange={(newPageSize) =>setPageSize(newPageSize)}
            rowCount={(data && data.total) || 0}
            onSortModelChange={(newSortModel) =>setSort(...newSortModel)}
            components={{ Toolbar: DataGridCustom }}
            componentsProps={{
              toolbar: { searchInput, setSearchInput, setSearch },
            }}
           
            />
        ):(
            <Loader/>
        )}
     </Box>
   </Box>
  )
}

export default Transactions
