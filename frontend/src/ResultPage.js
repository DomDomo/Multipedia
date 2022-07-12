import { Grid, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import { urbanRequest } from "./api";

const ResultPage = (props) => {
  const { state } = useLocation();

  const { search } = state;
  const [result, setResult] = useState("loading");

  useEffect(() => {
    urbanRequest(search).then((data) => setResult(data));
  }, [search]);

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      textAlign="center"
      justifyContent="center"
      style={{ minHeight: "100vh" }}
    >
      <Grid item xs={12}>
        <Typography variant="h2" align="center">
          Search for: {state.search}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6" align="center">
          {result}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default ResultPage;
