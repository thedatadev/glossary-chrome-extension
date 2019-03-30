const fs = require('fs');


const filename = "glossary.json";


function loadFile(filename) {

    fs.readFile(filename, function(err, data) {
        try {
            let fileJSON = JSON.parse(data);
            console.log("Successfully read file: ", filename);
            return fileJSON
        } catch (error) {
            console.log("Could not read file: ", filename);
            return nil
        }
    });

}

