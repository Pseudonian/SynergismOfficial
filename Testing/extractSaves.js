/**
 * This script will 'decompress' any .txt saves placed within the TestSaves folder
 * into their unencoded JSON format for use with editing and testing.
 * 
 * Round-trips safely with the compressSaves script.
 */

let fs = require('fs'); // Short for "file system", this module gives access to file-system operations.
let atob = require('atob'); // Node doesn't naturally support the browser-based method.

let files = fs.readdirSync("./TestSaves");
files.forEach(function(file) {
    if(file.endsWith(".txt")) {
        let filenameBase = file.substring(0, file.lastIndexOf(".txt"));
        let fileContents = fs.readFileSync("./TestSaves/" + file); //, 'base64');
        
        let jsonText = atob(fileContents.toString());
        console.log(jsonText);
        
        let formattedText = JSON.stringify(JSON.parse(jsonText), null, '  ');

        let compressedFilename = filenameBase + ".json";
        fs.writeFileSync("./TestSaves/" + compressedFilename, formattedText);
    }
});