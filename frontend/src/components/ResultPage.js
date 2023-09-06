import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";

import { Box, Grid, Typography } from "@mui/material";

import LogoBar from "./LogoBar";
import AllCards from "./cards/AllCards";

import {
  googleRequest,
  twitterRequest,
  urbanRequest,
  wikiRequest,
  chatgptRequest,
  findDefinition,
  postDefinition,
} from "../util/api";
import { objIsEmpty, slugify, deslugify } from "../util/helper";

const defaultResult = {
  google: {},
  urban: {},
  wiki: {},
  twitter: {},
  chatgpt: {},
  progress: 0,
  new: false,
};
const icrementNum = 20;

const ResultPage = () => {
  let { slug } = useParams();
  slug = slugify(slug);

  const location = useLocation();
  // @ts-ignore
  const term = location.state ? location.state.term : deslugify(slug);

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
          chatgpt: result.data.chatgpt_search,
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
      chatgptRequest(term).then((data) =>
        setFullResult((fullResult) => ({
          ...fullResult,
          chatgpt: data,
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

  console.log(fullResult);

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
      <Box
        sx={{
          margin: "0 auto",
          maxWidth: "45rem",
          minWidth: "20rem",
          marginBottom: "2rem",
        }}
      >
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
