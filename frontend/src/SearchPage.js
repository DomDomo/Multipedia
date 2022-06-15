import { Grid, IconButton, InputBase, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import SearchIcon from "@mui/icons-material/Search";
import FindInPageIcon from "@mui/icons-material/FindInPage";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

const slugify = (str) =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");

const Logo = () => {
  return (
    <Grid
      container
      spacing={2}
      direction="row"
      alignItems="center"
      justifyContent="center"
    >
      <Grid item xs={2}>
        <FindInPageIcon sx={{ fontSize: 70 }} color="primary" />
      </Grid>
      <Grid item xs={10}>
        <Typography variant="h2" align="center">
          Multipedia
        </Typography>
      </Grid>
    </Grid>
  );
};

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
        onClick={() => props.commitSearch}
      >
        <SearchIcon sx={{ fontSize: 30 }} />
      </IconButton>
    </Box>
  );
};

const SearchPage = (props) => {
  let navigate = useNavigate();

  const commitSearch = (search) => {
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
      style={{ minHeight: "100vh" }}
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
