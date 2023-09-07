import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

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

const chatGptTheme = createTheme({
  typography: {
    allVariants: {
      color: "#D1D5DB",
      fontFamily: ["Söhne", "sans-serif"].join(","),
    },
    body1: {
      fontSize: 14,
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
  },
});

// This is a modified version of the ReactMarkdown component
// It returns just the contnet and not the wrapping <p> tag
const MarkdownRenderer = ({ content }) => {
  const CustomParagraph = ({ children }) => <>{children}</>;

  const components = {
    p: CustomParagraph,
  };

  return <ReactMarkdown components={components}>{content}</ReactMarkdown>;
};

const ChatGPTCard = ({ data }) => {
  const [result, setResult] = useState({
    prompt: "loading...",
    response: "loading...",
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
              {result.prompt}
            </Typography>
          }
        />
        <CardContent sx={{ paddingTop: 1 }}>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <MarkdownRenderer content={result.response} />
          </Typography>
        </CardContent>
      </Card>
    </ThemeProvider>
  );
};

export default ChatGPTCard;
