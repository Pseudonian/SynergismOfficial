/**
 * This script will 'compress' any .json saves placed within the TestSaves folder
 * into their encoded .txt format for use with game import and export.
 * 
 * Round-trips safely with the extractSaves script.
 */

let fs = require('fs'); // Short for "file system", this module gives access to file-system operations.
let btoa = require('btoa'); // Node doesn't naturally support the browser-based method.

let files = fs.readdirSync("./TestSaves");

let clArgs = process.argv.slice(2);  // Drops the default environment vars, retrieving only specified filenames.

function printDocumentation() {
    console.log();
    console.log("compressSave - Compresses saved Synergism .txt game files into a readable");
    console.log("               JSON format.  Files must be saved within the");
    console.log("               Testing/TestSaves folder for use with this script.");
    console.log();
    console.log("Options:")
    console.log("    --all      Compresses _all_ .txt files within the TestSaves directory");
    console.log();
    console.log("    --files    Compresses specific files; list them after --files.");
    console.log();
    console.log("               Example:  `compressSave --files CleanSave`");
    console.log("               -  compresses CleanStart.json into CleanStart.txt for export");
    console.log("                  to the live game's \"Load game\" feature")
}

var args = [];
var argMatches = [];

if(clArgs.length == 0) {
    printDocumentation();
    return;
}

switch(clArgs[0]) {
    case "--all":
        args = [];
        break;
    case "--files":
        // Save the remainder of the arguments as the file list to process.
        clArgs.shift();
        args = clArgs;
        break;
    case "--help":
    case "-h":
    case "-?":
    default:
        printDocumentation();
        return;
}

files.forEach(function(file) {
    if(file.endsWith(".json")) {
        let filenameBase = file.substring(0, file.lastIndexOf(".json"));

        if(args.length == 0) { // Empty filter array == no file filter.
            // nothing special to do here
        } else if(args.indexOf(filenameBase) >= 0) {
            argMatches[args.indexOf(filenameBase)] = true;
        } else if(args.indexOf(filenameBase + ".json") >= 0) {
            argMatches[args.indexOf(filenameBase + ".json")] = true;
        } else {
            // The user requested specific files, and this isn't one of them.
            return;
        }

        let fileContents = fs.readFileSync("./TestSaves/" + file);
        
        // Remove whitespace.
        fileContents = JSON.stringify(JSON.parse(fileContents));

        let compressedText = btoa(fileContents);

        let compressedFilename = filenameBase + ".txt";
        fs.writeFileSync("./TestSaves/" + compressedFilename, compressedText);
    }
});

let success = true;

for(let i=0; i < args.length; i++) {
    if(!argMatches[i]) {
        throw new Error("Could not find decompressed save \"" + args[i] + "\".");
    }
}
