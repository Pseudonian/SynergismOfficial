function buyGenerator(i, state, auto) {
  if (i == 1 && player.prestigePoints.greaterThanOrEqualTo(1e12) && player.unlocks.generation == false) {
    player.unlocks.generation = true
  }
  var q = 100 + i
  let type = "transcendPoints"
  if (q <= 110 && q >= 106) {
    type = "coins"
  } else if (q <= 115) {
    type = "prestigePoints"
  }

  var cost = Decimal.pow(10, upgradeCosts[q])
  var achievementCheck = Math.max(player.upgrades[101], player.upgrades[102], player.upgrades[103], player.upgrades[104], player.upgrades[105])

  if (player.upgrades[q] == 0 && player[type].greaterThanOrEqualTo(cost)) {

    if (achievementCheck == 0) {
      if (q == 102) {
        achievementaward(71)
      }
      if (q == 103) {
        achievementaward(72)
      }
      if (q == 104) {
        achievementaward(73)
      }
      if (q == 105) {
        achievementaward(74)
      }
    }

    player[type] = player[type].sub(cost);
    player.upgrades[q] = 1;
    upgradeupdate(q, state)
  }

  if (!auto) {
    revealStuff()
  }
}

function buyAutobuyers(i, state) {
  var q = i + 80
  var type = ""
  if (q <= 87) {
    type = "prestigePoints"
  } else if (q <= 93) {
    type = "transcendPoints"
  } else {
    type = "reincarnationPoints"
  }

  var cost = Decimal.pow(10, upgradeCosts[q])
  if (player[type].greaterThanOrEqualTo(cost) && player.upgrades[q] == 0) {
    player[type] = player[type].sub(cost);
    player.upgrades[q] = 1;
    upgradeupdate(q, state);
  }
}

function autoUpgrades() {
  if (player.upgrades[90] > 0.5 && player.shoptoggles.generators == true) {

    var i;
    for (i = 1; i < 6; i++) {
      if (player.prestigePoints.greaterThanOrEqualTo(Decimal.pow(10, upgradeCosts[(100 + i)])) && player.shoptoggles.generators == true) {
        buyGenerator(i, true, true)
      }
    }
    var j;
    for (j = 6; j < 11; j++) {
      if (player.coins.greaterThanOrEqualTo(Decimal.pow(10, upgradeCosts[(100 + j)])) && player.shoptoggles.generators == true) {
        buyGenerator(j, true, true)
      }
    }
    var k;
    for (k = 11; k < 16; k++) {
      if (player.prestigePoints.greaterThanOrEqualTo(Decimal.pow(10, upgradeCosts[(100 + k)])) && player.shoptoggles.generators == true) {
        buyGenerator(k, true, true)
      }
    }
    var l;
    for (l = 16; l < 21; l++) {
      if (player.transcendPoints.greaterThanOrEqualTo(Decimal.pow(10, upgradeCosts[(100 + l)])) && player.shoptoggles.generators == true) {
        buyGenerator(l, true, true)
      }
    }
  }
  if (player.upgrades[91] > 0.5) {
    var i;
    for (i = 1; i < 21; i++) {
      if (player.coins.greaterThanOrEqualTo(Decimal.pow(10, upgradeCosts[i])) && player.shoptoggles.coin == true) {
        buyUpgrades('coin', i, true)
      }
    }
  }
  if (player.upgrades[92] > 0.5) {
    var i;
    for (i = 21; i < 38; i++) {
      if (player.prestigePoints.greaterThanOrEqualTo(Decimal.pow(10, upgradeCosts[i])) && player.shoptoggles.prestige == true) {
        buyUpgrades('prestige', i, true)
      }
    }
    if (player.prestigePoints.greaterThanOrEqualTo(Decimal.pow(10, 50000)) && player.shoptoggles.prestige == true && player.challengecompletions.seven > 0) {
      buyUpgrades('prestige', 38, true)
    }
    if (player.prestigePoints.greaterThanOrEqualTo(Decimal.pow(10, 100000)) && player.shoptoggles.prestige == true && player.challengecompletions.eight > 0) {
      buyUpgrades('prestige', 39, true)
    }
    if (player.prestigePoints.greaterThanOrEqualTo(Decimal.pow(10, 200000)) && player.shoptoggles.prestige == true && player.challengecompletions.nine > 0) {
      buyUpgrades('prestige', 40, true)
    }

  }
  if (player.upgrades[99] > 0.5) {
    var i;
    for (i = 41; i < 61; i++) {
      if (player.transcendPoints.greaterThanOrEqualTo(Decimal.pow(10, upgradeCosts[i])) && player.shoptoggles.transcend == true) {
        buyUpgrades('transcend', i, true)
      }
    }
  }

}

function autobuyBuildingTab() {
  if (player.toggles.one == true && player.upgrades[81] == 1 && player.coins.greaterThanOrEqualTo(player.firstCostCoin)) {
    buyMax('first', 'Coin', 1, 100)
  }
  if (player.toggles.two == true && player.upgrades[82] == 1 && player.coins.greaterThanOrEqualTo(player.secondCostCoin)) {
    buyMax('second', 'Coin', 2, 2e3)
  }
  if (player.toggles.three == true && player.upgrades[83] == 1 && player.coins.greaterThanOrEqualTo(player.thirdCostCoin)) {
    buyMax('third', 'Coin', 3, 4e4)
  }
  if (player.toggles.four == true && player.upgrades[84] == 1 && player.coins.greaterThanOrEqualTo(player.fourthCostCoin)) {
    buyMax('fourth', 'Coin', 4, 8e5)
  }
  if (player.toggles.five == true && player.upgrades[85] == 1 && player.coins.greaterThanOrEqualTo(player.fifthCostCoin)) {
    buyMax('fifth', 'Coin', 5, 1.6e7)
  }
  if (player.toggles.six == true && player.upgrades[86] == 1 && player.coins.greaterThanOrEqualTo(player.acceleratorCost)) {
    buyAccelerator(true);
  }
  if (player.toggles.seven == true && player.upgrades[87] == 1 && player.coins.greaterThanOrEqualTo(player.multiplierCost)) {
    buyMultiplier(true);
  }
  if (player.toggles.eight == true && player.upgrades[88] == 1 && player.prestigePoints.greaterThanOrEqualTo(player.acceleratorBoostCost)) {
    boostAccelerator(true);
  }
}

function autobuyCrystalProducers() {
  if (player.toggles.ten == true && player.achievements[78] == 1 && player.prestigePoints.greaterThanOrEqualTo(player.firstCostDiamonds)) {
    buyMax('first', 'Diamonds', 1, 1e2)
  }
  if (player.toggles.eleven == true && player.achievements[85] == 1 && player.prestigePoints.greaterThanOrEqualTo(player.secondCostDiamonds)) {
    buyMax('second', 'Diamonds', 3, 1e5)
  }
  if (player.toggles.twelve == true && player.achievements[92] == 1 && player.prestigePoints.greaterThanOrEqualTo(player.thirdCostDiamonds)) {
    buyMax('third', 'Diamonds', 6, 1e15)
  }
  if (player.toggles.thirteen == true && player.achievements[99] == 1 && player.prestigePoints.greaterThanOrEqualTo(player.fourthCostDiamonds)) {
    buyMax('fourth', 'Diamonds', 10, 1e40)
  }
  if (player.toggles.fourteen == true && player.achievements[106] == 1 && player.prestigePoints.greaterThanOrEqualTo(player.fifthCostDiamonds)) {
    buyMax('fifth', 'Diamonds', 15, 1e100)
  }
}

function checkAutoPrestige() {
  if (player.resettoggle1 == 1 || player.resettoggle1 == 0) {
    if (player.toggles.fifteen == true && player.achievements[43] == 1 && prestigePointGain.greaterThanOrEqualTo(player.prestigePoints.times(Decimal.pow(10, player.prestigeamount))) && player.coinsThisPrestige.greaterThanOrEqualTo(1e16)) {
      resetachievementcheck(1);
      reset(1, true)
    }
  }
  if (player.resettoggle1 == 2) {
    var time = Math.max(0.25, player.prestigeamount);
    if (player.toggles.fifteen == true && player.achievements[43] == 1 && player.prestigecounter >= time && player.coinsThisPrestige.greaterThanOrEqualTo(1e16)) {
      resetachievementcheck(1);
      reset(1, true);
    }
  }
}

function autobuyCrystalUpgrades() {
  var c = 0;
  c += Math.floor(rune3level / 10 * (1 + player.researches[5] / 10) * (1 + player.researches[21] / 800)) * 100 / 100
  if (player.upgrades[73] > 0.5 && player.currentChallengeRein !== "") {
    c += 10
  }
  if (player.achievements[79] > 0.5 && player.prestigeShards.greaterThanOrEqualTo(Decimal.pow(10, (crystalUpgradesCost[0] + crystalUpgradeCostIncrement[0] * Math.floor(Math.pow(player.crystalUpgrades[0] + 0.5 - c, 2) / 2))))) {
    player.prestigeShards = player.prestigeShards.sub(Decimal.pow(10, (crystalUpgradesCost[0] + crystalUpgradeCostIncrement[0] * Math.floor(Math.pow(player.crystalUpgrades[0] + 0.5 - c, 2) / 2))));
    player.crystalUpgrades[0] += 1;
  }
  if (player.achievements[86] > 0.5 && player.prestigeShards.greaterThanOrEqualTo(Decimal.pow(10, (crystalUpgradesCost[1] + crystalUpgradeCostIncrement[1] * Math.floor(Math.pow(player.crystalUpgrades[1] + 0.5 - c, 2) / 2))))) {
    player.prestigeShards = player.prestigeShards.sub(Decimal.pow(10, (crystalUpgradesCost[1] + crystalUpgradeCostIncrement[1] * Math.floor(Math.pow(player.crystalUpgrades[1] + 0.5 - c, 2) / 2))));
    player.crystalUpgrades[1] += 1;
  }
  if (player.achievements[93] > 0.5 && player.prestigeShards.greaterThanOrEqualTo(Decimal.pow(10, (crystalUpgradesCost[2] + crystalUpgradeCostIncrement[2] * Math.floor(Math.pow(player.crystalUpgrades[2] + 0.5 - c, 2) / 2))))) {
    player.prestigeShards = player.prestigeShards.sub(Decimal.pow(10, (crystalUpgradesCost[2] + crystalUpgradeCostIncrement[2] * Math.floor(Math.pow(player.crystalUpgrades[2] + 0.5 - c, 2) / 2))));
    player.crystalUpgrades[2] += 1;
  }
  if (player.achievements[100] > 0.5 && player.prestigeShards.greaterThanOrEqualTo(Decimal.pow(10, (crystalUpgradesCost[3] + crystalUpgradeCostIncrement[3] * Math.floor(Math.pow(player.crystalUpgrades[3] + 0.5 - c, 2) / 2))))) {
    player.prestigeShards = player.prestigeShards.sub(Decimal.pow(10, (crystalUpgradesCost[3] + crystalUpgradeCostIncrement[3] * Math.floor(Math.pow(player.crystalUpgrades[3] + 0.5 - c, 2) / 2))));
    player.crystalUpgrades[3] += 1;
  }
  if (player.achievements[107] > 0.5 && player.prestigeShards.greaterThanOrEqualTo(Decimal.pow(10, (crystalUpgradesCost[4] + crystalUpgradeCostIncrement[4] * Math.floor(Math.pow(player.crystalUpgrades[4] + 0.5 - c, 2) / 2))))) {
    player.prestigeShards = player.prestigeShards.sub(Decimal.pow(10, (crystalUpgradesCost[4] + crystalUpgradeCostIncrement[4] * Math.floor(Math.pow(player.crystalUpgrades[4] + 0.5 - c, 2) / 2))));
    player.crystalUpgrades[4] += 1;
  }
}