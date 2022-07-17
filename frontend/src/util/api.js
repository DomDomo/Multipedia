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

const addLinksToSummary = (summaryData, linkData) => {
  const pageId = Object.keys(linkData.query.pages)[0];
  const wikiPage =
    linkData["query"]["pages"][pageId]["revisions"]["0"]["slots"]["main"]["*"];
  const regexp = /\[\[(.*?)\]\]/g;
  const allLinksInPage = [...wikiPage.matchAll(regexp)].map((link) =>
    link[0].slice(2, -2).split("|").at(-1).trim()
  );

  const noDupOrEmptyLinks = [
    ...new Set(allLinksInPage.filter((link) => link.length > 0)),
  ];

  noDupOrEmptyLinks.forEach((element) => {
    summaryData = summaryData.replace(element, `[${element}]`);
  });

  return summaryData;
};

export const wikiRequest = (payload) => {
  const titleOptions = {
    method: "GET",
    url: `https://en.wikipedia.org/w/api.php?origin=*&action=query&format=json&list=search&srsearch=${payload}`,
  };

  const wikiSummaryURL = "https://en.wikipedia.org/api/rest_v1/page/summary/";
  const wikiLinkURL =
    "https://en.wikipedia.org/w/api.php?origin=*&format=json&action=query&prop=revisions&rvprop=content&rvslots=*&titles=";

  return axios.request(titleOptions).then((res) => {
    let firstItemTitle = res.data["query"]["search"][0]["title"];
    const requestSummary = axios.get(wikiSummaryURL + firstItemTitle);
    const requestLinks = axios.get(wikiLinkURL + firstItemTitle);
    return axios
      .all([requestSummary, requestLinks])

      .then(
        axios.spread((...responses) => {
          const summaryResponse = responses[0].data;
          const linkResponse = responses[1].data;

          let filteredResponse = {
            title: summaryResponse["title"],
            content: addLinksToSummary(
              summaryResponse["extract_html"],
              linkResponse
            ),
          };
          return filteredResponse;
        })
      )
      .catch((err) => console.log(err));
  });
};
