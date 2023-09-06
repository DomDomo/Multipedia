import React, { useEffect, useState } from "react";
import ChatGPT from "../../icons/chatGPT.svg";

import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  createTheme,
  ThemeProvider,
  Typography,
} from "@mui/material";
import LinkedText from "../LinkedText";

const chatGptTheme = createTheme({
  typography: {
    allVariants: {
      color: "#D1D5DB",
      fontFamily: ["Söhne", "sans-serif"].join(","),
    },
    body1: {
      fontSize: 13,
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "#444654",
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

const ChatGPTCard = ({ data }) => {
  const [result, setResult] = useState({
    word: "loading...",
    example: "loading...",
    definition: "loading...",
  });

  useEffect(() => {
    if (Object.keys(data).length !== 0) setResult(data);
  }, [data]);

  const handleRealWebsiteRedirect = () => {
    window.open("https://chat.openai.com/", "_blank");
  };

  return (
    <ThemeProvider theme={chatGptTheme}>
      <Card>
        <CardHeader
          sx={{ paddingBottom: 1 }}
          action={
            <CardMedia
              onClick={handleRealWebsiteRedirect}
              height="50"
              src={ChatGPT}
              component="img"
            />
          }
          title={
            <Typography sx={{ wordBreak: "break-word" }} variant="h5">
              What does "{result.word}" mean?
            </Typography>
          }
        />
        <CardContent sx={{ paddingTop: 1 }}>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <LinkedText text={result.definition} />
          </Typography>
        </CardContent>
      </Card>
    </ThemeProvider>
  );
};

export default ChatGPTCard;
