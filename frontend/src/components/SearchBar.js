import React, { useState } from "react";
import { Box, InputBase, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import { slugify } from "../util/helper";

const SearchBar = () => {
  const [search, setSearch] = useState("");
  let navigate = useNavigate();

  const commitSearch = (search) => {
    if (search.trim() === "") return;
    navigate(`../result/${slugify(search)}`, {
      state: {
        search: search,
      },
    });
  };

  const enterKeyPress = (e) => {
    if (e.keyCode === 13) {
      commitSearch(search);
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
        onClick={() => commitSearch(search)}
      >
        <SearchIcon sx={{ fontSize: 30 }} />
      </IconButton>
    </Box>
  );
};

export default SearchBar;
