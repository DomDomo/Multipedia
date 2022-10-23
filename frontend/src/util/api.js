import axios from "axios";

export const googleRequest = async (payload) => {
  let filteredResponse = {};

  try {
    const googleDictResponse = await axios.get(`/googl/${payload}/`);
    const googleDefinition = googleDictResponse.data["definition"];

    if (googleDefinition.content.meanings.length === 0) return filteredResponse;

    filteredResponse = googleDefinition;
  } catch (err) {
    console.error(err);
  }

  console.log("Filter");
  console.log(filteredResponse);
  return filteredResponse;
};

export const urbanRequest = async (payload) => {
  let filteredResponse = {};

  try {
    const urbanResponse = await axios.get(`/urban/${payload}/`);
    const bestDefinition = urbanResponse.data["definitions"];

    if (bestDefinition.length === 0) return filteredResponse;

    filteredResponse.word = bestDefinition[0]["word"];
    filteredResponse.definition = bestDefinition[0]["definition"];
    filteredResponse.example = bestDefinition[0]["example"];
  } catch (err) {
    console.error(err);
  }

  return filteredResponse;
};

export const wikiRequest = async (payload) => {
  let filteredResponse = {};

  try {
    const wikiResponse = await axios.get(`/wiki/${payload}/`);
    const bestWiki = wikiResponse.data["wiki"];

    filteredResponse = bestWiki;
  } catch (err) {
    console.error(err);
  }

  return filteredResponse;
};

export const twitterRequest = async (payload) => {
  let filteredResponse = {};

  try {
    const twitterResponse = await axios.get(`/twit/${payload}/`);
    const twitterTweets = twitterResponse.data;

    if (twitterTweets.tweets.length === 0) return filteredResponse;

    filteredResponse = twitterTweets;
  } catch (err) {
    console.error(err);
  }

  return filteredResponse;
};
