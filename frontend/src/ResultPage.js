import React from "react";

import UrbanCard from "./UrbanCard";

import { Grid, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import { urbanRequest } from "./util/api";

const ResultPage = (props) => {
  const { state } = useLocation();

  console.log(state);

  const { search } = state;
  const [result, setResult] = useState({
    word: "loading...",
    // definition: "loading...",
    example: "loading...",
    definition: "loading...",
  });

  useEffect(() => {
    console.log(search);
    urbanRequest(search).then((data) => setResult(data));
  }, [search]);

  return (
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
        <Grid container spacing={0} alignItems="center" justifyContent="center">
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
  );
};

export default ResultPage;
