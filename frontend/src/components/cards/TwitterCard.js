import React, { useEffect, useState } from "react";
import Twitter from "../../icons/twitter.svg";

import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  createTheme,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { twitterRequest } from "../../util/api";
import Tweet from "./Tweet";

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
    MuiCardContent: {
      styleOverrides: {
        root: {
          paddingBottom: 0,
          "&:last-child": {
            paddingBottom: 0,
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

  const tweetList = result.tweets.map((meaning, i) => {
    return <Tweet key={i} result={meaning} search={props.search} />;
  });

  if (result.tweets.length !== 0)
    return (
      <ThemeProvider theme={wikiTheme}>
        <Card>
          <CardHeader
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
          <CardContent sx={{ padding: 0 }}>{tweetList}</CardContent>
        </Card>
      </ThemeProvider>
    );
};

export default TwitterCard;
