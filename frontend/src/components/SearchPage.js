import React from "react";

import { Grid } from "@mui/material";
import Logo from "./Logo";
import SearchBar from "./SearchBar";

const SearchPage = () => {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      textAlign="center"
      justifyContent="center"
      style={{ minHeight: "70vh" }}
    >
      <Grid item xs={12} sx={{ mb: 3 }}>
        <Logo />
      </Grid>
      <Grid item xs={12} sx={{ width: "100%" }}>
        <SearchBar />
      </Grid>
    </Grid>
  );
};

export default SearchPage;
