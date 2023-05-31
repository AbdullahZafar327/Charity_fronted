import React, { useMemo} from "react";
import { ResponsiveLine } from "@nivo/line";
import { useTheme , Box } from "@mui/material";
import { useGetFundStatQuery } from '../../state/ApiState'
import Loader from "../../components/Loader";
import Header from '../../components/Header'

const Monthly = () => {
    const {data} = useGetFundStatQuery()
    const theme = useTheme()
    

    const [formattedData] = useMemo(()=>{
        if (!data) return [];

        const { monthlyData } = data;
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
    
        Object.values(monthlyData).forEach(({month, totalRaising, totalFundUnits}) =>{

                totalRaisingLine.data = [
                    ...totalRaisingLine.data,
                    { x: month, y: totalRaising },
                  ];
                  totalFundUnitsLine.data = [
                    ...totalFundUnitsLine.data,
                    { x: month, y: totalFundUnits },
                  ];
            });
        const formattedData = [totalRaisingLine,totalFundUnitsLine]
    
        return [formattedData]
    },[data])

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="MONTHLY FUNDS" subtitle="Chart of monthly funds"/>
      <Box height="75vh">
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
                 legend: "Monthly",
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

export default Monthly
