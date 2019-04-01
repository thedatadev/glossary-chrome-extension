// ---------------------------------------
//   Glossary & Entry Data Structures
// ---------------------------------------

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

    constructor(obj) {
        if (obj === null) {
            // The root of the Trie is an empty node
            this.root = new TrieNode()
            this.size = 0;
        } else {
            obj && Object.assign(this, obj);
        }
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
        while (!this.end_of_query_word(word, current_index) && this.current_node_contains_current_letter(word, current_index, current_node)) {

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
    
    end_of_query_word(word, current_index) {
        return current_index == word.length;
    }
    
    current_node_contains_current_letter(word, current_index, current_node) {
        return word[current_index] in current_node.children;
    }

}

// ---------------------------------------
//                Main code
// ---------------------------------------



// -------------- Function declarations -------------

function loadGlossary() {
    return new Promise((resolve, reject) => {
        fetch(chrome.runtime.getURL("glossary/trie.json"))
            .then(response => resolve(response.json()))
            .catch(err => reject(err));
    });
}

function display(entries, x, y) {
    /* Displays the popup in the new location
        with the current keyword and its definition */

    // remove popup contents if user highlights
    // successively without the previous popup
    while (popup.firstChild) {
        popup.removeChild(popup.firstChild);
    }
    popup.style.opacity = 0;

    // Delta values ensures the popup always  
    // appears under the user's cursor
    const Ydelta = -50;
    const Xdelta = -50;
    popup.style.position = 'absolute';
    popup.style.top = Ydelta + y + "px";
    popup.style.left = Xdelta + x + "px";
    popup.style.display = 'inline-block';

    // Create new HTML elements for each entry in reverse
    // so that longer keywords are at the top of the list
    for (let i = entries.length - 1; i >= 0; i--) {

        const newEntriesList = document.createElement('ul');

        const newEntry = document.createElement('li');
        newEntry.classList.add('glossary-entry');

        const newKeyword = document.createElement('div');
        newKeyword.classList.add('glossary-keyword');
        newKeyword.innerText = entries[i].keyword;

        const newDefinition = document.createElement('p');
        newDefinition.classList.add('glossary-definition');
        newDefinition.innerText = entries[i].definition;

        newEntriesList.appendChild(newKeyword);
        newEntriesList.appendChild(newDefinition);

        popup.appendChild(newEntriesList);
    }

    popup.style.opacity = 1;
}

// --------- Instantiate required variables ----------

// Load the glossary in the /glossary directory
let glossary;
loadGlossary()
    .then(function(result) {
        glossary = new Trie(result);
    })
    .catch(function(error) {
        console.log(error);
    });

// Inject the popup div into the current webpage
const popup = document.createElement("div");
popup.id = "glossary-popup";
document.getElementsByTagName('body')[0].appendChild(popup);


// ------------ Register event listeners -------------

document.addEventListener("mouseup", function(e) {
    
    //Get highlighted text
    const keyword = window.getSelection().toString();
    if (keyword.length > 0) {
        const entries = glossary.lookup(keyword);
        if (entries.length > 0) {
            console.log(`Entries found for: ${keyword}`);
            console.log(entries);
            display(entries, e.pageX, e.pageY);
        } else {
            console.log(`No entries found for: ${keyword}`);
        }
    }
});

popup.addEventListener("mouseleave", function(e) {

    // Make popup disappear
    popup.style.position = 'static';
    popup.style.display = 'none';
    popup.style.top = "0px";
    popup.style.left = "0px";
    popup.style.opacity = 0;

    // Remove all entries from popup element
    while (popup.firstChild) {
        popup.removeChild(popup.firstChild);
    }

});


