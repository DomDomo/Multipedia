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
    .catch((err) => console.error(err));
};

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
  const doubleBrackets = /\[\[(.*?)\]\]/g;
  const linksInParagraph = [...linkData.matchAll(doubleBrackets)].map((link) =>
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
  summaryData = summaryData.replace(/]s/g, "s]");

  return summaryData;
};

const makeMayReferToPage = (allTitles, content) => {
  let noListContent = content.split("</p>")[0];
  noListContent = noListContent + "</p>";

  let htmlTitles = "";
  allTitles.slice(1).forEach((titleData) => {
    let htmlTitle = `<li>[${titleData["title"]}]</li>`;
    htmlTitles = htmlTitles.concat("\n", htmlTitle);
  });

  let listWithLinks = `<ul>${htmlTitles}\n</ul>`;

  return noListContent + listWithLinks;
};

export const wikiRequest = async (payload) => {
  const wikiTitlesURL = `https://en.wikipedia.org/w/api.php?origin=*&format=json&action=query&list=search&srsearch=${payload}`;

  const wikiSummaryURL = "https://en.wikipedia.org/api/rest_v1/page/summary/";
  const wikiLinkURL =
    "https://en.wikipedia.org/w/api.php?origin=*&format=json&action=parse&prop=wikitext&section=0&page=";

  let filteredResponse = {};

  try {
    const titlesResponse = await axios.get(wikiTitlesURL);
    const firstItemTitle = titlesResponse.data["query"]["search"][0]["title"];
    const [summaryResponse, linkResponse] = await axios.all([
      axios.get(wikiSummaryURL + firstItemTitle),
      axios.get(wikiLinkURL + firstItemTitle),
    ]);

    const summaryData = summaryResponse.data;
    const linkData = linkResponse.data["parse"]["wikitext"]["*"];

    let formattedContent = addLinksToSummary(
      summaryData["extract_html"],
      linkData
    );

    filteredResponse.title = summaryData["title"];
    filteredResponse.content = formattedContent;

    if (summaryData["extract_html"].includes("may refer to:")) {
      let betterMayReferToContent = makeMayReferToPage(
        titlesResponse.data["query"]["search"],
        formattedContent
      );
      filteredResponse.content = betterMayReferToContent;
    }

    return filteredResponse;
  } catch (err) {
    console.error(err);
  }
};
