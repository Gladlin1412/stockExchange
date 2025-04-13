from dotenv import load_dotenv
import os
import time
import requests
from polygon import RESTClient
import google.generativeai as genai

load_dotenv()

# Configure APIs
POLYGON_API_KEY = os.getenv("POLYGON_API_KEY")
client = RESTClient(api_key=POLYGON_API_KEY)

GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
genai.configure(api_key=GOOGLE_API_KEY)
model = genai.GenerativeModel('gemini-2.0-flash')

# The endpoint to which we'll PUT our JSON payload
# Use the host.docker.internal to access the host machine from within the container
ENDPOINT_URL = "http://host.docker.internal:5000/api/sentiment" 