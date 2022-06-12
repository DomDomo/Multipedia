import { Grid, IconButton, InputBase, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import SearchIcon from "@mui/icons-material/Search";
import FindInPageIcon from "@mui/icons-material/FindInPage";
import { useState } from "react";

export default function SearchPage(props) {
  const [search, setSearch] = useState("");

  const enterKeyPress = (e) => {
    if (e.keyCode === 13) {
      onSearchPress();
    }
  };

  const onSearchPress = () => {
    console.log(search);
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
      </Grid>
      <Grid item xs={12} sx={{ width: "100%" }}>
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
            onClick={onSearchPress}
          >
            <SearchIcon sx={{ fontSize: 30 }} />
          </IconButton>
        </Box>
      </Grid>
    </Grid>
  );
}
