/**
 * This script will 'decompress' any .txt saves placed within the TestSaves folder
 * into their unencoded JSON format for use with editing and testing.
 * 
 * Round-trips safely with the compressSaves script.
 */

let fs = require('fs'); // Short for "file system", this module gives access to file-system operations.
let atob = require('atob'); // Node doesn't naturally support the browser-based method.

let files = fs.readdirSync("./TestSaves");

let clArgs = process.argv.slice(2);  // Drops the default environment vars, retrieving only specified filenames.

function printDocumentation() {
    console.log();
    console.log("extractSave - Decompresses saved Synergism .txt game files into");
    console.log("              a readable JSON format.  Files must be saved within");
    console.log("              the Testing/TestSaves folder for use with this script.");
    console.log();
    console.log("Options:")
    console.log("    --all     Decompresses _all_ .txt files within the TestSaves");
    console.log("              directory");
    console.log();
    console.log("    --files   Decompresses specific files; list them after --files.");
    console.log();
    console.log("              Example:  `extractSave --files CleanSave`");
    console.log("              -  extracts CleanStart.json from CleanStart.txt for import");
    console.log("                 from the live game's \"Export\" feature");
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
    if(file.endsWith(".txt")) {
        let filenameBase = file.substring(0, file.lastIndexOf(".txt"));

        if(args.length == 0) { // Empty filter array == no file filter.
            // nothing special to do here
        } else if(args.indexOf(filenameBase) >= 0) {
            argMatches[args.indexOf(filenameBase)] = true;
        } else if(args.indexOf(filenameBase + ".txt") >= 0) {
            argMatches[args.indexOf(filenameBase + ".txt")] = true;
        } else {
            // The user requested specific files, and this isn't one of them.
            return;
        }

        let fileContents = fs.readFileSync("./TestSaves/" + file); //, 'base64');
        let jsonText = atob(fileContents.toString());

        // TODO:  Consider advanced formatting.  Will require a fairly intricate
        //        handwritten function, but will make extracted saves easier to
        //        work with.
        let formattedText = JSON.stringify(JSON.parse(jsonText), null, '  ');

        let compressedFilename = filenameBase + ".json";
        fs.writeFileSync("./TestSaves/" + compressedFilename, formattedText);
    }
});

let success = true;

for(let i=0; i < args.length; i++) {
    if(!argMatches[i]) {
        throw new Error("Could not find decompressed save \"" + args[i] + "\".");
    }
}
