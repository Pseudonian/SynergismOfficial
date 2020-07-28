// Provides our assertion library - the set of tools used to judge if the code is working correctly.
// The handy reference:  https://www.chaijs.com/api/assert/
var assert = chai.assert;

function setSaveFromFixture(name) {
    // true:  'appends' the fixture so that our previous loads aren't lost.
    let saveToLoad = fixture.load(name, true)

    // Prevent offline loading.  (It's simpler; no need to wait for the calculator.)
    // Write an alternate version when targetting offline, as controlling _how much_ offline
    // will require .offlineTick manipulation.
    saveToLoad.offlinetick = Date.now() + 1000;
    localStorage.setItem("Synergysave2", btoa(JSON.stringify(saveToLoad)));
}

// This test-specification format is due to use of Mocha.  https://mochajs.org/#getting-started
// describe - creates a named grouping of tests.  May be nested.
// it - a single unit test.
describe("Calculations:  AtBoostWithCrystalUpgrade", function() {
    // Runs this code once for the entire test grouping BEFORE any tests run
    before(function(done) {
        this.timeout(3000); // 6 seconds.

        window.setTimeout(function() {
            calculateOffline = trueCalculateOffline;
            done();
        }, 2500); // We give the page 2.5 seconds to load as a safety margin.

        // Now that the timeout is set, we can start loading things.
        fixture.setBase('');

        // Set the game to a clean state, no offline ticks.  They get in the way of test init.
        setSaveFromFixture("TestSaves/AtBoostWithCrystalUpgrade.json");

        // Loads the actual test page.
        fixture.load("/index.html");
        
        let trueCalculateOffline = calculateOffline;
        calculateOffline = function() {} // disables offline calculations outright
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
        // hmm... seems to vary at load time.  :(
        assert.equal(totalCoinOwned, 935 + 461 + 303 + 224 + 177);
    })

    it("correctly calculates total accelerator boosts", function() {
        // Extreme early-game - no freebies.
        calculateTotalAcceleratorBoost();
        assert.closeTo(freeAcceleratorBoost, 2, 0.001);
        assert.closeTo(totalAcceleratorBoost, 3, 0.001);
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

    it("correctly calculates total rune EXP needed to level", function() {
        // Does not care about current rune EXP.
        let expectedRuneEXP = [383.328, 0.832, 1.872, 3.328, 208];
        for(let r=0; r < 5; r++) {
            assert.closeTo(calculateRuneExpToLevel(r), expectedRuneEXP[r], 0.001);
        }
    });

    it("correctly calculates rune caps", function() {
        // Caps cannot be raised before prestige.
        for(let r=1; r <= 5; r++) {
            assert.closeTo(calculateMaxRunes(r), 500, 0.001);
        }
    })

    it("correctly calculates offerings at prestige", function() {
        // 1 - offerings upon prestige.
        assert.closeTo(calculateOfferings(1), 0, 0.001);
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

        let expectedRuneLevels = [11, 1, 1, 1, 1]
        for(let i=0; i < 5; i++) {
            assert.closeTo(player.runelevels[i], expectedRuneLevels[i], 0.001);
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

    it("correctly calculates accelerators, boosts, and their effects [updateAllTick()]", function() {
        updateAllTick();
        assert.equal(freeAccelerator, 140, "Unexpected free accelerator count");
        assert.equal(totalAccelerator, 274, "Unexpected total accelerator count");
        assert.equal(freeAcceleratorBoost, 2, "Unexpected free accelerator boost count");
        assert.equal(totalAcceleratorBoost, 3, "Unexpected total accelerator boost count");
        assert.isTrue(acceleratorEffect.equals_tolerance(new Decimal("2.14133719e15"), 0.001), "Unexpected total accelerator effect");
    });

    it("correctly calculates multipliers and their effects [updateAllMultipliers()]", function() {
        updateAllMultiplier();
        assert.equal(freeMultiplier, 37, "Unexpected free multiplier count");
        assert.equal(totalMultiplier, 117, "Unexpected total multiplier count");
        assert.equal(freeMultiplierBoost, 0, "Unexpected free multiplier boost count");
        assert.equal(totalMultiplierBoost, 0, "Unexpected total multiplier boost count");
        assert.isTrue(multiplierEffect.equals_tolerance(new Decimal("1.66153499e35"), 0.001), "Unexpected total multiplier effect");
    });

    it("correctly calculates miscellaneous multipliers [multipliers()])", function() {
        multipliers();
        assert.isTrue(prestigeMultiplier.equals_tolerance(new Decimal("1.23359935502697e3"), 0.001), "Unexpected prestige multiplier");
        assert.closeTo(buildingPower, 1, 0.001, "Unexpected building power value");
        assert.isTrue(reincarnationMultiplier.equals_tolerance(new Decimal("1e0"), 0.001), "Unexpected reincarnation multiplier value");
        assert.isTrue(antMultiplier.equals_tolerance(new Decimal("1e0"), 0.001), "Unexpected ant multiplier value");

        assert.isTrue(globalCoinMultiplier.equals_tolerance(new Decimal("1.9030372116756216e64"), 0.001), "Unexpected global coin multiplier value");

        assert.isTrue(coinOneMulti.equals_tolerance(new Decimal("6.937431092693947e19"), 0.001), "Unexpected 'coin one' multiplier value");
        assert.isTrue(coinTwoMulti.equals_tolerance(new Decimal("3.886364070049174e10"), 0.001), "Unexpected 'coin two' multiplier value");
        assert.isTrue(coinThreeMulti.equals_tolerance(new Decimal("3.886364070049174e10"), 0.001), "Unexpected 'coin three' multiplier value");
        assert.isTrue(coinFourMulti.equals_tolerance(new Decimal("3.886364070049174e10"), 0.001), "Unexpected 'coin four' multiplier value");
        assert.isTrue(coinFiveMulti.equals_tolerance(new Decimal("3.886364070049174e10"), 0.001), "Unexpected 'coin five' multiplier value");

        assert.isTrue(globalCrystalMultiplier.equals_tolerance(new Decimal("5.166499e2"), 0.001), "Unexpected global crystal multiplier");
        assert.isTrue(globalMythosMultiplier.equals_tolerance(new Decimal("1e0"), 0.001), "Unexpected global mythos multiplier");
        assert.isTrue(grandmasterMultiplier.equals_tolerance(new Decimal("1e0"), 0.001), "Unexpected grandmaster multiplier");
        assert.isTrue(globalAntMult.equals_tolerance(new Decimal("1.00069e0"), 0.001), "Unexpected global ant (speed) multiplier");

        assert.isTrue(mythosupgrade13.equals_tolerance(new Decimal("1e0"), 0.001), "Unexpected multiplier for mythos upgrade 13");
        assert.isTrue(mythosupgrade14.equals_tolerance(new Decimal("1e0"), 0.001), "Unexpected multiplier for mythos upgrade 14");
        assert.isTrue(mythosupgrade15.equals_tolerance(new Decimal("1e0"), 0.001), "Unexpected multiplier for mythos upgrade 15");
    });

    it("correctly calculates tax effects", function() {
        calculatetax();
        assert.isTrue(taxdivisor.equals_tolerance(new Decimal("1.1648365e0"), 0.001), "Unexpected tax divisor");
        assert.isTrue(taxdivisorcheck.equals_tolerance(new Decimal("4.0324392229e31930"), 0.001), "Unexpected tax cap");
    });

    // Also to do:  write equivalent tests for other save files!
});