import React from "react";

import { Grid } from "@mui/material";

import LoadingCard from "./LoadingCard";
import UrbanCard from "./UrbanCard";
import WikiCard from "./WikiCard";
import GoogleCard from "./GoogleCard";
import TwitterCard from "./TwitterCard";

import { objIsEmpty } from "../../util/helper";

const skeletonNum = 3;

const DynamicCard = (props) => {
  return (
    <Grid item xs={10}>
      {!objIsEmpty(props.load) && props.children}
    </Grid>
  );
};

const WorkingCards = ({ fullResult }) => {
  return (
    <Grid container spacing={3} alignItems="center" justifyContent="center">
      <DynamicCard load={fullResult.google}>
        <GoogleCard data={fullResult.google} />
      </DynamicCard>
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

const AllCards = ({ fullResult, defaultResult }) => {
  if (fullResult === defaultResult) {
    return <LoadingCards />;
  }
  return <WorkingCards fullResult={fullResult} />;
};

export default AllCards;
