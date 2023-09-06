import os
from dotenv import dotenv_values

config = dotenv_values(".env")


def get_secret(key):
    secret_key = os.environ.get(key)

    if secret_key is not None and secret_key != '':
        return secret_key

    return config[key]
