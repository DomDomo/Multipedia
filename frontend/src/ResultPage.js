import { Grid, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import { useState } from "react";

export default function ResultPage(props) {
  const { state } = useLocation();
  const [search, setSearch] = useState(state.search);

  console.log(state);

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
          Search for: {search}
        </Typography>
      </Grid>
    </Grid>
  );
}
