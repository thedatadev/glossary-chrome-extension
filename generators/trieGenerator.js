const fs = require('fs');
const Trie = require('./trie.js');

function loadFile(filepath) {
    try {
        let fileJSON = JSON.parse(fs.readFileSync(filepath));
        console.log("Successfully read file: ", filepath);
        return fileJSON;
    } catch (error) {
        console.log("Could not read file: ", filepath);
        return nil
    }
}

function saveFile(filepath, data) {
    try {
        const _ = fs.writeFileSync(filepath, JSON.stringify(data));
        console.log("Successfully wrote file: ", filepath);
    } catch (error) {
        console.log("Could not write file: ", filepath);
    }
}

function main() {

    // // Scan the JSON file
    // const loadFilePath = "./clojure/glossary.json";
    // let glossaryJSON = loadFile(loadFilePath);

    // // Initialise a new Trie
    // let glossaryTrie = new Trie();

    // // Create a new entry for each (keyword, definition) pair in the glossary 
    // for (keyword in glossaryJSON) {
    //     let definition = glossaryJSON[keyword];
    //     glossaryTrie.insert(keyword, definition);
    // }

    // console.log(`The Trie has ${glossaryTrie.size} entries`);

    // Write the final glossary to disk
    let saveFilePath = "./clojure/trie.json";
    // saveFile(saveFilePath, glossaryTrie);


    let savedTrie = new Trie(loadFile(saveFilePath));
    let result_set = savedTrie.lookup("delay?");
    console.log("Looking for results based on: delay?")
    console.log(result_set);
    
}

main();
