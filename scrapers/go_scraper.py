from bs4 import BeautifulSoup
from urllib.request import urlopen
import json

# Fetch html document
url = "https://golang.org/pkg/strings/"
html_doc = urlopen(url)
soup = BeautifulSoup(html_doc, 'html.parser')

# Accumulate keywords and definitions
glossary = {}
docstring_not_found = []
html_not_found = []

all_h2 = soup.find_all('h2')
all_methods = []

for h2 in all_h2:
    a = h2.find('a')
    if a:
        print(a.text)

# 1. find all h2 and h3

# 2. filter out the ones that don't contain an anchor tag

# 3. extract the text from the anchor tag

# 4. extract the text from the first paragraph that succeeds it

# 5. store the entry for (method, description)