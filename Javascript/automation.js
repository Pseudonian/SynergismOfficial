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

function autoGenerators() {
  if (player.upgrades[90] && player.shoptoggles.generators) {
    for (let i = 1; i < 6; i++) {
      if (player.prestigePoints.greaterThanOrEqualTo(Decimal.pow(10, upgradeCosts[(100 + i)]))) {
        buyGenerator(i, true, true)
      }
    }
    for (let i = 6; i < 11; i++) {
      if (player.coins.greaterThanOrEqualTo(Decimal.pow(10, upgradeCosts[(100 + i)]))) {
        buyGenerator(i, true, true)
      }
    }
    for (let i = 11; i < 16; i++) {
      if (player.prestigePoints.greaterThanOrEqualTo(Decimal.pow(10, upgradeCosts[(100 + i)]))) {
        buyGenerator(i, true, true)
      }
    }
    for (let i = 16; i < 21; i++) {
      if (player.transcendPoints.greaterThanOrEqualTo(Decimal.pow(10, upgradeCosts[(100 + i)]))) {
        buyGenerator(i, true, true)
      }
    }
  }
}

function autoUpgrades() {
  autoGenerators()
  if (player.upgrades[91] && player.shoptoggles.coin) {
    for (let i = 1; i < 21; i++) {
      if (player.coins.greaterThanOrEqualTo(Decimal.pow(10, upgradeCosts[i]))) {
        buyUpgrades('coin', i, true)
      }
    }
  }
  if (player.upgrades[92] && player.shoptoggles.prestige) {
    for (let i = 21; i < 38; i++) {
      if (player.prestigePoints.greaterThanOrEqualTo(Decimal.pow(10, upgradeCosts[i]))) {
        buyUpgrades('prestige', i, true)
      }
    }
    if (player.prestigePoints.greaterThanOrEqualTo(Decimal.pow(10, 50000)) && player.challengecompletions.seven > 0) {
      buyUpgrades('prestige', 38, true)
    }
    if (player.prestigePoints.greaterThanOrEqualTo(Decimal.pow(10, 100000)) && player.challengecompletions.eight > 0) {
      buyUpgrades('prestige', 39, true)
    }
    if (player.prestigePoints.greaterThanOrEqualTo(Decimal.pow(10, 200000)) && player.challengecompletions.nine > 0) {
      buyUpgrades('prestige', 40, true)
    }
  }
  if (player.upgrades[99] && player.shoptoggles.transcend) {
    for (let i = 41; i < 61; i++) {
      if (player.transcendPoints.greaterThanOrEqualTo(Decimal.pow(10, upgradeCosts[i]))) {
        buyUpgrades('transcend', i, true)
      }
    }
  }

}

function autobuyBuildingTab() {
  for (let i = 0; i < 5; i++) {
    if (player.toggles[cardinals[i]] && player.upgrades[81+i] && player.coins.greaterThanOrEqualTo(player[`${ordinals[i]}CostCoin`])) {
      buyMax(ordinals[i], "Coin", i+1, coinProducerInitCosts[i])
    }
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
  for (let i = 0; i < 5; i++) {
    if (player.toggles[cardinals[9+i]] && player.achievements[78+7*i] && player.prestigePoints.greaterThanOrEqualTo(player[`${ordinals[i]}CostDiamonds`])) {
      buyMax(ordinals[i], "Diamonds", 1 / 2 * (Math.pow(i + 1, 2) + i + 1), diamondProducerInitCosts[i])
    }
  }
}

function checkAutoPrestige() {
  if (player.resettoggle1 == 1 || player.resettoggle1 == 0) {
    if (player.toggles.fifteen == true && player.achievements[43] == 1 && prestigePointGain.greaterThanOrEqualTo(player.prestigePoints.times(Decimal.pow(10, player.prestigeamount))) && player.coinsThisPrestige.greaterThanOrEqualTo(1e16)) {
      resetAchievementCheck(1);
      reset(1, true)
    }
  }
  if (player.resettoggle1 == 2) {
    var time = Math.max(0.25, player.prestigeamount);
    if (player.toggles.fifteen == true && player.achievements[43] == 1 && player.prestigecounter >= time && player.coinsThisPrestige.greaterThanOrEqualTo(1e16)) {
      resetAchievementCheck(1);
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