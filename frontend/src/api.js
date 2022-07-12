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
      console.log(res.data["list"][0]["definition"]);
      return res.data["list"][0]["definition"];
    })
    .catch((err) => console.log(err));
};
