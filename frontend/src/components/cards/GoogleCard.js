import React, { useEffect, useState } from "react";
import Google from "../../icons/google.svg";

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
import { googleRequest } from "../../util/api";
import LinkedText from "../LinkedText";

const wikiTheme = createTheme({
  typography: {
    allVariants: {
      color: "#202124",
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

const WikiCard = (props) => {
  const [result, setResult] = useState({
    title: "loading...",
    phonetic: "",
    partOfSpeech: "",
    definition: "loading...",
    example: "",
    synonyms: [],
  });

  useEffect(() => {
    googleRequest(props.search).then((data) => setResult(data));
  }, [props.search]);

  const handleRealWebsiteRedirect = () => {
    window.open(
      `https://www.google.com/search?q=define+${result.title}`,
      "_blank"
    );
  };

  const synonymsList = result.synonyms.map((synonym, i) => (
    <Box
      key={i}
      sx={{
        display: "inline-block",
        border: "1px solid #DADCE0",
        borderRadius: "13px",
        padding: "2px 12px",
        marginLeft: "4px",
        lineHeight: "15px",
        "&:hover": {
          backgroundColor: "rgb(248, 249, 250)",
        },
      }}
    >
      <LinkedText text={`[${synonym}]`} />
    </Box>
  ));

  return (
    <ThemeProvider theme={wikiTheme}>
      <Card>
        <CardHeader
          sx={{ paddingBottom: 1 }}
          action={
            <CardMedia
              onClick={handleRealWebsiteRedirect}
              height="45"
              src={Google}
              component="img"
            />
          }
          title={<Typography variant="h5">{result.title}</Typography>}
          subheader={
            <Box>
              <Typography display="block" variant="caption">
                {result.phonetic}
              </Typography>
              <Typography
                sx={{ fontStyle: "italic" }}
                variant="caption"
                color="text.secondary"
              >
                {result.partOfSpeech}
              </Typography>
            </Box>
          }
        />
        <CardContent sx={{ paddingTop: 0, marginLeft: 1 }}>
          <Typography variant="body1">{result.definition}</Typography>
          {result.example && (
            <Typography
              sx={{ fontStyle: "italic" }}
              variant="body1"
              color="text.secondary"
            >
              "{result.example}"
            </Typography>
          )}
          {result.synonyms.length > 0 && (
            <Box sx={{ marginTop: 1 }}>
              <Typography style={{ color: "#198138" }} variant="caption">
                Similar:
              </Typography>
              {synonymsList}
            </Box>
          )}
        </CardContent>
      </Card>
    </ThemeProvider>
  );
};

export default WikiCard;
