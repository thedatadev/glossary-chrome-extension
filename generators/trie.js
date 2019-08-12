class TrieNode {
    constructor() {
        this.children = {};
        this.entry = {
            definition: '',
            end_of_word: false
        }
    }
}

module.exports = class Trie {

    constructor(obj) {
        if (obj === null) {
            // The root of the Trie is an empty node
            this.root = new TrieNode()
            this.size = 0;
        } else {
            obj && Object.assign(this, obj);
        }
        
    }

    insert(word, definition) {

        // To keep track of the current node and letter
        let current_node = this.root;
        let current_index = 0;
    
        // Create a node for each letter in the word
        while (!this.end_of_word(word, current_index)) {
    
            let current_letter = word[current_index];
            if (!(current_letter in current_node.children)) {
                current_node.children[current_letter] = new TrieNode();
            }
            current_node = current_node.children[current_letter];
            current_index++;
        }
    
        // At the final letter, create the entry
        current_node.entry.definition = definition;
        current_node.entry.end_of_word = true;

        this.size++;
    }
    
    lookup(word) {

        // To keep track of the current node and letter
        let current_node = this.root;
        let current_index = 0;
    
        // Collect results for all substrings of the word
        // e.g. a search for 'hello' may also return the 
        //      results for 'he' and 'hell'
        let result_set = [];
    
        // Traverse the Trie for as long as there are entries for each subsequent character in the word
        while (!this.end_of_word(word, current_index) && this.current_node_contains_current_letter(word, current_index, current_node)) {
    
            // Update the current node
            current_node = current_node.children[word[current_index]];
    
            // Check if there is an entry stored in that node
            if (current_node.entry.end_of_word) {
                result_set.push({
                    keyword: word.slice(0, current_index + 1),
                    definition: current_node.entry.definition
                });
            }
    
            // Move onto the next character
            current_index++;
        }

        return result_set;
    }
    
    end_of_word(word, current_index) {
        return current_index === word.length;
    }
    
    current_node_contains_current_letter(word, current_index, current_node) {
        return word[current_index] in current_node.children;
    }

}