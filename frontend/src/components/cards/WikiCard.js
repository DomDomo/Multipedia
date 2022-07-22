import React, { useEffect, useState } from "react";
import Wiki from "../../icons/wikipedia.svg";
import { Interweave } from "interweave";

import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  createTheme,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { wikiRequest } from "../../util/api";
import LinkMatcher from "../../util/LinkMatcher";

const wikiTheme = createTheme({
  typography: {
    allVariants: {
      color: "#000",
      fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
    },
    h5: {
      fontFamily: ["Georgia", "Times", "serif"].join(","),
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
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "#FFF",
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
          ":hover": {
            cursor: "pointer",
            textDecorationLine: "underline",
          },
          textDecorationColor: "#076FCA",
          textDecorationLine: "none",
        },
      },
    },
  },
});

const WikiCard = (props) => {
  const [result, setResult] = useState({
    title: "loading...",
    content: "loading...",
  });

  useEffect(() => {
    wikiRequest(props.search).then((data) => setResult(data));
  }, [props.search]);

  const handleRealWebsiteRedirect = () => {
    window.open(`https://en.wikipedia.org/wiki/${result.title}`, "_blank");
  };

  return (
    <ThemeProvider theme={wikiTheme}>
      <Card>
        <CardHeader
          sx={{ paddingBottom: 1 }}
          action={
            <CardMedia
              onClick={handleRealWebsiteRedirect}
              height="70"
              src={Wiki}
              component="img"
            />
          }
          title={
            <Typography
              variant="h5"
              sx={{ borderBottom: "1px solid #a2a9b1", width: "95%" }}
            >
              {result.title}
            </Typography>
          }
        />
        <CardContent sx={{ paddingTop: 1 }}>
          <Typography variant="body1" sx={{ mb: 1 }} component={"span"}>
            <Interweave
              content={result.content}
              matchers={[new LinkMatcher("link")]}
            />
          </Typography>
        </CardContent>
      </Card>
    </ThemeProvider>
  );
};

export default WikiCard;
