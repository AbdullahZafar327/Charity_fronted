import React from "react";
import { CircularProgress, useTheme,Box } from "@mui/material";
import { makeStyles } from "@mui/styles";

const Loader = () => {
  const theme = useTheme();

  return (
    <Box sx={{
      justifyContent:'center',
      alignItems:'center',
      display:'flex',
      m:"auto"
    }}>
      <CircularProgress
      color="secondary"
      />
    </Box>
  );
};

export default Loader;
