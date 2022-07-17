import React from "react";

import { Box, Grid, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";

import LogoBar from "./LogoBar";
import UrbanCard from "./UrbanCard";
import WikiCard from "./WikiCard";

const ResultPage = () => {
  const { state } = useLocation();

  const { search } = state;

  return (
    <Box style={{ width: "100%" }}>
      <LogoBar />
      <Box sx={{ margin: "0 auto", maxWidth: "80rem", minWidth: "24rem" }}>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          style={{ minHeight: "70vh" }}
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
              <Grid item xs={10} md={5}>
                <UrbanCard search={search} />
              </Grid>
              <Grid item xs={10} md={5}>
                <WikiCard search={search} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default ResultPage;
