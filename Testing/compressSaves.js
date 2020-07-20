/**
 * This script will 'compress' any .json saves placed within the TestSaves folder
 * into their encoded .txt format for use with game import and export.
 * 
 * Round-trips safely with the extractSaves script.
 */

let fs = require('fs'); // Short for "file system", this module gives access to file-system operations.
let btoa = require('btoa'); // Node doesn't naturally support the browser-based method.

let files = fs.readdirSync("./TestSaves");
files.forEach(function(file) {

    if(file.endsWith(".json")) {
        let filenameBase = file.substring(0, file.lastIndexOf(".json"));
        let fileContents = fs.readFileSync("./TestSaves/" + file);
        
        // Remove whitespace.
        fileContents = JSON.stringify(JSON.parse(fileContents));

        let compressedText = btoa(fileContents);

        let compressedFilename = filenameBase + ".txt";
        fs.writeFileSync("./TestSaves/" + compressedFilename, compressedText);
    }
});