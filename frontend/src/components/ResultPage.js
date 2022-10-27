import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Box, Grid, Typography } from "@mui/material";

import LogoBar from "./LogoBar";
import AllCards from "./cards/AllCards";

import {
  googleRequest,
  twitterRequest,
  urbanRequest,
  wikiRequest,
  findDefinition,
  postDefinition,
} from "../util/api";
import { objIsEmpty, deslugify } from "../util/helper";

const defaultResult = {
  google: {},
  urban: {},
  wiki: {},
  twitter: {},
  progress: 0,
  new: false,
};
const icrementNum = 25;

const ResultPage = () => {
  const { slug } = useParams();
  const term = deslugify(slug);

  const [fullResult, setFullResult] = useState(defaultResult);
  const [resutlWasFound, setResutlWasFound] = useState(true);

  // API requests
  useEffect(() => {
    findDefinition(slug).then((result) => {
      if (!objIsEmpty(result.data)) {
        const newFullResult = {
          google: result.data.google_search,
          urban: result.data.urban_search,
          wiki: result.data.wiki_search,
          twitter: result.data.twitter_search,
          progress: 100,
          new: false,
        };
        setFullResult(newFullResult);
      } else {
        setResutlWasFound(false);
      }
    });

    if (!resutlWasFound) {
      setFullResult({ ...defaultResult, new: true });
      googleRequest(term).then((data) =>
        setFullResult((fullResult) => ({
          ...fullResult,
          google: data,
          progress: fullResult.progress + icrementNum,
        }))
      );
      urbanRequest(term).then((data) =>
        setFullResult((fullResult) => ({
          ...fullResult,
          urban: data,
          progress: fullResult.progress + icrementNum,
        }))
      );
      wikiRequest(term).then((data) =>
        setFullResult((fullResult) => ({
          ...fullResult,
          wiki: data,
          progress: fullResult.progress + icrementNum,
        }))
      );
      twitterRequest(term).then((data) =>
        setFullResult((fullResult) => ({
          ...fullResult,
          twitter: data,
          progress: fullResult.progress + icrementNum,
        }))
      );
    }
  }, [slug, term, resutlWasFound]);

  // Progress bar turn off hook
  useEffect(() => {
    if (fullResult.progress < 100) return;

    const intervalId = setInterval(() => {
      setFullResult((fullResult) => ({
        ...fullResult,
        progress: 0,
      }));
    }, 500);

    return () => clearInterval(intervalId);
  }, [fullResult.progress]);

  if (fullResult.progress === 100) postDefinition(term, slug, fullResult);

  return (
    <Box style={{ width: "100%" }}>
      <LogoBar progress={fullResult.progress} />
      <Typography
        variant="h4"
        align="center"
        sx={{ marginY: 3, wordBreak: "break-word" }}
      >
        Search for: {term}
      </Typography>
      <Box sx={{ margin: "0 auto", maxWidth: "45rem", minWidth: "20rem" }}>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          style={{ minHeight: "70vh", width: "100%" }}
        >
          <AllCards fullResult={fullResult} defaultResult={defaultResult} />
        </Grid>
      </Box>
    </Box>
  );
};

export default ResultPage;
