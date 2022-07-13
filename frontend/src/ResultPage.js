import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import { urbanRequest } from "./api";
import React from "react";

import Urban from "./icon/urban.svg";

const UrbanCard = (props) => {
  return (
    <Card style={{ backgroundColor: "#1D2439" }} sx={{ margin: 1 }}>
      <CardHeader
        sx={{ paddingBottom: 1 }}
        avatar={
          <CardMedia
            height="40"
            src={Urban}
            component="img"
            title="Urban Dictionary logo"
          />
        }
      />
      <CardContent sx={{ paddingTop: 1 }}>
        <Typography variant="body2">{props.definition}</Typography>
      </CardContent>
    </Card>
  );
};

const ResultPage = (props) => {
  const { state } = useLocation();

  const { search } = state;
  const [result, setResult] = useState("loading");

  useEffect(() => {
    urbanRequest(search).then((data) => setResult(data));
  }, [search]);

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: "70vh" }}
    >
      <Grid item xs={12}>
        <Typography variant="h4" align="center" sx={{ marginY: 3 }}>
          Search for: {state.search}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={0} alignItems="center" justifyContent="center">
          <Grid item xs={10} md={5}>
            <UrbanCard definition={result} />
          </Grid>
          <Grid item xs={10} md={5}>
            <UrbanCard definition={result} />
          </Grid>
          <Grid item xs={10} md={5}>
            <UrbanCard definition={result} />
          </Grid>
          <Grid item xs={10} md={5}>
            <UrbanCard definition={result} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ResultPage;
