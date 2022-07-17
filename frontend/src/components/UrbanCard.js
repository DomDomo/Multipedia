import React, { useEffect, useState } from "react";

import Urban from "../icon/urban.svg";

import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  createTheme,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { urbanRequest } from "../util/api";
import LinkedText from "./LinkedText";

const urbanTheme = createTheme({
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
  components: {
    MuiLink: {
      styleOverrides: {
        root: {
          ":hover": {
            color: "#3AFF58",
            cursor: "pointer",
          },
          color: "#1FA2F3",
          textDecorationColor: "rgba(31,162,243, 1)",
        },
      },
    },
  },
});

const UrbanCard = (props) => {
  const [result, setResult] = useState({
    word: "loading...",
    example: "loading...",
    definition: "loading...",
  });

  useEffect(() => {
    urbanRequest(props.search).then((data) => setResult(data));
  }, [props.search]);

  return (
    <ThemeProvider theme={urbanTheme}>
      <Card style={{ backgroundColor: "#1D2439" }}>
        <CardHeader
          sx={{ paddingBottom: 1 }}
          action={<CardMedia height="40" src={Urban} component="img" />}
          title={
            <Typography variant="h5" color="#1FA2F3">
              {result.word}
            </Typography>
          }
        />
        <CardContent sx={{ paddingTop: 1 }}>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <LinkedText text={result.definition} />
          </Typography>
          <Typography variant="body2">
            <LinkedText text={result.example} />
          </Typography>
        </CardContent>
      </Card>
    </ThemeProvider>
  );
};

export default UrbanCard;
