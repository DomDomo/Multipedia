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

const GoogleMeaning = (props) => {
  const possibleNumber = props.num !== "no" ? `${props.num + 1}.  ` : "";
  return (
    <Box>
      <Typography
        sx={{ fontStyle: "italic", marginLeft: 0 }}
        variant="caption"
        color="text.secondary"
      >
        {props.result.partOfSpeech}
      </Typography>
      <Typography variant="body1">
        {possibleNumber}
        {props.result.definition}
      </Typography>
      {props.result.example && (
        <Typography
          sx={{ fontStyle: "italic" }}
          variant="body1"
          color="text.secondary"
        >
          "{props.result.example}"
        </Typography>
      )}
    </Box>
  );
};

const GoogleCard = (props) => {
  const [result, setResult] = useState({
    title: "loading...",
    phonetic: "",
    partOfSpeech: "",
    definition: "loading...",
    example: "",
    synonyms: [],
    meanings: [],
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

  const meaningList = result.meanings.map((meaning, i) => {
    return <GoogleMeaning key={i} result={meaning} num={i} />;
  });

  const singleMeaning = <GoogleMeaning result={result.meanings[0]} num="no" />;

  const synonymsList = result.synonyms.map((synonym, i) => (
    <Box
      key={synonym + i}
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

  console.log(synonymsList);

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
            </Box>
          }
        />
        <CardContent sx={{ paddingTop: 0, marginLeft: 1 }}>
          {result.meanings.length === 1 && singleMeaning}
          {result.meanings.length > 1 && meaningList}
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

export default GoogleCard;
