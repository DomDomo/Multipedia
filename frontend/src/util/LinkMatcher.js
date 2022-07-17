import React from "react";
import { Matcher } from "interweave";
import LinkedText from "../components/LinkedText";

export default class LinkMatcher extends Matcher {
  match(string) {
    return this.doMatch(string, /\[(.*?)\]/, () => ({}));
  }

  replaceWith(children, props) {
    return <LinkedText {...props} text={children} />;
  }

  asTag() {
    return "span";
  }
}
