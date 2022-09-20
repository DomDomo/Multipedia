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

const objectIsEmpty = (obj) => {
  return Object.keys(obj).length === 0;
};

const ResultPage = () => {
  const { state } = useLocation();

  const { search } = state;

  const [fullResult, setFullResult] = useState({
    google: {},
    urban: {},
    wiki: {},
    twitter: {},
  });

  useEffect(() => {
    setFullResult({
      google: {},
      urban: {},
      wiki: {},
      twitter: {},
    });
    googleRequest(search).then((data) =>
      setFullResult((fullResult) => ({
        ...fullResult,
        google: data,
      }))
    );
    urbanRequest(search).then((data) =>
      setFullResult((fullResult) => ({
        ...fullResult,
        urban: data,
      }))
    );
    wikiRequest(search).then((data) =>
      setFullResult((fullResult) => ({
        ...fullResult,
        wiki: data,
      }))
    );
    twitterRequest(search).then((data) =>
      setFullResult((fullResult) => ({
        ...fullResult,
        twitter: data,
      }))
    );
  }, [search]);

  console.log(fullResult.google);
  console.log(fullResult.twitter);

  return (
    <Box style={{ width: "100%" }}>
      <LogoBar />
      <Box sx={{ margin: "0 auto", maxWidth: "50rem", minWidth: "24rem" }}>
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
              {!objectIsEmpty(fullResult.google) && (
                <Grid item xs={10}>
                  <GoogleCard google={fullResult.google} />
                </Grid>
              )}
              {!objectIsEmpty(fullResult.urban) && (
                <Grid item xs={10}>
                  <UrbanCard urban={fullResult.urban} />
                </Grid>
              )}
              {!objectIsEmpty(fullResult.wiki) && (
                <Grid item xs={10}>
                  <WikiCard wiki={fullResult.wiki} />
                </Grid>
              )}
              {!objectIsEmpty(fullResult.twitter) && (
                <Grid item xs={10}>
                  <TwitterCard twitter={fullResult.twitter} />
                </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default ResultPage;
