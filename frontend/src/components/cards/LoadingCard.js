import React from "react";
import {
  Card,
  Box,
  Skeleton,
  Typography,
  Avatar,
  createTheme,
  ThemeProvider,
} from "@mui/material";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const lightTheme = createTheme({
  palette: {
    mode: "light",
  },
});

const LoadingCard = ({ even }) => {
  const theme = even ? lightTheme : darkTheme;
  const background = even ? "#FFF" : "#171D2E";
  return (
    <ThemeProvider theme={theme}>
      <Card
        sx={{
          backgroundColor: background,
          padding: 2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box sx={{ width: "100%" }}>
            <Skeleton width="70%">
              <Typography>.</Typography>
            </Skeleton>
          </Box>
          <Box sx={{ margin: 1 }}>
            <Skeleton variant="circular">
              <Avatar />
            </Skeleton>
          </Box>
        </Box>
        <Skeleton variant="rectangular" width="100%">
          <Typography color={"transparent"}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged.
          </Typography>
        </Skeleton>
      </Card>
    </ThemeProvider>
  );
};

export default LoadingCard;
