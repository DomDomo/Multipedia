import { Grid, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const ResultPage = (props) => {
  const { state } = useLocation();
  const [result, setResult] = useState({});

  useEffect(() => {
    axios
      .get("/api/")
      .then((res) => setResult({ terms: res.data }))
      .catch((err) => console.log(err));
  }, []);

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
          {JSON.stringify(result, null, 2)}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default ResultPage;
