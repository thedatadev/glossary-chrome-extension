from bs4 import BeautifulSoup
from urllib.request import urlopen
import json

# Fetch html document
url = "https://clojuredocs.org"
html_doc = urlopen(url + "/quickref")
soup = BeautifulSoup(html_doc, 'html.parser')

# Accumulate keywords and definitions
glossary = {}
docstring_not_found = []
html_not_found = []

for dl_row in soup.find_all('div', class_='dl-row'):
  path = dl_row.a.get('href')
  keyword = dl_row.a.text
  try: # get the HTML
    html_spec = urlopen(url + path)
    spec_soup = BeautifulSoup(html_spec, 'html.parser')
    docstring = spec_soup.find_all('div', class_='docstring')[0]
    try: # find the docstring
      definition = docstring.pre.text
      glossary[keyword] = definition
    except:
      docstring_not_found.append(keyword)
  except:
    html_not_found.append(keyword)

# Write out as JSON file
with open("glossary.json", "w+") as f:
  f.write(json.dumps(glossary))

print("Scraping completed\n")

print("Could not find docstring for the following keywords:")
for keyword in docstring_not_found:
  print(keyword)

print("Could not find HTML for the following keywords:")
for keyword in html_not_found:
  print(keyword)
