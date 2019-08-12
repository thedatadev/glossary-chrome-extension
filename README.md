# Glossary Chrome Extension

## Description
A Google Chrome extension that allows you to lookup words on a webpage. The extension is dictionary-agnostic so that you can plug-in any dictionary you want. The dictionary is implemented as a .json file and follows a (term, definition) format, where term is the term you can lookup  on a webpage and definition is the information which gets displayed for that term. 

To use the extension, you activate it on the toolbar. Then, you simply highlight any term on the page. If there is a corresponding entry for that term, a popup is displayed containing the definition of that term. This also supports prefix lookups i.e. if you highlight "then" on the page, it will display definitions for both "then" and "the" assuming that "then" and "the" both have entries in the dictionary.