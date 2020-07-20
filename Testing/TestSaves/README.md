## To generate a test save: 
    1.  Import the save you want from an existing save file... or just play until you get the state you want.
    2.  In the Developer mode console, type `atob(localStorage.getItem("Synergysave2"))`
        - This returns the human-readable form of the `player` object, which may then be saved here as a JSON fixture.
        - If you want it "prettier", try `JSON.stringify(JSON.parse( atob(localStorage.getItem("Synergysave2")) ), null, '  ')`.
            - This will provide default indentation and line-breaks by re-stringifying the original save.
            - You'll probably still want to hand-adjust the achievement, research, etc array entries.
    3.  Copy the resulting string into a new file within this folder.  Remember the name you picked!

Alternatively:
    1.  Export a save from Synergism into the TestSaves folder, choosing a filename without spaces.
    2.  In your terminal / console of choice, navigate to the Testing folder.
    3.  Type `node extractSave --files your_filename_here`.
        - If done successfully, a matching `.json` file should result within the folder.
        - Alternatively, `node extractSave --all` will decompress all stored game saves.


## To re-import a test save into the game:
    1.  Load the fixture into a variable: `let saveToLoad = fixture.load("TestSaves/<name-you-picked>.json")`
        - Example:  `let saveToLoad = fixture.load("TestSaves/CleanStart.json")`.
    2.  Use the following to overwrite the game's save data in `localStorage`:  `localStorage.setItem("Synergysave2", btoa(JSON.stringify(saveToLoad)));`
    3.  Call `loadSynergy()`.

Alternatively:
    1.  In your terminal / console of choice, navigate to the Testing folder.
    2.  Type `node compressSave --files your_filename here`.
        - This should result in a matching `.txt` file.
        - Alternatively, `node compressSave -all` will repackage all stored `.json` files as game-compatible saves.
    3.  Import the resulting `.txt` save file into Synergism.