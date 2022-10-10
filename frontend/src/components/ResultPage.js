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
import LoadingCard from "./cards/LoadingCard";
import axios from "axios";

const DynamicCard = (props) => {
  return (
    <Grid item xs={10}>
      {!objectIsEmpty(props.load) && props.children}
    </Grid>
  );
};

const WorkingCards = ({ fullResult }) => {
  return (
    <Grid container spacing={3} alignItems="center" justifyContent="center">
      <DynamicCard load={fullResult.google}>
        <GoogleCard data={fullResult.google} />
      </DynamicCard>
      <DynamicCard load={fullResult.urban}>
        <UrbanCard data={fullResult.urban} />
      </DynamicCard>
      <DynamicCard load={fullResult.wiki}>
        <WikiCard data={fullResult.wiki} />
      </DynamicCard>
      <DynamicCard load={fullResult.twitter}>
        <TwitterCard data={fullResult.twitter} />
      </DynamicCard>
    </Grid>
  );
};

const skeletonNum = 3;

const LoadingCards = () => {
  const cards = [];
  for (let i = 0; i < skeletonNum; i++) {
    cards.push(
      <Grid item xs={10} key={i}>
        <LoadingCard even={i % 2 === 0} />
      </Grid>
    );
  }

  return (
    <Grid container spacing={3} alignItems="center" justifyContent="center">
      {cards}
    </Grid>
  );
};

const defaultResult = {
  google: {},
  urban: {},
  wiki: {},
  twitter: {},
  progress: 0,
};
const icrementNum = 25;

const ResultPage = () => {
  // @ts-ignore
  const { search, slug } = useLocation().state;

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

  let cards = <WorkingCards fullResult={fullResult} />;
  if (fullResult === defaultResult) cards = <LoadingCards />;

  if (fullResult.progress === 100) {
    console.log(fullResult);
    axios({
      method: "post",
      url: "api/",
      baseURL: "/",
      data: {
        term: search,
        slug: slug,
        urban_search: fullResult.urban,
        wiki_search: fullResult.wiki,
      },
    });
  }

  return (
    <Box style={{ width: "100%" }}>
      <LogoBar progress={fullResult.progress} />
      <Typography variant="h4" align="center" sx={{ marginY: 3 }}>
        Search for: {search}
      </Typography>
      <Box sx={{ margin: "0 auto", maxWidth: "45rem", minWidth: "24rem" }}>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          style={{ minHeight: "70vh" }}
        >
          {cards}
        </Grid>
      </Box>
    </Box>
  );
};

export default ResultPage;
