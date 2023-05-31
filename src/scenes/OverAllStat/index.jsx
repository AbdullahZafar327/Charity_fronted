import React,{useState} from 'react'
import { FormControl, InputLabel,MenuItem, Box , Select } from '@mui/material'

import Header from '../../components/Header'
import OverViewChart from '../../components/OverViewChart'

const OverAllStat = () => {
    const [view, setView] = useState("Raising")
    
  return (
    <Box m="1.5rem 2.5rem">
        <Header title="OVERVIEW" subtitle="Overview of Funds"/>
        <Box height="75vh">
           <FormControl sx={{ mt:"1rem"}}>
            <InputLabel>View</InputLabel>
            <Select value={view} label="View" onChange={(e)=>setView(e.target.value)}>
              <MenuItem value="Raising">Raisings</MenuItem>
              <MenuItem value="funds">Funds</MenuItem>
            </Select>
           </FormControl>
           <OverViewChart view={view} />
        </Box>
    </Box>
  )
}

export default OverAllStat
