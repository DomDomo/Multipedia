import React from "react";
import { Grid } from "@mui/material";
import LoadingCard from "./LoadingCard";
import UrbanCard from "./UrbanCard";
import WikiCard from "./WikiCard";
import GoogleCard from "./GoogleCard";
import TwitterCard from "./TwitterCard";
import ChatGPTCard from "./ChatGPTCard";

import { objIsEmpty } from "../../util/helper";

const skeletonNum = 3;

const DynamicCard = ({ load, children }) => {
  return load && !objIsEmpty(load) ? (
    <Grid item xs={10}>
      {children}
    </Grid>
  ) : null;
};

const LoadingCards = () => {
  const cards = Array.from({ length: skeletonNum }, (_, i) => (
    <Grid item xs={10} key={i}>
      <LoadingCard even={i % 2 === 0} />
    </Grid>
  ));

  return (
    <Grid container spacing={3} alignItems="center" justifyContent="center">
      {cards}
    </Grid>
  );
};

const WorkingCards = ({ fullResult }) => {
  const cardData = [
    {
      load: fullResult.google,
      component: <GoogleCard data={fullResult.google} />,
    },
    {
      load: fullResult.urban,
      component: <UrbanCard data={fullResult.urban} />,
    },
    { load: fullResult.wiki, component: <WikiCard data={fullResult.wiki} /> },
    {
      load: fullResult.twitter,
      component: <TwitterCard data={fullResult.twitter} />,
    },
    {
      load: fullResult.chatgpt,
      component: <ChatGPTCard data={fullResult.chatgpt} />,
    },
  ];

  return (
    <Grid container spacing={3} alignItems="center" justifyContent="center">
      {cardData.map((card, index) => (
        <DynamicCard key={index} load={card.load}>
          {card.component}
        </DynamicCard>
      ))}
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
