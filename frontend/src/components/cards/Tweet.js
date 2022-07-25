import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Grid } from "@mui/material";

import { Interweave } from "interweave";

export default function Tweet(props) {
  const tweetLink = `https://twitter.com/twitter/status/${props.result.id}`;

  const handleRealTweetRedirect = () => {
    let selection = window.getSelection().toString();

    if (!selection) window.open(tweetLink, "_blank");
  };

  const highlightedTermText = props.result.text.replace(
    new RegExp(props.search, "gi"),
    (str) => `<b>${str}</b>`
  );

  return (
    <Card
      sx={{
        borderRadius: 0,
        borderBottom: 1,
        cursor: "pointer",
        "&:hover": {
          backgroundColor: "rgb(28, 39, 50)",
        },
      }}
      onClick={handleRealTweetRedirect}
    >
      <CardHeader
        avatar={
          <Avatar
            sx={{ width: 32, height: 32 }}
            src={props.result.profile_image}
          ></Avatar>
        }
        title={
          <Typography sx={{ fontSize: 14, marginLeft: "-8px" }}>
            {props.result.name}
          </Typography>
        }
        subheader={
          <Typography
            sx={{
              fontSize: 12,
              marginLeft: "-8px",
              marginTop: "-2px",
              color: "#8B98A5",
            }}
          >
            @{props.result.screen_name}
          </Typography>
        }
      />
      <CardContent sx={{ paddingTop: 0 }}>
        <Typography variant="body2">
          <Interweave content={highlightedTermText} />
        </Typography>
        <Grid
          container
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          color={{ color: "#8B98A5" }}
          sx={{
            marginTop: 1,
            paddingTop: 1,
            borderTop: 1,
            borderColor: "#38444D",
            color: "#8B98A5",
          }}
        >
          <Grid item>
            <Typography sx={{ fontSize: 12 }} color="#8B98A5">
              {props.result.date}
            </Typography>
          </Grid>
          <Grid item display="flex" alignItems="center">
            <FavoriteBorderIcon sx={{ fontSize: 20, marginRight: 0.5 }} />
            <Typography sx={{ fontSize: 12 }} color="#8B98A5">
              {props.result.likes}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions disableSpacing></CardActions>
    </Card>
  );
}
