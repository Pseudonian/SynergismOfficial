var achievementpointvalues = [0, 1, 2, 4, 6, 8, 9, 10,
    1, 2, 4, 6, 8, 9, 10,
    1, 2, 4, 6, 8, 9, 10,
    1, 2, 4, 6, 8, 9, 10,
    1, 2, 4, 6, 8, 9, 10,
    1, 2, 4, 6, 8, 9, 10,
    1, 2, 4, 6, 8, 9, 10,
    1, 2, 4, 6, 8, 9, 10,
    2, 8, 10, 2, 8, 10, 10,
    2, 8, 10, 10, 10, 10, 10,
    2, 4, 6, 8, 10, 10, 10,
    1, 2, 4, 6, 8, 9, 10,
    1, 2, 4, 6, 8, 9, 10,
    1, 2, 4, 6, 8, 9, 10,
    1, 2, 4, 6, 8, 9, 10,
    1, 2, 4, 6, 8, 9, 10,
    1, 2, 4, 6, 8, 9, 10,
    1, 2, 4, 6, 8, 9, 10,
    1, 2, 4, 6, 8, 9, 10,
    1, 2, 4, 6, 8, 9, 10,
    1, 2, 4, 6, 8, 9, 10,
    1, 2, 4, 6, 8, 9, 10,
    1, 2, 4, 6, 8, 9, 10,
    1, 2, 4, 6, 8, 9, 10,
    10, 10, 10, 10, 10, 10, 10,
    10, 10, 10, 10, 10, 10, 10,
    20, 20, 20, 40, 60, 60, 100,
    20, 20, 40, 40, 60, 60, 100,
    20, 20, 40, 40, 60, 60, 100,
    20, 40, 40, 40, 60, 60, 100,
    40, 40, 40, 60, 60, 100, 100,
    40, 40, 60, 60, 100, 100, 100,
    20, 40, 40, 60, 60, 100, 100,
    40, 60, 100, 60, 100, 100, 40,
    40, 40, 40, 40, 40, 40, 40,
    40, 40, 40, 40, 100, 100, 0]

var totalachievementpoints = achievementpointvalues.reduce(function (a, b) {
    return a + b
}, 0);

function resetachievementcheck(i) {
    if (i === 1) {
        if (player.prestigenoaccelerator === true) {
            achievementaward(60)
        }
        if (player.prestigenomultiplier === true) {
            achievementaward(57)
        }
        if (player.prestigenocoinupgrades === true) {
            achievementaward(64)
        }
        if (prestigePointGain.greaterThanOrEqualTo(1)) {
            achievementaward(36)

        }
        if (prestigePointGain.greaterThanOrEqualTo(1e6)) {
            achievementaward(37)

        }
        if (prestigePointGain.greaterThanOrEqualTo(1e100)) {
            achievementaward(38)

        }
        if (prestigePointGain.greaterThanOrEqualTo("1e1000")) {
            achievementaward(39)

        }
        if (prestigePointGain.greaterThanOrEqualTo("1e10000")) {
            achievementaward(40)

        }
        if (prestigePointGain.greaterThanOrEqualTo("1e77777")) {
            achievementaward(41)

        }
        if (prestigePointGain.greaterThanOrEqualTo("1e250000")) {
            achievementaward(42)

        }
    }
    if (i === 2) {
        if (player.transcendnoaccelerator === true) {
            achievementaward(61)
        }
        if (player.transcendnomultiplier === true) {
            achievementaward(58)
        }
        if (player.transcendnocoinupgrades === true) {
            achievementaward(65)
        }
        if (player.transcendnocoinorprestigeupgrades === true) {
            achievementaward(66)
        }
        if (transcendPointGain.greaterThanOrEqualTo(1)) {
            achievementaward(43)
        }
        if (transcendPointGain.greaterThanOrEqualTo(1e6)) {
            achievementaward(44)
        }
        if (transcendPointGain.greaterThanOrEqualTo(1e50)) {
            achievementaward(45)
        }
        if (transcendPointGain.greaterThanOrEqualTo(1e308)) {
            achievementaward(46)
        }
        if (transcendPointGain.greaterThanOrEqualTo("1e1500")) {
            achievementaward(47)
        }
        if (transcendPointGain.greaterThanOrEqualTo("1e25000")) {
            achievementaward(48)
        }
        if (transcendPointGain.greaterThanOrEqualTo("1e100000")) {
            achievementaward(49)
        }
    }
    if (i === 3) {
        if (player.reincarnatenoaccelerator === true) {
            achievementaward(62)
        }
        if (player.reincarnatenomultiplier === true) {
            achievementaward(59)
        }
        if (player.reincarnatenocoinupgrades === true) {
            achievementaward(67)
        }
        if (player.reincarnatenocoinorprestigeupgrades === true) {
            achievementaward(68)
        }
        if (player.reincarnatenocoinprestigeortranscendupgrades === true) {
            achievementaward(69)
        }
        if (player.reincarnatenocoinprestigetranscendorgeneratorupgrades === true) {
            achievementaward(70)
        }
        if (reincarnationPointGain.greaterThanOrEqualTo(1)) {
            achievementaward(50)

        }
        if (reincarnationPointGain.greaterThanOrEqualTo(1e5)) {
            achievementaward(51)

        }
        if (reincarnationPointGain.greaterThanOrEqualTo(1e30)) {
            achievementaward(52)

        }
        if (reincarnationPointGain.greaterThanOrEqualTo(1e200)) {
            achievementaward(53)

        }
        if (reincarnationPointGain.greaterThanOrEqualTo("1e1500")) {
            achievementaward(54)

        }
        if (reincarnationPointGain.greaterThanOrEqualTo("1e5000")) {
            achievementaward(55)

        }
        if (reincarnationPointGain.greaterThanOrEqualTo("1e7777")) {
            achievementaward(56)

        }
    }
}

function challengeachievementcheck(i, auto) {
    let generatorcheck = Math.max(player.upgrades[101] + player.upgrades[102] + player.upgrades[103] + player.upgrades[104] + player.upgrades[105])
    if (i === 1) {
        if (player.challengecompletions[1] > 0.5) {
            achievementaward(78)
        }
        if (player.challengecompletions[1] > 2.5) {
            achievementaward(79)
        }
        if (player.challengecompletions[1] > 4.5) {
            achievementaward(80)
        }
        if (player.challengecompletions[1] > 9.5) {
            achievementaward(81)
        }
        if (player.challengecompletions[1] > 19.5) {
            achievementaward(82)
        }
        if (player.challengecompletions[1] > 49.5) {
            achievementaward(83)
        }
        if (player.challengecompletions[1] > 74.5) {
            achievementaward(84)
        }
        if (!auto) {
            if (player.coinsThisTranscension.greaterThanOrEqualTo("1e1000") && generatorcheck === 0) {
                achievementaward(75)
            }
        }
    }
    if (i === 2) {
        if (player.challengecompletions[2] > 0.5) {
            achievementaward(85)
        }
        if (player.challengecompletions[2] > 2.5) {
            achievementaward(86)
        }
        if (player.challengecompletions[2] > 4.5) {
            achievementaward(87)
        }
        if (player.challengecompletions[2] > 9.5) {
            achievementaward(88)
        }
        if (player.challengecompletions[2] > 19.5) {
            achievementaward(89)
        }
        if (player.challengecompletions[2] > 49.5) {
            achievementaward(90)
        }
        if (player.challengecompletions[2] > 74.5) {
            achievementaward(91)
        }
        if (!auto) {
            if (player.coinsThisTranscension.greaterThanOrEqualTo("1e1000") && generatorcheck === 0) {
                achievementaward(76)
            }
        }
    }
    if (i === 3) {
        if (!auto) {
            if (player.coinsThisTranscension.greaterThanOrEqualTo("1e99999") && generatorcheck === 0) {
                achievementaward(77)
            }
        }
        if (player.challengecompletions[3] > 0.5) {
            achievementaward(92)
        }
        if (player.challengecompletions[3] > 2.5) {
            achievementaward(93)
        }
        if (player.challengecompletions[3] > 4.5) {
            achievementaward(94)
        }
        if (player.challengecompletions[3] > 9.5) {
            achievementaward(95)
        }
        if (player.challengecompletions[3] > 19.5) {
            achievementaward(96)
        }
        if (player.challengecompletions[3] > 49.5) {
            achievementaward(97)
        }
        if (player.challengecompletions[3] > 74.5) {
            achievementaward(98)
        }
    }
    if (i === 4) {
        if (player.challengecompletions[4] > 0.5) {
            achievementaward(99)
        }
        if (player.challengecompletions[4] > 2.5) {
            achievementaward(100)
        }
        if (player.challengecompletions[4] > 4.5) {
            achievementaward(101)
        }
        if (player.challengecompletions[4] > 9.5) {
            achievementaward(102)
        }
        if (player.challengecompletions[4] > 19.5) {
            achievementaward(103)
        }
        if (player.challengecompletions[4] > 49.5) {
            achievementaward(104)
        }
        if (player.challengecompletions[4] > 74.5) {
            achievementaward(105)
        }
    }
    if (i === 5) {
        if (!auto) {
            if (player.coinsThisTranscension.greaterThanOrEqualTo("1e120000")) {
                achievementaward(63)
            }
        }
        if (player.challengecompletions[5] > 0.5) {
            achievementaward(106)
        }
        if (player.challengecompletions[5] > 2.5) {
            achievementaward(107)
        }
        if (player.challengecompletions[5] > 4.5) {
            achievementaward(108)
        }
        if (player.challengecompletions[5] > 9.5) {
            achievementaward(109)
        }
        if (player.challengecompletions[5] > 19.5) {
            achievementaward(110)
        }
        if (player.challengecompletions[5] > 49.5) {
            achievementaward(111)
        }
        if (player.challengecompletions[5] > 74.5) {
            achievementaward(112)
        }
    }
    if (i === 6) {
        if (player.challengecompletions[6] > 0.5) {
            achievementaward(113)
        }
        if (player.challengecompletions[6] > 1.5) {
            achievementaward(114)
        }
        if (player.challengecompletions[6] > 2.5) {
            achievementaward(115)
        }
        if (player.challengecompletions[6] > 4.5) {
            achievementaward(116)
        }
        if (player.challengecompletions[6] > 9.5) {
            achievementaward(117)
        }
        if (player.challengecompletions[6] > 14.5) {
            achievementaward(118)
        }
        if (player.challengecompletions[6] > 24.5) {
            achievementaward(119)
        }
    }
    if (i === 7) {
        if (player.challengecompletions[7] > 0.5) {
            achievementaward(120)
        }
        if (player.challengecompletions[7] > 1.5) {
            achievementaward(121)
        }
        if (player.challengecompletions[7] > 2.5) {
            achievementaward(122)
        }
        if (player.challengecompletions[7] > 4.5) {
            achievementaward(123)
        }
        if (player.challengecompletions[7] > 9.5) {
            achievementaward(124)
        }
        if (player.challengecompletions[7] > 14.5) {
            achievementaward(125)
        }
        if (player.challengecompletions[7] > 24.5) {
            achievementaward(126)
        }
    }
    if (i === 8) {
        if (player.challengecompletions[8] > 0.5) {
            achievementaward(127)
        }
        if (player.challengecompletions[8] > 1.5) {
            achievementaward(128)
        }
        if (player.challengecompletions[8] > 2.5) {
            achievementaward(129)
        }
        if (player.challengecompletions[8] > 4.5) {
            achievementaward(130)
        }
        if (player.challengecompletions[8] > 9.5) {
            achievementaward(131)
        }
        if (player.challengecompletions[8] > 19.5) {
            achievementaward(132)
        }
        if (player.challengecompletions[8] > 24.5) {
            achievementaward(133)
        }
    }
    if (i === 9) {
        if (player.challengecompletions[9] > 0.5) {
            achievementaward(134)
        }
        if (player.challengecompletions[9] > 1.5) {
            achievementaward(135)
        }
        if (player.challengecompletions[9] > 2.5) {
            achievementaward(136)
        }
        if (player.challengecompletions[9] > 4.5) {
            achievementaward(137)
        }
        if (player.challengecompletions[9] > 9.5) {
            achievementaward(138)
        }
        if (player.challengecompletions[9] > 19.5) {
            achievementaward(139)
        }
        if (player.challengecompletions[9] > 24.5) {
            achievementaward(140)
        }
    }
    if (i === 10) {
        if (player.challengecompletions[10] > 0.5) {
            achievementaward(141)
        }
        if (player.challengecompletions[10] > 1.5) {
            achievementaward(142)
        }
        if (player.challengecompletions[10] > 2.5) {
            achievementaward(143)
        }
        if (player.challengecompletions[10] > 4.5) {
            achievementaward(144)
        }
        if (player.challengecompletions[10] > 9.5) {
            achievementaward(145)
        }
        if (player.challengecompletions[10] > 19.5) {
            achievementaward(146)
        }
        if (player.challengecompletions[10] > 24.5) {
            achievementaward(147)
        }
    }
    if (i >= 11 && i <= 14) {
        let challengeArray = [0, 1, 2, 3, 5, 10, 20, 30]
        for (var j = 1; j <= 7; j++) {
            if (player.challengecompletions[i] >= challengeArray[j] && player.achievements[119 + 7 * i + j] < 1) {
                achievementaward(119 + 7 * i + j)
            }
        }
    }
}

function buildingAchievementCheck() {
    if (player.firstOwnedCoin >= 1 && player.achievements[1] < 0.5) {
        achievementaward(1)
    }
    if (player.firstOwnedCoin >= 10 && player.achievements[2] < 0.5) {
        achievementaward(2)
    }
    if (player.firstOwnedCoin >= 100 && player.achievements[3] < 0.5) {
        achievementaward(3)
    }
    if (player.firstOwnedCoin >= 1000 && player.achievements[4] < 0.5) {
        achievementaward(4)
    }
    if (player.firstOwnedCoin >= 5000 && player.achievements[5] < 0.5) {
        achievementaward(5)
    }
    if (player.firstOwnedCoin >= 10000 && player.achievements[6] < 0.5) {
        achievementaward(6)
    }
    if (player.firstOwnedCoin >= 20000 && player.achievements[7] < 0.5) {
        achievementaward(7)
    }
    if (player.secondOwnedCoin >= 1 && player.achievements[8] < 0.5) {
        achievementaward(8)
    }
    if (player.secondOwnedCoin >= 10 && player.achievements[9] < 0.5) {
        achievementaward(9)
    }
    if (player.secondOwnedCoin >= 100 && player.achievements[10] < 0.5) {
        achievementaward(10)
    }
    if (player.secondOwnedCoin >= 1000 && player.achievements[11] < 0.5) {
        achievementaward(11)
    }
    if (player.secondOwnedCoin >= 5000 && player.achievements[12] < 0.5) {
        achievementaward(12)
    }
    if (player.secondOwnedCoin >= 10000 && player.achievements[13] < 0.5) {
        achievementaward(13)
    }
    if (player.secondOwnedCoin >= 20000 && player.achievements[14] < 0.5) {
        achievementaward(14)
    }
    if (player.thirdOwnedCoin >= 1 && player.achievements[15] < 0.5) {
        achievementaward(15)
    }
    if (player.thirdOwnedCoin >= 10 && player.achievements[16] < 0.5) {
        achievementaward(16)
    }
    if (player.thirdOwnedCoin >= 100 && player.achievements[17] < 0.5) {
        achievementaward(17)
    }
    if (player.thirdOwnedCoin >= 1000 && player.achievements[18] < 0.5) {
        achievementaward(18)
    }
    if (player.thirdOwnedCoin >= 5000 && player.achievements[19] < 0.5) {
        achievementaward(19)
    }
    if (player.thirdOwnedCoin >= 10000 && player.achievements[20] < 0.5) {
        achievementaward(20)
    }
    if (player.thirdOwnedCoin >= 20000 && player.achievements[21] < 0.5) {
        achievementaward(21)
    }
    if (player.fourthOwnedCoin >= 1 && player.achievements[22] < 0.5) {
        achievementaward(22)
    }
    if (player.fourthOwnedCoin >= 10 && player.achievements[23] < 0.5) {
        achievementaward(23)
    }
    if (player.fourthOwnedCoin >= 100 && player.achievements[24] < 0.5) {
        achievementaward(24)
    }
    if (player.fourthOwnedCoin >= 1000 && player.achievements[25] < 0.5) {
        achievementaward(25)
    }
    if (player.fourthOwnedCoin >= 5000 && player.achievements[26] < 0.5) {
        achievementaward(26)
    }
    if (player.fourthOwnedCoin >= 10000 && player.achievements[27] < 0.5) {
        achievementaward(27)
    }
    if (player.fourthOwnedCoin >= 20000 && player.achievements[28] < 0.5) {
        achievementaward(28)
    }
    if (player.fifthOwnedCoin >= 1 && player.achievements[29] < 0.5) {
        achievementaward(29)
    }
    if (player.fifthOwnedCoin >= 10 && player.achievements[30] < 0.5) {
        achievementaward(30)
    }
    if (player.fifthOwnedCoin >= 66 && player.achievements[31] < 0.5) {
        achievementaward(31)
    }
    if (player.fifthOwnedCoin >= 666 && player.achievements[32] < 0.5) {
        achievementaward(32)
    }
    if (player.fifthOwnedCoin >= 6666 && player.achievements[33] < 0.5) {
        achievementaward(33)
    }
    if (player.fifthOwnedCoin >= 17777 && player.achievements[34] < 0.5) {
        achievementaward(34)
    }
    if (player.fifthOwnedCoin >= 42777 && player.achievements[35] < 0.5) {
        achievementaward(35)
    }
}

function ascensionAchievementCheck(i, score) {
    score = score || 0
    if (i === 1) {
        let ascendCountArray = [0, 1, 2, 10, 100, 1000, 14142, 141421, 1414213]
        for (let j = 1; j <= 7; j++) {
            if (player.ascensionCount >= ascendCountArray[j] && player.achievements[182 + j] < 1) {
                achievementaward(182 + j)
            }
        }
        if (player.ascensionCount >= ascendCountArray[8] && player.achievements[240] < 1) {
            achievementaward(240)
        }
    }
    if (i === 2) {
        let constantArray = [0, 3.14, 1e6, 4.32e10, 6.9e21, 1.509e33, 1e66, "1.8e308"]
        for (let j = 1; j <= 7; j++) {
            if (player.ascendShards.greaterThanOrEqualTo(constantArray[j]) && player.achievements[189 + j] < 1) {
                achievementaward(189 + j)
            }
        }
    }
    if (i === 3) {
        let scoreArray = [0, 1e5, 1e6, 1e7, 1e8, 1e9, 5e9, 2.5e10]
        for (let j = 1; j <= 7; j++) {
            if (score >= scoreArray[j] && player.achievements[224 + j] < 1) {
                achievementaward(224 + j)
            }
        }
    }
}

function achievementdescriptions(i) {
    let x = "adesc" + i
    let y = window.tr.t(x);
    let z = ""
    let k = ""

    let j = "areward" + i
    k = window.tr.t(j); // areward[j]

    if (player.achievements[i] > 0.5) {
        z = z + " COMPLETED!"
    }
    document.getElementById("achievementdescription").textContent = y + z
    document.getElementById("achievementreward").textContent = "Reward: " + achievementpointvalues[i] + " AP. " + achievementpointvalues[i] + " Quarks! " + k
    if (player.achievements[i] > 0.5) {
        document.getElementById("achievementdescription").style.color = "gold"
    } else {
        document.getElementById("achievementdescription").style.color = "white"
    }
}

function achievementaward(num) {
    if (player.achievements[num] < 0.5) {
        player.achievementPoints += achievementpointvalues[num]
        player.worlds += achievementpointvalues[num]
        document.getElementById("achievementprogress").textContent = "Achievement Points: " + player.achievementPoints + "/" + totalachievementpoints + " [" + (100 * player.achievementPoints / totalachievementpoints).toPrecision(4) + "%]"
        player.achievements[num] = 1;
        revealStuff()
    }
    let x = "ach" + num
    document.getElementById(x).style.backgroundColor = "Green"
}

