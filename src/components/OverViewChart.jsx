import React, { useMemo } from "react";
import { ResponsiveLine } from "@nivo/line";
import { useTheme } from "@mui/material";
import { useGetFundStatQuery } from "../state/ApiState";
import Loader from "./Loader";

const OverViewChart = ({ isDashboard = false, view }) => {
  const theme = useTheme();
  const { data, isLoading } = useGetFundStatQuery()

  const [totalRaisingLine, totalFundUnitsLine] = useMemo(() => {
    if (!data || !data.monthlyData) return [[], []];

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

    Object.values(monthlyData).reduce(
      (acc, { month, totalRaising, totalFundUnits }) => {
        const curRaising = acc.Raising + totalRaising;
        const curFunds = acc.funds + totalFundUnits;

        totalRaisingLine.data = [
          ...totalRaisingLine.data,
          { x: month, y: curRaising },
        ];
        totalFundUnitsLine.data = [
          ...totalFundUnitsLine.data,
          { x: month, y: curFunds },
        ];
        return { Raising: curRaising, funds: curFunds };
      },
      {
        Raising: 0,
        funds: 0,
      }
    );

    return [[totalRaisingLine],[totalFundUnitsLine]]
  }, [data]); 

  if(isLoading){
    return (
        <Loader/>
    )
  }

  return (
  <ResponsiveLine
        data={view === 'Raising' ? totalRaisingLine : totalFundUnitsLine}
        theme={{
            axis:{
              domain:{
                line:{
                  stroke:theme.palette.secondary[200]
                },
               
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
              },
              
            }}
        margin={{ top: 20, right: 50, bottom: 50, left: 70 }}
        xScale={{ type: 'point' }}
        yScale={{
            type: 'linear',
            min: 'auto',
            max: 'auto',
            stacked: false,
            reverse: false
        }}
        curve="catmullRom"
        enableArea={isDashboard}
        axisTop={null}
        axisRight={null}
        axisBottom={{
            format:(v)=>{
             if(isDashboard) return v.slice(0,3);
             return v
            },
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: isDashboard ? " " : "Month",
            legendOffset: -60,
            legendPosition: 'middle'
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            axisValues:5,
            tickRotation: 0,
            legend: isDashboard ? " " : `total ${view === 'Raising' ? "Collections": "Amount"} for Year`,
            legendOffset: -60,
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
            !isDashboard ? [
            {
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 30,
                translateY: -40,
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
        ]: undefined}
    />
  );
};

export default OverViewChart;
