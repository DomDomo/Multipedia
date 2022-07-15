import React from "react";

import UrbanCard from "./UrbanCard";

import { Box, Grid, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import { urbanRequest } from "../util/api";
import LogoBar from "./LogoBar";

const ResultPage = (props) => {
  const { state } = useLocation();

  console.log(state);

  const { search } = state;
  const [result, setResult] = useState({
    word: "loading...",
    example: "loading...",
    definition: "loading...",
  });

  useEffect(() => {
    console.log(search);
    urbanRequest(search).then((data) => setResult(data));
  }, [search]);

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
              Search for: {state.search}
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
                <UrbanCard result={result} />
              </Grid>
              <Grid item xs={10} md={5}>
                <UrbanCard result={result} />
              </Grid>
              <Grid item xs={10} md={5}>
                <UrbanCard result={result} />
              </Grid>
              <Grid item xs={10} md={5}>
                <UrbanCard result={result} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default ResultPage;
