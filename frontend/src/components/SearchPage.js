import React from "react";

import { Grid, IconButton, InputBase } from "@mui/material";
import Box from "@mui/material/Box";
import SearchIcon from "@mui/icons-material/Search";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { slugify } from "../util/helper";
import Logo from "./Logo";

const SearchBar = (props) => {
  const [search, setSearch] = useState("");

  const enterKeyPress = (e) => {
    if (e.keyCode === 13) {
      props.commitSearch(search);
    }
  };

  return (
    <Box
      component="span"
      sx={{
        p: 2,
        borderRadius: "16px",
      }}
      bgcolor="#1a242e"
      justifyContent="center"
    >
      <InputBase
        placeholder="What is...?"
        sx={{ width: "50%", fontSize: 20 }}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={enterKeyPress}
      />
      <IconButton
        type="submit"
        aria-label="search"
        color="primary"
        onClick={() => props.commitSearch(search)}
      >
        <SearchIcon sx={{ fontSize: 30 }} />
      </IconButton>
    </Box>
  );
};

const SearchPage = (props) => {
  let navigate = useNavigate();

  const commitSearch = (search) => {
    if (search.trim() === "") return;
    navigate(`../result/${slugify(search)}`, {
      state: {
        search: search,
      },
    });
  };

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
        <SearchBar commitSearch={commitSearch} />
      </Grid>
    </Grid>
  );
};

export default SearchPage;
