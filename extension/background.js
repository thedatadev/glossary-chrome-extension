// TODO:
//  - manage script and styling injection when the extension is toggled on/off

// Future reference:
//  - if you experience a flicker when inserting CSS, refer to this SO post
//    https://stackoverflow.com/questions/9345003/can-i-inject-a-css-file-programmatically-using-a-content-script-js-file 

chrome.browserAction.onClicked.addListener(function () {
    console.log('Clojure Glossary Chrome extension toggled!');
    chrome.tabs.executeScript(null, {file: "content.js"});
    chrome.tabs.insertCSS(null, {file: "content.css"});
});