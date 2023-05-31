import React, { useMemo ,useState } from "react";
import { ResponsiveLine } from "@nivo/line";
import { useTheme , Box } from "@mui/material";
import { useGetFundStatQuery } from '../../state/ApiState'
import Loader from "../../components/Loader";
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import Header from '../../components/Header'

const Daily = () => {
    const [startDate, setStartDate] = useState(new Date("2021-02-01"))
    const [endDate, setEndDate] = useState(new Date("2021-03-01"))
    const {data} = useGetFundStatQuery()
    const theme = useTheme()
    

    const [formattedData] = useMemo(()=>{
        if (!data) return [];

        const { dailyData } = data;
        const totalRaisingLine = {
          id: "totalRaising",
          color: theme.palette.secondary.main,
          data: [],
        };
        const totalFundUnitsLine = {
          id: "totalFundUnits",
          color: theme.palette.secondary[600],
          data: [],
        };
    
        Object.values(dailyData).forEach(({date, totalRaising, totalFundUnits}) =>{
            const formattedData =  new Date(date) ;
            if(formattedData >= startDate && formattedData <= endDate){
                const splitDate = date.substring(date.indexOf("-") + 1)
                totalRaisingLine.data = [
                    ...totalRaisingLine.data,
                    { x: splitDate, y: totalRaising },
                  ];
                  totalFundUnitsLine.data = [
                    ...totalFundUnitsLine.data,
                    { x: splitDate, y: totalFundUnits },
                  ];
            }
        }
         
        );
        const formattedData = [totalRaisingLine,totalFundUnitsLine]
    
        return [formattedData]
    },[data,startDate,endDate])

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="DAILY FUNDS" subtitle="Chart of Daily funds"/>
      <Box height="75vh">
         <Box display="flex" justifyContent="flex-end">
            <Box>
             <DatePicker
             selected={startDate}
             onChange={(date) => setStartDate(date)}
             selectsStart
             startDate={startDate}
             endDate={endDate}
             />  
            </Box>
            <Box>
             <DatePicker
             selected={endDate}
             onChange={(date) => setEndDate(date)}
             selectsStart
             startDate={startDate}
             endDate={endDate}
             minDate={startDate}
             />
            </Box>
         </Box> 
         {data ? (
             <ResponsiveLine
             data={formattedData}
             theme={{
                 axis:{
                   domain:{
                     line:{
                       stroke:theme.palette.secondary[200]
                     }
                   },
                   legend:{
                   text:{
                     fill:theme.palette.secondary[200]
                   }
                   },
                   ticks:{
                     line:{
                       stroke: theme.palette.secondary[200],
                       strokeWidth:1
                     }
                   },
                   text:{
                     fill:theme.palette.secondary[200]}
                   },
                   legends:{
                     text:{
                       fill: theme.palette.secondary[200]
                     }
                   },
                   tooltip:{
                    container:{
                     color: theme.palette.primary.main
                    }
                   }
                 }}
             
             margin={{ top: 50, right: 50, bottom: 70, left: 60 }}
             xScale={{ type: 'point' }}
             yScale={{
                 type: 'linear',
                 min: 'auto',
                 max: 'auto',
                 stacked: false,
                 reverse: false
             }}
             curve="catmullRom"
             axisTop={null}
             axisRight={null}
             axisBottom={{
                 tickSize: 5,
                 tickPadding: 5,
                 tickRotation: 90,
                 legend: "Daily",
                 legendOffset: 60,
                 legendPosition: 'middle'
             }}
             axisLeft={{
                 tickSize: 5,
                 tickPadding: 5,
                 tickRotation: 0,
                 legend:"Total",
                 legendOffset: -50,
                 legendPosition: 'middle'
             }}
             enableGridX={false}
             enableGridY={false}
             pointSize={10}
             pointColor={{ theme: 'background' }}
             pointBorderWidth={2}
             pointBorderColor={{ from: 'serieColor' }}
             pointLabelYOffset={-12}
             useMesh={true}
             legends={
                 [
                 {
                     anchor: 'top-right',
                     direction: 'column',
                     justify: false,
                     translateX: 50,
                     translateY: 0,
                     itemsSpacing: 0,
                     itemDirection: 'left-to-right',
                     itemWidth: 80,
                     itemHeight: 20,
                     itemOpacity: 0.75,
                     symbolSize: 12,
                     symbolShape: 'circle',
                     symbolBorderColor: 'rgba(0, 0, 0, .5)',
                     effects: [
                         {
                             on: 'hover',
                             style: {
                                 itemBackground: 'rgba(0, 0, 0, .03)',
                                 itemOpacity: 1
                             }
                         }
                     ]
                 }
             ]}
         />
         ):(
            <Loader/>
         )}
      </Box>
    </Box>
  )
}

export default Daily
