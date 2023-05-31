import React, { useState } from "react";
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Collapse,
  Button,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useGetCampaignsQuery } from "../../state/ApiState";
import Header from "../../components/Header";
import FlexBetween from "../../components/FlexBetween";
import Loader from "../../components/Loader";

const CampaignCard = ({
  campaign: {
    _id,
    name,
    charity_name,
    Start_Date,
    End_date,
    imgUrl,
    description,
    price,
    donor_count
  },
}) => {
  const theme = useTheme();
  const [isExpanded, SetIsExpanded] = useState(false);
  return (
    <Card
      sx={{
        backgroundImage: "none",
        backgroundColor: theme.palette.background.alt,
        borderRadius: "0.55rem",
      }}
    >
      <CardMedia component="img" image={imgUrl} height="250" alt="image" />
      <CardContent>
        <Typography
          variant="h5"
          color={
            theme.palette.mode === "dark"
              ? theme.palette.secondary[300]
              : theme.palette.secondary[200]
          }
          gutterBottom
          fontWeight="bold"
        >
          {name}
        </Typography>
        <Typography
          sx={{ mb: "1.5rem" }}
          color={
            theme.palette.mode === "dark"
              ? theme.palette.secondary[100]
              : theme.palette.secondary[100]
          }
          gutterBottom
        >
          {description}
        </Typography>
        <Typography
          sx={{ fontSize: 14 }}
          color={
            theme.palette.mode === "dark"
              ? theme.palette.secondary[100]
              : theme.palette.secondary[100]
          }
          gutterBottom
        >
          Gaol Amount : ${price}
        </Typography>
        <Typography
          sx={{ fontSize: 14 }}
          color={
            theme.palette.mode === "dark"
              ? theme.palette.secondary[100]
              : theme.palette.secondary[100]
          }
          gutterBottom
        >
          Charity Name : {charity_name}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="primary"
          size="small"
          onClick={() => SetIsExpanded(!isExpanded)}
        >
          See More
        </Button>
      </CardActions>
      <Collapse
        in={isExpanded}
        timeout="auto"
        unmountOnExit
        sx={{
          color: theme.palette.neutral[300],
        }}
      >
        <CardContent>
          <Typography>id : {_id}</Typography>
          <Typography>Donors : {donor_count}</Typography>
          <Typography>Start Date : {Start_Date}</Typography>
          <Typography>End Date : {End_date}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};
const Campaign = () => {
  const { data, isLoading } = useGetCampaignsQuery();
  const isNonMobile = useMediaQuery("(min-width:1000px)");


  return (
    <Box m="1.5rem 2,5rem">
      <Header
        title="CAMPAIGNS"
        subtitle="Join and Support Campaigns to help the community"
      />
      {!isLoading ? (
        <Box
          display="grid"
          gridTemplateColumns="repeat(4,minmax(0,1fr))"
          mt="20px"
          justifyContent="space-between"
          rowGap="20px"
          columnGap="1.33%"
          sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
          }}
        >
          {data?.map((campaign, i) => (
            <CampaignCard key={campaign?._id} index={i} campaign={campaign} />
          ))}
        </Box>
      ) : (
        <Loader/>
      )}
    </Box>
  );
};

export default Campaign;
