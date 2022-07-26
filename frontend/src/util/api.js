import axios from "axios";

export const googleRequest = async (payload) => {
  const googleDictURL = "https://api.dictionaryapi.dev/api/v2/entries/en/";

  let filteredResponse = {
    title: "Sorry :(",
    phonetic: "",
    synonyms: [],
    meanings: [],
  };

  try {
    const googleDictResponse = await axios.get(googleDictURL + payload);
    const termData = googleDictResponse.data[0];

    filteredResponse.title = termData.word;
    filteredResponse.phonetic = termData.phonetic;

    termData.meanings.forEach((singleMeaningData) => {
      let singleMeaning = {};
      let randomDefinitionIndex = Math.floor(
        Math.random() * singleMeaningData.definitions.length
      );
      let definitionData = singleMeaningData.definitions[randomDefinitionIndex];

      singleMeaning.definition = definitionData.definition;

      if ("example" in definitionData)
        singleMeaning.example = definitionData.example;

      if ("synonyms" in singleMeaningData)
        filteredResponse.synonyms = filteredResponse.synonyms.concat(
          singleMeaningData.synonyms.slice(0, 3)
        );

      singleMeaning.partOfSpeech = singleMeaningData.partOfSpeech;

      filteredResponse.meanings.push(singleMeaning);
    });
  } catch (err) {
    console.error(err);
  }

  return filteredResponse;
};

export const urbanRequest = async (payload) => {
  let filteredResponse = {
    word: "¯\\_(ツ)_/¯",
  };

  try {
    const urbanResponse = await axios.get(`/urban/${payload}/`);
    const bestDefinition = urbanResponse.data["definitions"];

    if (!bestDefinition) return filteredResponse;

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
