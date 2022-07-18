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

// const findFirstParagraph = (summary, wikiText) => {
//   let summaryWords = summary.replace(/<[^>]*>?/gm, "").split(" "); // Remove HTML tags
//   summaryWords = summaryWords.filter((word) => !word.match(/[^\w\s]/g)); // Remove words with punctuation
//   const paragraphs = wikiText.split("\n");

//   console.log(paragraphs);
//   console.log(summaryWords);

//   // Choose the paragraps that has all the words that the summary has
//   const firstParagraph = paragraphs.filter((p) =>
//     summaryWords.every((word) => p.includes(word))
//   )[0];
//   console.log(firstParagraph);

//   return firstParagraph;
// };

const findNestedLinks = (text) => {
  let levels = [];
  let depth = 0;
  [...text].forEach((c) => {
    if (c === "[") depth++;
    if (depth >= 2) levels.push(c);
    if (depth >= 2 && c === "]") levels.push("~~");
    if (c === "]") depth--;
  });
  return levels.join("").split("~~").slice(0, -1);
};

const addLinksToSummary = (summaryData, linkData) => {
  const wikiText = linkData["parse"]["wikitext"]["*"];
  const doubleBrackets = /\[\[(.*?)\]\]/g;
  const linksInParagraph = [...wikiText.matchAll(doubleBrackets)].map((link) =>
    link[0].slice(2, -2).split("|").at(-1).trim()
  );

  // Find all links from received wikitext in the [[SOME_LINK]] format
  let allLinks = [
    ...new Set(linksInParagraph.filter((link) => link.length > 1)),
  ];

  // Filter out all non-relevant links by making sure that the words
  // in them are the same ones in the summary text
  let possibleLinks = allLinks.filter((link) => summaryData.includes(link));
  possibleLinks.sort((a, b) => b.length - a.length);

  // Add link format to the summary text
  // Cheese is a dairy... => Cheese is a [dairy]...
  possibleLinks.forEach((link) => {
    summaryData = summaryData.replace(link, `[${link}]`);
  });

  // Remove nested links: [Washington, [D.C.]] => [Washington, D.C.]
  findNestedLinks(summaryData).forEach((link) => {
    summaryData = summaryData.replace(link, `${link.slice(1, -1)}`);
  });

  // Fix plural links by adding the "s" in the link
  console.log(summaryData);
  summaryData = summaryData.replace(/]s/g, "s]");

  return summaryData;
};

export const wikiRequest = (payload) => {
  const titleOptions = {
    method: "GET",
    url: `https://en.wikipedia.org/w/api.php?origin=*&format=json&action=query&list=search&srsearch=${payload}`,
  };

  const wikiSummaryURL = "https://en.wikipedia.org/api/rest_v1/page/summary/";
  const wikiLinkURL =
    "https://en.wikipedia.org/w/api.php?origin=*&format=json&action=parse&prop=wikitext&section=0&page=";

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
