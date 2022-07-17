import { Link } from "@mui/material";
import React from "react";

import reactStringReplace from "react-string-replace";
import { useNavigate } from "react-router-dom";
import { slugify } from "../util/helper";

// This function takes a string and adds links where the words are in brackets
const addLinks = (str, commitSearch) => {
  return reactStringReplace(str, /\[(.*?)\]/g, (match, i) => (
    <Link key={i} onClick={() => commitSearch(match)}>
      {match}
    </Link>
  ));
};

const LinkedText = (props) => {
  let navigate = useNavigate();

  const commitSearch = (search) => {
    navigate(`../result/${slugify(search)}`, {
      state: {
        search: search,
      },
    });
  };
  return <span>{addLinks(props.text, commitSearch)}</span>;
};

export default LinkedText;
