import axios from "axios";
import { objIsEmpty } from "./helper";

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

export const findDefinition = (slug) => {
  let filteredResponse = {};

  try {
    const response = axios.get(`/api/${slug}/`);
    filteredResponse = response;
  } catch (err) {
    console.error(err);
  }

  return filteredResponse;
};

export const postDefinition = (term, slug, definition) => {
  if (!definition.new) return;
  let defClone = structuredClone(definition);

  let newDef = {
    term: term,
    slug: slug,
  };

  if (!objIsEmpty(defClone.google)) newDef["google_search"] = defClone.google;
  if (!objIsEmpty(defClone.urban)) newDef["urban_search"] = defClone.urban;
  if (!objIsEmpty(defClone.wiki)) newDef["wiki_search"] = defClone.wiki;
  if (!objIsEmpty(defClone.twitter))
    newDef["twitter_search"] = defClone.twitter;

  // Saving JSON to SQLite DB so have to convert to string
  if (!objIsEmpty(defClone.google))
    newDef.google_search.content = JSON.stringify(newDef.google_search.content);
  if (!objIsEmpty(defClone.twitter))
    newDef.twitter_search.tweets = JSON.stringify(newDef.twitter_search.tweets);

  axios({
    method: "post",
    url: "api/",
    baseURL: "/",
    data: newDef,
  });
};
