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
