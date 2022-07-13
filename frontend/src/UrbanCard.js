import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  createTheme,
  ThemeProvider,
  Typography,
} from "@mui/material";

import Urban from "./icon/urban.svg";

const theme = createTheme({
  typography: {
    allVariants: {
      color: "#FFF",
      fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
    },
    h5: {
      fontFamily: ["Lora", "serif"].join(","),
      color: "#1FA2F3",
    },
    body1: {
      fontSize: 14,
    },
    body2: {
      fontSize: 12,
      fontStyle: "italic",
    },
  },
});

const UrbanCard = (props) => {
  return (
    <ThemeProvider theme={theme}>
      <Card style={{ backgroundColor: "#1D2439" }} sx={{ margin: 1 }}>
        <CardHeader
          sx={{ paddingBottom: 1 }}
          action={<CardMedia height="40" src={Urban} component="img" />}
          title={
            <Typography variant="h5" color="#1FA2F3">
              {props.result.word}
            </Typography>
          }
        />
        <CardContent sx={{ paddingTop: 1 }}>
          <Typography variant="body1" sx={{ mb: 1 }}>
            {props.result.definition}
          </Typography>
          <Typography variant="body2">{props.result.example}</Typography>
        </CardContent>
      </Card>
    </ThemeProvider>
  );
};

export default UrbanCard;
