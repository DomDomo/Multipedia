import React from "react";

import { Grid, Typography } from "@mui/material";
import FindInPageIcon from "@mui/icons-material/FindInPage";

const Logo = () => {
  return (
    <Grid
      container
      spacing={2}
      direction="row"
      alignItems="center"
      justifyContent="center"
    >
      <Grid item xs={2}>
        <FindInPageIcon sx={{ fontSize: 50 }} color="primary" />
      </Grid>
      <Grid item xs={10}>
        <Typography variant="h4" align="center">
          Multipedia
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Logo;
