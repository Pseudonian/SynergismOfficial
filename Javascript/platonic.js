const platonicUpgradeDesc = {
    1: '+0.0075% cubes per corruption level per level!',
    2: '+0.015% tesseracts per corruption level per level!',
    3: '+0.045% hypercubes per corruption level per level!',
    4: 'Gain +2% platonic cubes per level if >2.5 Trillion Score!',
    5: 'C10 Exponent: 1.035 --> 1.0375, Constant tax exponent +0.10, 2x faster constant production, +5/+3 Challenge caps, +100% Obtainium/Offerings, ^1.10 coin gain in C15!',
    6: 'Raises corruption 1 and 2 exponent ^(1 + level/30), capacity of ^1 on Mult/Accel.',
    7: 'Raises speed below 1x to the power of ^(1 - level/30).',
    8: 'Divides challenge exponent requirements while Hyperchallenged corruption is active by (1 + 0.4 * level), with a minimum 1x challenge req. multiplier!',
    9: 'Multiplies the illiteracy corruption obtainium gain exponent based on held obtainum. Bonus increases to a maximum of *10 exponent at 1e100 held obtanium [Maximum total corruption exponent of ^1]! Also provides a +150% uncorruptable obtanium gain regardless of whether or not illiteracy is corrupted.',
    10: 'C10 Exponent: 1.0375 --> 1.04, Const. tax exponent +0.20 and 10x faster constant production, +5/+3 Challenge caps, +250% Obtainium and Offerings, +100% Cubes/Tesseracts/Hypercubes/Platonics for 5T/7.5T/10T/20T score. ^1.25 ant exponent in C15!',
    11: 'In Market Deflation 11 or higher with this upgrade, you will gain diamonds equal to particle gain when you reincarnate!',
    12: 'Gain (1 + lvl/100)x ant multiplier per challenge completion, ignoring corruptions to ants.',
    13: 'Effect of Drought is raised to the power of 0.5.',
    14: 'Increases coin exponent in C15 up to maximum of 55% more exponent.',
    15: 'I suppose that, after all, we all are Everywhere at the End of Time.'
}

var platUpgradeBaseCosts = {
    1: {
        obtainium: 1e70,
        offerings: 1e45,
        cubes: 1e13,
        tesseracts: 1e6,
        hypercubes: 1e5,
        platonics: 1e4,
        abyssals: 0,
        maxLevel: 100
    },
    2: {
        obtainium: 3e70,
        offerings: 2e45,
        cubes: 1e11,
        tesseracts: 1e8,
        hypercubes: 1e5,
        platonics: 1e4,
        abyssals: 0,
        maxLevel: 100
    },
    3: {
        obtainium: 1e71,
        offerings: 4e45,
        cubes: 1e11,
        tesseracts: 1e6,
        hypercubes: 1e7,
        platonics: 1e4,
        abyssals: 0,
        maxLevel: 100
    },
    4: {
        obtainium: 4e71,
        offerings: 1e46,
        cubes: 1e12,
        tesseracts: 1e7,
        hypercubes: 1e6,
        platonics: 1e6,
        abyssals: 0,
        maxLevel: 100
    },
    5: {
        obtainium: 1e80,
        offerings: 1e60,
        cubes: 1e14,
        tesseracts: 1e9,
        hypercubes: 1e8,
        platonics: 1e7,
        abyssals: 0,
        maxLevel: 1
    },
    6: {
        obtainium: 1e82,
        offerings: 1e61,
        cubes: 1e15,
        tesseracts: 1e9,
        hypercubes: 1e8,
        platonics: 1e7,
        abyssals: 0,
        maxLevel: 10
    },
    7: {
        obtainium: 1e84,
        offerings: 3e62,
        cubes: 2e15,
        tesseracts: 2e9,
        hypercubes: 2e8,
        platonics: 1.5e7,
        abyssals: 0,
        maxLevel: 15
    },
    8: {
        obtainium: 1e87,
        offerings: 1e64,
        cubes: 4e15,
        tesseracts: 4e9,
        hypercubes: 4e8,
        platonics: 3e7,
        abyssals: 0,
        maxLevel: 5
    },
    9: {
        obtainium: 1e90,
        offerings: 1e66,
        cubes: 1e16,
        tesseracts: 1e10,
        hypercubes: 1e9,
        platonics: 5e7,
        abyssals: 0,
        maxLevel: 1
    },
    10: {
        obtainium: 1e93,
        offerings: 1e68,
        cubes: 1e18,
        tesseracts: 1e12,
        hypercubes: 1e11,
        platonics: 1e9,
        abyssals: 0,
        maxLevel: 1
    },
    11: {
        obtainium: 2e96,
        offerings: 1e70,
        cubes: 2e17,
        tesseracts: 2e11,
        hypercubes: 2e10,
        platonics: 2e8,
        abyssals: 0,
        maxLevel: 1
    },
    12: {
        obtainium: 1e100,
        offerings: 1e72,
        cubes: 1e18,
        tesseracts: 1e12,
        hypercubes: 1e11,
        platonics: 1e9,
        abyssals: 0,
        maxLevel: 10
    },
    13: {
        obtainium: 2e104,
        offerings: 1e74,
        cubes: 2e19,
        tesseracts: 4e12,
        hypercubes: 4e11,
        platonics: 4e9,
        abyssals: 0,
        maxLevel: 1
    },
    14: {
        obtainium: 1e108,
        offerings: 1e77,
        cubes: 4e20,
        tesseracts: 1e13,
        hypercubes: 1e12,
        platonics: 1e10,
        abyssals: 0,
        maxLevel: 1
    },
    15: {
        obtainium: 1e115,
        offerings: 1e80,
        cubes: 1e23,
        tesseracts: 1e15,
        hypercubes: 1e14,
        platonics: 1e12,
        abyssals: 1,
        maxLevel: 1
    }
}

function checkPlatonicUpgrade(index) {
    let checksum = 0
    let resources = ['obtainium', 'offerings', 'cubes', 'tesseracts', 'hypercubes', 'platonics', 'abyssals']
    let resourceNames = ['researchPoints', 'runeshards', 'wowCubes', 'wowTesseracts', 'wowHypercubes', 'wowPlatonicCubes', 'wowAbyssals']
    let checks = {
        obtainium: false,
        offerings: false,
        cubes: false,
        tesseracts: false,
        hypercubes: false,
        platonics: false,
        abyssals: false,
        canBuy: false,
    }
    for (var i = 0; i < resources.length; i++) {
        if (platUpgradeBaseCosts[index][resources[i]] <= player[resourceNames[i]]) {
            checksum++;
            checks[resources[i]] = true
        }
    }
    if (checksum === resources.length && player.platonicUpgrades[index] < platUpgradeBaseCosts[index].maxLevel) {
        checks.canBuy = true
    }
    return checks
}

function createPlatonicDescription(index) {
    let maxLevelAppend = "";
    if (player.platonicUpgrades[index] === platUpgradeBaseCosts[index].maxLevel) {
        maxLevelAppend = " [MAX]"
    }
    let resourceCheck = checkPlatonicUpgrade(index);
    document.getElementById('platonicUpgradeDescription').textContent = platonicUpgradeDesc[index];
    document.getElementById('platonicUpgradeLevel').textContent = "Level: " + format(player.platonicUpgrades[index]) + "/" + format(platUpgradeBaseCosts[index].maxLevel) + maxLevelAppend
    document.getElementById('platonicOfferingCost').textContent = format(player.runeshards) + "/" + format(platUpgradeBaseCosts[index].offerings) + " Offerings"
    document.getElementById('platonicObtainiumCost').textContent = format(player.researchPoints) + "/" + format(platUpgradeBaseCosts[index].obtainium) + " Obtainium"
    document.getElementById('platonicCubeCost').textContent = format(player.wowCubes) + "/" + format(platUpgradeBaseCosts[index].cubes) + " Wow! Cubes"
    document.getElementById('platonicTesseractCost').textContent = format(player.wowTesseracts) + "/" + format(platUpgradeBaseCosts[index].tesseracts) + " Wow! Tesseracts"
    document.getElementById('platonicHypercubeCost').textContent = format(player.wowHypercubes) + "/" + format(platUpgradeBaseCosts[index].hypercubes) + " Wow! Hypercubes"
    document.getElementById('platonicPlatonicCost').textContent = format(player.wowPlatonicCubes) + "/" + format(platUpgradeBaseCosts[index].platonics) + " Platonic! Cubes"
    document.getElementById('platonicHepteractCost').textContent = format(player.wowAbyssals) + "/" + format(platUpgradeBaseCosts[index].abyssals) + " Hepteracts of the Abyss"

    resourceCheck.offerings ?
        document.getElementById('platonicOfferingCost').style.color = "lime" :
        document.getElementById('platonicOfferingCost').style.color = "crimson";

    resourceCheck.obtainium ?
        document.getElementById('platonicObtainiumCost').style.color = "lime" :
        document.getElementById('platonicObtainiumCost').style.color = "crimson";

    resourceCheck.cubes ?
        document.getElementById('platonicCubeCost').style.color = "lime" :
        document.getElementById('platonicCubeCost').style.color = "crimson";

    resourceCheck.tesseracts ?
        document.getElementById('platonicTesseractCost').style.color = "lime" :
        document.getElementById('platonicTesseractCost').style.color = "crimson";

    resourceCheck.hypercubes ?
        document.getElementById('platonicHypercubeCost').style.color = "lime" :
        document.getElementById('platonicHypercubeCost').style.color = "crimson";

    resourceCheck.platonics ?
        document.getElementById('platonicPlatonicCost').style.color = "lime" :
        document.getElementById('platonicPlatonicCost').style.color = "crimson";

    resourceCheck.abyssals ?
        document.getElementById('platonicHepteractCost').style.color = "lime" :
        document.getElementById('platonicHepteractCost').style.color = "crimson";

    if (player.platonicUpgrades[index] < platUpgradeBaseCosts[index].maxLevel) {
        document.getElementById('platonicUpgradeLevel').style.color = 'cyan'
        resourceCheck.canBuy ?
            (document.getElementById('platonicCanBuy').style.color = "gold", document.getElementById('platonicCanBuy').textContent = "===Affordable! Click to buy!===") :
            (document.getElementById('platonicCanBuy').style.color = "crimson", document.getElementById('platonicCanBuy').textContent = "===You cannot afford this!===");
    }

    if (player.platonicUpgrades[index] === platUpgradeBaseCosts[index].maxLevel) {
        document.getElementById('platonicUpgradeLevel').style.color = 'gold'
        document.getElementById('platonicCanBuy').style.color = "orchid"
        document.getElementById('platonicCanBuy').textContent = "===Maxed==="
    }
}

function buyPlatonicUpgrades(index) {
    let resourceCheck = checkPlatonicUpgrade(index)
    if (resourceCheck.canBuy) {
        player.platonicUpgrades[index] += 1
        player.researchPoints -= platUpgradeBaseCosts[index].obtainium
        player.runeshards -= platUpgradeBaseCosts[index].offerings
        player.wowCubes -= platUpgradeBaseCosts[index].cubes
        player.wowTesseracts -= platUpgradeBaseCosts[index].tesseracts
        player.wowHypercubes -= platUpgradeBaseCosts[index].hypercubes
        player.wowPlatonicCubes -= platUpgradeBaseCosts[index].platonics
        player.wowAbyssals -= platUpgradeBaseCosts[index].abyssals
    }
    createPlatonicDescription(index)
}