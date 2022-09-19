import React from "react";

import { Box, Grid, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";

import LogoBar from "./LogoBar";
import UrbanCard from "./cards/UrbanCard";
import WikiCard from "./cards/WikiCard";
import GoogleCard from "./cards/GoogleCard";
import TwitterCard from "./cards/TwitterCard";

const ResultPage = () => {
  const { state } = useLocation();

  const { search } = state;

  return (
    <Box style={{ width: "100%" }}>
      <LogoBar />
      <Box sx={{ margin: "0 auto", maxWidth: "50rem", minWidth: "24rem" }}>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          style={{ minHeight: "70vh", marginBottom: 20 }}
        >
          <Grid item xs={12}>
            <Typography variant="h4" align="center" sx={{ marginY: 3 }}>
              Search for: {search}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Grid
              container
              spacing={3}
              alignItems="center"
              justifyContent="center"
            >
              <Grid item xs={10}>
                <GoogleCard search={search} />
              </Grid>
              <Grid item xs={10}>
                <UrbanCard search={search} />
              </Grid>
              <Grid item xs={10}>
                <WikiCard search={search} />
              </Grid>
              <Grid item xs={10}>
                <TwitterCard search={search} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default ResultPage;
