import React from "react";

import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import FindInPageIcon from "@mui/icons-material/FindInPage";
import { Link } from "react-router-dom";

const LogoBar = () => {
  return (
    <AppBar style={{ backgroundColor: "#171D2E" }} position="sticky">
      <Toolbar sx={{ justifyContent: "flex-start", alignItems: "center" }}>
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          padding={1}
          to="/"
          component={Link}
          sx={{ cursor: "pointer", textDecoration: "none" }}
        >
          <FindInPageIcon
            sx={{ fontSize: 30, marginBottom: 0.5 }}
            color="primary"
          />
          <Typography variant="h5" align="center" color="#FFF">
            Multipedia
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default LogoBar;
