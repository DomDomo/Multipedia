import React from "react";
import reactStringReplace from "react-string-replace";

import Urban from "../icon/urban.svg";
import { slugify } from "../util/helper";
import { useNavigate } from "react-router-dom";

import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  createTheme,
  Link,
  ThemeProvider,
  Typography,
} from "@mui/material";

// This function takes a string and adds links where the words are in brackets
const addLinks = (str, commitSearch) => {
  return reactStringReplace(str, /\[(.*?)\]/g, (match, i) => (
    <Link key={i} onClick={() => commitSearch(match)}>
      {match}
    </Link>
  ));
};

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
  let navigate = useNavigate();

  const commitSearch = (search) => {
    navigate(`../result/${slugify(search)}`, {
      state: {
        search: search,
      },
    });
  };

  return (
    <ThemeProvider theme={urbanTheme}>
      <Card style={{ backgroundColor: "#1D2439" }}>
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
            {addLinks(props.result.definition, commitSearch)}
          </Typography>
          <Typography variant="body2">
            {addLinks(props.result.example, commitSearch)}
          </Typography>
        </CardContent>
      </Card>
    </ThemeProvider>
  );
};

export default UrbanCard;
