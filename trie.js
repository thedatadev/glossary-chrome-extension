class TrieNode {
    constructor() {
        this.children = {};
        this.entry = {
            definition: '',
            end_of_word: false
        }
    }
}

class Trie {
    constructor() {
        this.root = new TrieNode()
        this.insert = insert
        this.lookup = lookup
    }
}

function insert(word, definition) {

    let current_node = this.root;
    let current_index = 0;

    while (!end_of_word(word, current_index)) {

        let current_letter = word[current_index];
        if (!(current_letter in current_node.children)) {
            current_node.children[current_letter] = new TrieNode();
        }
        current_node = current_node.children[current_letter];
        current_index++;
    }

    current_node.entry.definition = definition;
    current_node.entry.end_of_word = true;
}

function lookup(word) {

    let current_node = this.root;
    let current_index = 0;

    let result_set = [];

    while (!end_of_word(word, current_index) && current_node_contains_letter(word, current_index, current_node)) {

        current_node = current_node.children[word[current_index]];

        if (current_node.entry.end_of_word) {
            result_set.push({
                word: word.slice(0, current_index + 1),
                definition: current_node.entry.definition
            });
        }

        current_index++;

    }

    return result_set;
}

function end_of_word(word, current_index) {
    return current_index === word.length;
}

function current_node_contains_letter(word, current_index, current_node) {
    return word[current_index] in current_node.children
}

function main() {

    let trie = new Trie();

    let glossary = {
        'hello': "a greeting in English",
        'hell': 'one place where I don\'t want to end up',
        'world': "the place we all live inside",
        'javascript': 'a programming language used to create websites'
    }

    // Insert words and definitions in glossary
    for (word in glossary) {
        let definition = glossary[word];
        trie.insert(word, definition);
    }

    // Lookup words in the glossary
    for (word in glossary) {
        let result_set = trie.lookup(word);

        console.log("Definitions for substring prefixes in the word: " + word);
        for (idx in result_set) {
            let definition = result_set[idx].definition;
            let word = result_set[idx].word;
            console.log(word + ": " + definition);
        }
        console.log();

    }
}

// ----------------
// Run program here
// ----------------

main();