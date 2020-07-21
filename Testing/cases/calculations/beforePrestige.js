// Provides our assertion library - the set of tools used to judge if the code is working correctly.
// The handy reference:  https://www.chaijs.com/api/assert/
var assert = chai.assert;

function setSaveFromFixture(name) {
    // true:  'appends' the fixture so that our previous loads aren't lost.
    let saveToLoad = fixture.load(name, true)

    // Prevent offline loading.  (It's simpler; no need to wait for the calculator.)
    // Write an alternate version when targetting offline, as controlling _how much_ offline
    // will require .offlineTick manipulation.
    saveToLoad.offlinetick = Date.now();
    localStorage.setItem("Synergysave2", btoa(JSON.stringify(saveToLoad)));
}

// This test-specification format is due to use of Mocha.  https://mochajs.org/#getting-started
// describe - creates a named grouping of tests.  May be nested.
// it - a single unit test.
describe("Calculations:  before prestige", function() {
    // Runs this code once for the entire test grouping BEFORE any tests run
    before(function(done) {
        this.timeout(3000); // 6 seconds.

        window.setTimeout(done, 2500); // We give the page 2.5 seconds to load as a safety margin.

        // Now that the timeout is set, we can start loading things.
        fixture.setBase('');

        // Set the game to a clean state, no offline ticks.  They get in the way of test init.
        setSaveFromFixture("TestSaves/AtFirstPrestige.json");

        // Loads the actual test page.
        fixture.load("/index.html");
        loadSynergy();
    });

    after(function() {
        fixture.cleanup();
    });

    // ACTUAL TEST DEFINITIONS:  BEGIN! ----------------------------------
    // Note:  as the game's development continues and new perks and upgrades are added,
    // extra variants of checks may need to be added to existing tests

    it("correctly calculates total coin buildings earned", function() {
        calculateTotalCoinOwned(); // value saved to window.totalCoinOwned
        assert.equal(totalCoinOwned, 90 + 30 + 20 + 18 + 12); // FIXME:  stopped working when I removed the nested describe-block that had been loading the final save.
    })

    it("correctly calculates total accelerator boosts", function() {
        // Extreme early-game - no freebies.
        calculateTotalAcceleratorBoost();
        assert.closeTo(freeAcceleratorBoost, 0, 0.001);
        assert.closeTo(totalAcceleratorBoost, 0, 0.001);
    });

    it("correctly calculates the rune recycle EXP modifier", function() {
        // The only effect - a single rune 'level' in Thrift (b/c min 1)
        assert.closeTo(calculateRecycleMultiplier(), 1 / .99875, 0.001);
    });

    it("correctly calculates offering EXP per rune", function() {
        for(let r=0; r < 5; r++) { // Surprise!  This one's zero-based!
            assert.closeTo(calculateRuneExpGiven(r), 25 * calculateRecycleMultiplier(), 0.001);
        }
    });

    // No runes are accessible before prestige.
    // it("correctly calculates rune EXP needed to level", function() {
    //     for(let r=1; r <= 5; r++) {

    //     }
    // });

    it("correctly calculates rune caps", function() {
        // Caps cannot be raised before prestige.
        for(let r=1; r <= 5; r++) {
            assert.closeTo(calculateMaxRunes(r), 500, 0.001);
        }
    })

    it("correctly calculates offerings at prestige", function() {
        // 1 - offerings upon prestige.
        assert.closeTo(calculateOfferings(1), 14, 0.001);
    });

    // Obtainium not yet unlocked.
    // it("properly calculates obtainium upon reincarnation", function() {

    // })

    // We compute this because it can affect the game.
    it("correctly calculates automatic obtainium/s", function() {
        // A new player should really NOT be getting auto obt/s.
        assert.closeTo(calculateAutomaticObtainium(), 0, 0.001);
    });

    it("correctly calculates talisman effects", function() {
        calculateTalismanEffects();
        for(let i=1; i <= 7; i++) {
            for(let r=1; r <= 5; r++) {
                // Early game - talismans shouldn't affect ANYTHING.  Including runes.
                assert.closeTo(window["talisman" + i + "Effect"][r], 0, 0.001);
            }
        }
    });

    it("correctly calculates rune levels", function() {
        calculateRuneLevels();
        // No runes yet, so they default to level one effects.
        for(let i=1; i <= 5; i++) {
            assert.closeTo(window["rune" + i + "level"], 1, 0.001);
        }
    });

    it("correctly calculates bonus ant levels", function() {
        calculateAnts();

        // No ants / bonus ant opportunities yet, so the levels should all be zero.
        for(let i=1; i <= 12; i++) {
            assert.closeTo(window["bonusant" + i], 0, 0.001);
        }
    });

    it("correctly calculates ant ELO", function() {
        calculateAntSacrificeELO();

        assert.closeTo(antELO, 0, 0.001);
        assert.closeTo(effectiveELO, 0, 0.001);
    });

    it("correctly calculates cube blessings", function() {
        calculateCubeBlessings();

        // No cubes yet, so the multiplier should be 1.
        for(let i=1; i <= 10; i++) {
            assert.closeTo(cubeBonusMultiplier[i], 1, 0.001);
        }
    });

    // We're way too far from ascension to care here.
    // it("correctly calculates the ascension cube multiplier", function() {

    // });

    it("correctly calculates the time acceleration multiplier", function() {
        // No time acceleration effects should exist in the early game.
        assert.closeTo(calculateTimeAcceleration(), 1, 0.001);
    });

    // We're way too far from corruptions to care here.
    // it("correctly calculates total corruption points", function() {

    // });


    
    // TODO:  Define more cases!  Refer to Synergism.js's "updateAllMultiplier" and subsequent functions.

    // Also to do:  write equivalent tests for other save files!
});