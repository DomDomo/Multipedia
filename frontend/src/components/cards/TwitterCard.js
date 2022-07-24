import React, { useEffect, useState } from "react";
import Twitter from "../../icons/twitter.svg";

import {
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  createTheme,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { twitterRequest } from "../../util/api";
import LinkedText from "../LinkedText";

const wikiTheme = createTheme({
  typography: {
    allVariants: {
      color: "#FFF",
      fontFamily: ["Roboto", "sans-serif"].join(","),
    },
    body1: {
      fontSize: 13,
    },
    caption: {
      fontSize: 11,
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "#14202A",
        },
      },
    },
    MuiCardMedia: {
      styleOverrides: {
        root: {
          ":hover": {
            cursor: "pointer",
          },
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          fontFamily: ["Roboto", "sans-serif"].join(","),
          fontSize: 12,
          ":hover": {
            cursor: "pointer",
          },
          color: "#3C4043",
          textDecorationLine: "none",
        },
      },
    },
  },
});

const GoogleMeaning = (props) => {
  return <Typography variant="body1">{props.result}</Typography>;
};

const TwitterCard = (props) => {
  const [result, setResult] = useState({
    title: "loading...",
    tweets: [],
  });

  useEffect(() => {
    twitterRequest(props.search).then((data) => setResult(data));
  }, [props.search]);

  const handleRealWebsiteRedirect = () => {
    window.open(
      `https://twitter.com/search?lang=en&q="${result.title}"&src=typed_query&f=top`,
      "_blank"
    );
  };

  const meaningList = result.tweets.map((meaning, i) => {
    return <GoogleMeaning key={i} result={meaning} />;
  });

  const singleMeaning = <GoogleMeaning result={result.tweets[0]} num="no" />;

  return (
    <ThemeProvider theme={wikiTheme}>
      <Card>
        <CardHeader
          sx={{ paddingBottom: 3 }}
          action={
            <CardMedia
              onClick={handleRealWebsiteRedirect}
              height="40"
              src={Twitter}
              component="img"
            />
          }
          title={<Typography variant="h5">{result.title}</Typography>}
        />
        <CardContent sx={{ paddingTop: 0 }}>
          {result.tweets.length === 1 && singleMeaning}
          {result.tweets.length > 1 && meaningList}
        </CardContent>
      </Card>
    </ThemeProvider>
  );
};

export default TwitterCard;
