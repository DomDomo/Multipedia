import React from "react";

import { Box, Grid, Typography } from "@mui/material";
import LogoBar from "./LogoBar";

const PageNotFound = () => {
  return (
    <Box style={{ width: "100%" }}>
      <LogoBar progress={0} />
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        textAlign="center"
        justifyContent="center"
        style={{ minHeight: "70vh" }}
      >
        <Grid item xs={12} sx={{ width: "100%" }}>
          <Typography variant="h2">404</Typography>
          <Typography variant="h3" sx={{ marginY: 3 }}>
            Page{" "}
            <Typography variant="h3" color="primary" sx={{ display: "inline" }}>
              Not
            </Typography>{" "}
            Found
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PageNotFound;
