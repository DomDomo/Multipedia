from django.http import JsonResponse
import requests
import re

from wiki.models import WikiSearch

from rest_framework import generics

from wiki.models import WikiSearch
from wiki.serializers import WikiSearchSerializer


WIKI_MAIN_URL = "https://en.wikipedia.org/w/api.php"

WIKI_SUMMARY_URL = "https://en.wikipedia.org/api/rest_v1/page/summary/"


def wiki_title_request(payload):
    params = {
        "format": "json",
        "action": "query",
        "list": "search",
        "srsearch": payload,
    }
    wiki_title_response = requests.get(WIKI_MAIN_URL, params=params)

    return wiki_title_response.json()


def wiki_summary_request(title):
    wiki_summary_response = requests.get(WIKI_SUMMARY_URL + title)
    return wiki_summary_response.json()


def wiki_link_request(title):
    params = {
        "format": "json",
        "action": "parse",
        "list": "search",
        "prop": "wikitext",
        "section": "0",
        "page": title,
    }
    wiki_link_response = requests.get(WIKI_MAIN_URL, params=params)
    return wiki_link_response.json()


def find_nested_links(text):
    nested = []
    depth = 0
    for c in text:
        if c == "[":
            depth += 1
        if depth >= 2:
            nested.append(c)
        if depth >= 2 and c == "]":
            nested.append("~~")
        if c == "]":
            depth -= 1

    return "".join(nested).split("~~")[:-1]


def make_may_refer_to_page(all_titles, content):
    no_list_content = content.split("</p>")[0]
    no_list_content += "</p>"

    html_titles = ""
    for title in all_titles[1:]:
        html_titles += f'<li>[{title["title"]}]</li>\n'

    list_with_links = f"<ul>{html_titles}\n</ul>"

    return no_list_content + list_with_links


def make_summary_with_links(summary_data, link_data):
    links_in_page = re.findall("\[\[(.*?)\]\]", link_data)

    # Remove links with pipes
    # "Cohort (statistics)|cohort" => "cohort"
    links_in_page = list(map(lambda link: link.split("|")[-1].strip(), links_in_page))

    # Remove empty and duplicate links
    links_in_page = list(
        dict.fromkeys([link for link in links_in_page if len(link) > 1])
    )

    # Filter out all non-relevant links by making sure that the words
    # in them are the same ones in the summary text
    links_in_summary = [link for link in links_in_page if link in summary_data]
    links_in_summary.sort(key=len, reverse=True)  # Longest links are set first

    # Add link format to the summary text
    # Cheese is a dairy... => Cheese is a [dairy]...
    for link in links_in_summary:
        summary_data = summary_data.replace(link, f"[{link}]")

    # Remove nested links: [Washington, [D.C.]] => [Washington, D.C.]
    for link in find_nested_links(summary_data):
        summary_data = summary_data.replace(link, f"{link[1:-1]}")

    # Fix plural links by adding the "s" in the link
    summary_data = summary_data.replace("]s", "s]")

    return summary_data


def get_wiki(payload):
    filteredResponse = {
        "title": "HTTP 404",
        "content": "See more at: [404]",
    }

    try:
        title_data = wiki_title_request(payload)
        first_title = title_data["query"]["search"][0]["title"]

        # Replace all / with %2F for titles such as "AC/DC" to work
        first_title = re.sub("/", "%2F", first_title)

        summary_data = wiki_summary_request(first_title)
        link_data = wiki_link_request(first_title)["parse"]["wikitext"]["*"]

        formatted_content = make_summary_with_links(
            summary_data["extract_html"], link_data
        )

        filteredResponse["title"] = summary_data["title"]
        filteredResponse["content"] = formatted_content

        if "may refer to:" in summary_data["extract_html"]:
            better_may_refer_to = make_may_refer_to_page(
                title_data["query"]["search"], formatted_content
            )
            filteredResponse["content"] = better_may_refer_to

    except Exception as e:
        print("Wikipedia API exception: ", e)

    return filteredResponse


def wiki_api_view(request, payload):
    best_wiki = get_wiki(payload)
    return JsonResponse({"wiki": best_wiki})

class WikiListAPIView(generics.ListAPIView):
    queryset = WikiSearch.objects.all()
    serializer_class = WikiSearchSerializer
