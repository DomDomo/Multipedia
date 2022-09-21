import React, { useEffect, useState } from "react";

import { Box, Grid, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";

import LogoBar from "./LogoBar";
import UrbanCard from "./cards/UrbanCard";
import WikiCard from "./cards/WikiCard";
import GoogleCard from "./cards/GoogleCard";
import TwitterCard from "./cards/TwitterCard";
import {
  googleRequest,
  twitterRequest,
  urbanRequest,
  wikiRequest,
} from "../util/api";
import { objectIsEmpty } from "../util/helper";

const defaultResult = {
  google: {},
  urban: {},
  wiki: {},
  twitter: {},
  progress: 0,
};
const icrementNum = 25;

const ResultPage = () => {
  const { search } = useLocation().state;

  const [fullResult, setFullResult] = useState(defaultResult);

  // API requests
  useEffect(() => {
    setFullResult(defaultResult);
    googleRequest(search).then((data) =>
      setFullResult((fullResult) => ({
        ...fullResult,
        google: data,
        progress: fullResult.progress + icrementNum,
      }))
    );
    urbanRequest(search).then((data) =>
      setFullResult((fullResult) => ({
        ...fullResult,
        urban: data,
        progress: fullResult.progress + icrementNum,
      }))
    );
    wikiRequest(search).then((data) =>
      setFullResult((fullResult) => ({
        ...fullResult,
        wiki: data,
        progress: fullResult.progress + icrementNum,
      }))
    );
    twitterRequest(search).then((data) =>
      setFullResult((fullResult) => ({
        ...fullResult,
        twitter: data,
        progress: fullResult.progress + icrementNum,
      }))
    );
  }, [search]);

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

  return (
    <Box style={{ width: "100%" }}>
      <LogoBar progress={fullResult.progress} />
      <Box sx={{ margin: "0 auto", maxWidth: "45rem", minWidth: "24rem" }}>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          style={{ minHeight: "70vh", marginBottom: 20 }}
        >
          <Grid item xs={12}>
            <Typography variant="h4" align="center" sx={{ marginY: 3 }}>
              Search for: {search}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Grid
              container
              spacing={3}
              alignItems="center"
              justifyContent="center"
            >
              <Grid item xs={10}>
                <GoogleCard google={fullResult.google} />
              </Grid>
              <Grid item xs={10}>
                <UrbanCard urban={fullResult.urban} />
              </Grid>

              <Grid item xs={10}>
                <WikiCard wiki={fullResult.wiki} />
              </Grid>
              <Grid item xs={10}>
                {!objectIsEmpty(fullResult.twitter) && (
                  <TwitterCard twitter={fullResult.twitter} />
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default ResultPage;
