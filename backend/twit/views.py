from django.http import JsonResponse

from dotenv import load_dotenv
import os

load_dotenv()


from TwitterSearch import *

def test_view(request, payload):
    tweets = []

    try:
        tso = TwitterSearchOrder() 

        tso.set_keywords([payload, "-filter:links", "-filter:quote"])
        tso.set_language('en') 
        
        tso.set_result_type("popular");
        tso.set_include_entities(False)

        tso.set_count(3)

        tso.arguments.update({'tweet_mode':'extended'})

        ts = TwitterSearch(
            consumer_key = os.getenv("TWITTER_API_KEY"),
            consumer_secret = os.getenv("TWITTER_API_KEY_SECRET"),
            access_token = os.getenv("TWITTER_ACCESS_TOKEN"),
            access_token_secret = os.getenv("TWITTER_TOKEN_SECRET")
        )

        # this is where the fun actually starts :)
        for tweet in ts.search_tweets_iterable(tso):
            filtered_tweet = '@%s tweeted: %s' % ( tweet['user']['screen_name'], tweet['full_text'] )
            tweets.append(filtered_tweet)
    except TwitterSearchException as e: # take care of all those ugly errors if there are some
        print(e)

    return JsonResponse({'tweets':tweets[:3]})

