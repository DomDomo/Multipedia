import os
from django.http import JsonResponse
from datetime import datetime
from TwitterSearch import *

from rest_framework import generics

from twit.models import TwitterSearch as TwitSearch
from twit.serializers import TwitterSearchSerializer

from dotenv import dotenv_values

config = dotenv_values(".env")


TWEET_NUM = 3


def twitter_request(payload):
    tweets = []

    try:
        tso = TwitterSearchOrder()

        tso.set_keywords([payload, "-filter:links", "-filter:quote"])
        tso.set_language("en")

        tso.set_result_type("popular")
        tso.set_include_entities(False)

        tso.set_count(3)

        tso.arguments.update({"tweet_mode": "extended"})

        ts = TwitterSearch(
            consumer_key=os.environ["TWITTER_API_KEY"],
            consumer_secret=os.environ["TWITTER_API_KEY_SECRET"],
            access_token=os.environ["TWITTER_ACCESS_TOKEN"],
            access_token_secret=os.environ["TWITTER_TOKEN_SECRET"],
        )

        for tweet in ts.search_tweets_iterable(tso):
            tweets.append(tweet)

    except TwitterSearchException as e:
        print("Twitter API exception: ", e)

    return tweets


def fix_date_style(tweet_date):
    normalized_datetime = datetime.strptime(
        tweet_date, "%a %b %d %H:%M:%S +0000 %Y")
    styled_datetime = datetime.strftime(
        normalized_datetime, "%#I:%M %p · %b %d, %Y")

    return styled_datetime

def http_to_https(image):
    return image.replace("http", "https", 1)


def get_tweets(payload):
    full_tweets = twitter_request(payload)

    formatted_tweets = []

    for tweet in full_tweets:
        formatted_tweets.append(
            {
                "id": tweet["id_str"],
                "date": fix_date_style(tweet["created_at"]),
                "name": tweet["user"]["name"],
                "screen_name": tweet["user"]["screen_name"],
                "profile_image": http_to_https(tweet["user"]["profile_image_url"]),
                "text": tweet["full_text"],
                "likes": tweet["favorite_count"],
            }
        )

    # Sort tweets by like count
    sorted_tweets = sorted(
        formatted_tweets, key=lambda tweet: tweet["likes"], reverse=True
    )

    # Updates each tweet so that the like number is a string with commas
    # {..., "likes": 123456789} => {..., "likes": "123,456,789"}
    styled_like_tweets = map(
        lambda tweet: {**tweet, "likes": f'{tweet["likes"]:,}'}, sorted_tweets
    )

    return list(styled_like_tweets)[:TWEET_NUM]


def twitter_api_view(request, payload):
    formatted_tweets = get_tweets(payload)
    return JsonResponse({"title": payload, "tweets": formatted_tweets})

class TwitterListAPIView(generics.ListAPIView):
    queryset = TwitSearch.objects.all()
    serializer_class = TwitterSearchSerializer