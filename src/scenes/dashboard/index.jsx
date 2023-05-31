import React from "react";
import Header from "../../components/Header";
import {
  Box,
  useTheme,
  Typography,
  useMediaQuery,
  Button,
} from "@mui/material";
import {
  DownloadOutlined,
  Email,
  PointOfSale,
  PersonAdd,
  Traffic,
} from "@mui/icons-material";
import FlexBetween from "../../components/FlexBetween";
import { useGetDashboardStatsQuery } from "../../state/ApiState";
import BreakDownChart from "../../components/BreakdownChart";
import OverViewChart from "../../components/OverViewChart";
import { DataGrid } from "@mui/x-data-grid";
import StatBox from "../../components/StatBox";
const columns = [
  {
    field: "_id",
    headerName: " ID",
    flex: 1,
  },
  {
    field: "userId",
    headerName: " User ID",
    flex: 1,
  },
  {
    field: "createdAt",
    headerName: "CreatedAt",
    flex: 1,
  },
  {
    field: "funds",
    headerName: "# of Funds",
    flex: 0.5,
    sortable: false,
    renderCell: (params) => params.value.length,
  },
  {
    field: "cost",
    headerName: "Cost",
    flex: 1,
    renderCell: (params) => `${Number(params.value).toFixed(2)}`,
  },
];

const Dashboard = () => {
  const theme = useTheme();
  const isNonMedium = useMediaQuery("(min-width:1200px)");
  const { data, isLoading } = useGetDashboardStatsQuery();
  console.log(data);
  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title="DASHBOARD" subtitle="Welcome to dashboard!" />
        <Box>
          <Button
            sx={{
              backgroundColor: theme.palette.secondary.light,
              color: theme.palette.background.alt,
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlined sx={{ mr: "10px" }} />
            Download Report
          </Button>
        </Box>
      </FlexBetween>

      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(12,1fr)"
        gridAutoRows="160px"
        gap="20px"
        sx={{
          "& > div": {
            gridColumn: isNonMedium ? undefined : "span 12",
          },
        }}
      >
        {/* ROW 1 */}
        <StatBox
          title="Total Donors"
          value={data && data?.totalDonors}
          increase="+14%"
          description="Since last month"
          icon={
            <Email
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
          
        />
        <StatBox
          title="Daily Funds"
          value={data && data?.todayStat?.totalRaising}
          increase="+21%"
          description="Since last month"
          icon={
            <PointOfSale
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
         <Box
         gridColumn="span 8"
         gridRow="span 2"
         backgroundColor={theme.palette.background.alt}
         p="1rem"
         borderRadius="0.55rem"
         >
          <OverViewChart view="Raising" isDashboard={true} />
         </Box>

        <StatBox
          title="Monthly Funds"
          value={data && data.thisMonthStat?.totalRaising}
          increase="+5%"
          description="Since last month"
          icon={
            <PersonAdd
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
        <StatBox
          title="Yearly Funds"
          value={data && data?.yearlyFundsTotal}
          increase="+43%"
          description="Since last month"
          icon={
            <Traffic
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
     {/* ROW 2 */}

       <Box
       gridColumn="span 8"
       gridRow="span 5"
       >
           <DataGrid
            loading={isLoading || !data}
            rows={(data && data.transactions) || []}
            getRowId={(row) =>row._id}
            columns={columns}
            />
       </Box>

       <Box
       gridColumn="span 4"
       gridRow="span 3"
       p="1.5rem"
       backgroundColor={theme.palette.background.alt}
       borderRadius="0.55rem"
       >
           <Typography
           variant="h6"
           sx={{
            color: theme.palette.secondary[100]
           }}
           >Funds By Donors</Typography>
           <BreakDownChart isDashboard={true}/>
           <Typography p="0 0.6erm" fontSize="0.8rem "  sx={{ color : theme.palette.secondary[200]}}>
             Breakdown of Campaigns and Total Raisings
           </Typography> 
       </Box>


      </Box>
    </Box>
  );
};

export default Dashboard;
