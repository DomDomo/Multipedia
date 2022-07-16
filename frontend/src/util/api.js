import axios from "axios";

export const urbanRequest = (payload) => {
  const options = {
    method: "GET",
    url: "https://mashape-community-urban-dictionary.p.rapidapi.com/define",
    params: { term: payload },
    headers: {
      "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
      "X-RapidAPI-Host": "mashape-community-urban-dictionary.p.rapidapi.com",
    },
  };

  return axios
    .request(options)
    .then((res) => {
      if (res.data["list"].length <= 0) {
        return {
          word: String("¯\\_(ツ)_/¯"),
          definition: `Sorry, couldn't find: ${payload}`,
          example: "",
        };
      }
      let firstItem = res.data["list"][0];
      let filteredResponse = {
        word: firstItem["word"],
        definition: firstItem["definition"],
        example: firstItem["example"],
      };
      return filteredResponse;
    })
    .catch((err) => console.log(err));
};

export const wikiRequest = (payload) => {
  const titleOptions = {
    method: "GET",
    url: `https://en.wikipedia.org/w/api.php?origin=*&action=query&format=json&list=search&srsearch=${payload}`,
  };

  const wikiSummaryURL = "https://en.wikipedia.org/api/rest_v1/page/summary/";

  return axios
    .request(titleOptions)
    .then((res) => {
      let firstItemTitle = res.data["query"]["search"][0]["title"];
      return axios.get(wikiSummaryURL + firstItemTitle);
    })
    .then((res) => {
      let filteredResponse = {
        title: res.data["title"],
        content: res.data["extract_html"],
      };
      return filteredResponse;
    })
    .catch((err) => console.log(err));
};
