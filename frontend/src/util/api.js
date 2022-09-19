import axios from "axios";

export const googleRequest = async (payload) => {
  let filteredResponse = {
    title: "Sorry :(",
    phonetic: "",
    synonyms: [],
    meanings: [],
  };

  try {
    const googleDictResponse = await axios.get(`/googl/${payload}/`);
    filteredResponse = googleDictResponse.data["definition"];
  } catch (err) {
    console.error(err);
  }

  return filteredResponse;
};

export const urbanRequest = async (payload) => {
  let filteredResponse = {
    word: "",
  };

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
  let filteredResponse = {
    title: "¯\\_(ツ)_/¯",
  };

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
  let filteredResponse = {
    title: payload,
    tweets: [],
  };

  try {
    const twitterResponse = await axios.get(`/twit/${payload}/`);
    filteredResponse.tweets = twitterResponse.data.tweets;
  } catch (err) {
    console.error(err);
  }

  return filteredResponse;
};
