function updateCostDisplay(i) {
    let el = document.getElementById("talismanFragmentCost")
    
    let obtainiumCost = 1e6;
    let offeringCost = 0;


    if (i > 0){obtainiumCost = 3e6}
    if (i > 1){obtainiumCost = talismanFragmentObtainiumCosts[i]; offeringCost = talismanFragmentOfferingCosts[i]}
    let maxBuyObtainium = Math.max(1, Math.floor(player.researchPoints/obtainiumCost))
    let maxBuyOffering = Math.max(1, Math.floor(player.runeshards/(offeringCost)));
    if (offeringCost == 0){maxBuyOffering = 1e100}

    let amountToBuy = Math.max(1, Math.floor(player.buyTalismanShardPercent / 100 * Math.min(maxBuyObtainium, maxBuyOffering)))
    
    el.textContent = "Cost to buy " + format(amountToBuy) + ": " + format(obtainiumCost * amountToBuy) + " Obtainium and " + format(offeringCost * amountToBuy) + " offerings." 
    

}

function toggleTalismanBuy(i) {
    i = i || player.buyTalismanShardPercent
    document.getElementById("talismanTen").style.backgroundColor = "#171717"
    document.getElementById("talismanTwentyFive").style.backgroundColor = "#171717"
    document.getElementById("talismanFifty").style.backgroundColor = "#171717"
    document.getElementById("talismanHundred").style.backgroundColor = "#171717"
    player.buyTalismanShardPercent = i
    let x = "Ten"
    if (i == 10){x = "Ten"}
    if (i == 25){x = "TwentyFive"}
    if (i == 50){x = "Fifty"}
    if (i == 100){x = "Hundred"}

    document.getElementById("talisman" + x).style.backgroundColor = "green"

}

function updateTalismanInventory() {
    document.getElementById("talismanShardInventory").textContent = format(player.talismanShards);
    document.getElementById("commonFragmentInventory").textContent = format(player.commonFragments);
    document.getElementById("uncommonFragmentInventory").textContent = format(player.uncommonFragments);
    document.getElementById("rareFragmentInventory").textContent = format(player.rareFragments);
    document.getElementById("epicFragmentInventory").textContent = format(player.epicFragments);
    document.getElementById("legendaryFragmentInventory").textContent = format(player.legendaryFragments);
    document.getElementById("mythicalFragmentInventory").textContent = format(player.mythicalFragments);

}

function buyTalismanStuff(i){
    let obtainiumCost = 1e6;
    let offeringCost = 0;

    if (i>0){obtainiumCost = talismanFragmentObtainiumCosts[i]}
    if (i>1){offeringCost = talismanFragmentOfferingCosts[i]}

    let maxBuyObtainium = Math.max(0, Math.floor(player.researchPoints/obtainiumCost))
    let maxBuyOffering = Math.max(0, Math.floor(player.runeshards/(offeringCost)));
    if (offeringCost == 0){maxBuyOffering = 1e100}
    let amountToBuy = Math.max(0, Math.floor(player.buyTalismanShardPercent / 100 * Math.min(maxBuyObtainium, maxBuyOffering)))
    if (maxBuyObtainium > 0 && maxBuyOffering > 0 && amountToBuy == 0){amountToBuy = 1;}
    if(i == 0){player.talismanShards += amountToBuy; player.researchPoints -= (amountToBuy * obtainiumCost);}
    if(i == 1){player.commonFragments += amountToBuy; player.researchPoints -= (amountToBuy * obtainiumCost);}
    if(i == 2){player.uncommonFragments += amountToBuy; player.researchPoints -= (amountToBuy * obtainiumCost); player.runeshards -= (amountToBuy * offeringCost)}
    if(i == 3){player.rareFragments += amountToBuy; player.researchPoints -= (amountToBuy * obtainiumCost); player.runeshards -= (amountToBuy * offeringCost)}
    if(i == 4){player.epicFragments += amountToBuy; player.researchPoints -= (amountToBuy * obtainiumCost); player.runeshards -= (amountToBuy * offeringCost)}
    if(i == 5){player.legendaryFragments += amountToBuy; player.researchPoints -= (amountToBuy * obtainiumCost); player.runeshards -= (amountToBuy * offeringCost)}
    if(i == 6){player.mythicalFragments += amountToBuy; player.researchPoints -= (amountToBuy * obtainiumCost); player.runeshards -= (amountToBuy * offeringCost)}

    updateCostDisplay(i)
    updateTalismanInventory()
}


function showTalismanEffect(i){
    let ord = [null, "One", "Two", "Three", "Four", "Five", "Six", "Seven"]
    document.getElementById("talismanlevelup").style.display = "none"
    document.getElementById("talismanEffect").style.display = "block"
    document.getElementById("talismanrespec").style.display = "none"
    let a = document.getElementById("talismanSummary")
    let b = document.getElementById("talismanBonus")
    let c = document.getElementById("talismanRune1Effect")
    let d = document.getElementById("talismanRune2Effect")
    let e = document.getElementById("talismanRune3Effect")
    let f = document.getElementById("talismanRune4Effect")
    let g = document.getElementById("talismanRune5Effect")
    let h = document.getElementById("talismanMythicEffect")

    let index = player.talismanRarity[i]
    let modifiers = [null, "+", "+", "+", "+", "+"]
    let num = talismanPositiveModifier[index];
    let talismanRarityMult = [null, num, num, num, num, num]

    for (var j = 1; j <= 5; j++){
        if(player["talisman"+ord[i]][j] < 0){modifiers[j] = "-"; talismanRarityMult[j] = talismanNegativeModifier[index]}
    }

    switch(i){
        case 1: a.textContent = "=-=-=-= Exemption Talisman Effects =-=-=-=";
                b.textContent = "Taxes -10%"
                c.textContent = "Bonus Speed Rune Levels: " + format(talisman1Effect[1],2,true)
                d.textContent = "Bonus Duplication Rune Levels: " + format(talisman1Effect[2],2,true)
                e.textContent = "Bonus Prism Rune Levels: " + format(talisman1Effect[3],2,true)
                f.textContent = "Bonus Thrift Rune Levels: " + format(talisman1Effect[4],2,true)
                g.textContent = "Bonus SI Rune Levels: " + format(talisman1Effect[5],2,true)
                h.textContent = "Mythic Effect: +125 Duplication Rune Levels!"
        break;
        case 2: a.textContent = "=-=-=-= Chronos Talisman Effects =-=-=-=";
                b.textContent = "Gain +10% more multiplier boosts."
                c.textContent = "Bonus Speed Rune Levels: " + format(talisman2Effect[1],2,true)
                d.textContent = "Bonus Duplication Rune Levels: " + format(talisman2Effect[2],2,true)
                e.textContent = "Bonus Prism Rune Levels: " + format(talisman2Effect[3],2,true)
                f.textContent = "Bonus Thrift Rune Levels: " + format(talisman2Effect[4],2,true)
                g.textContent = "Bonus SI Rune Levels: " + format(talisman2Effect[5],2,true)
                h.textContent = "Mythic Effect: +125 Speed Rune Levels!"
                break;
        case 3: a.textContent = "=-=-=-= Midas Talisman Effects =-=-=-=";
                b.textContent = "Building Cost Delay +10%"
                c.textContent = "Bonus Speed Rune Levels: " + format(talisman3Effect[1],2,true)
                d.textContent = "Bonus Duplication Rune Levels: " + format(talisman3Effect[2],2,true)
                e.textContent = "Bonus Prism Rune Levels: " + format(talisman3Effect[3],2,true)
                f.textContent = "Bonus Thrift Rune Levels: " + format(talisman3Effect[4],2,true)
                g.textContent = "Bonus SI Rune Levels: " + format(talisman3Effect[5],2,true)
                h.textContent = "Mythic Effect: +125 Thrift Rune Levels!"
                break;
        case 4: a.textContent = "=-=-=-= Metaphysics Talisman Effects =-=-=-=";
                b.textContent = "+0.05 all positive Talisman Effects"
                c.textContent = "Bonus Speed Rune Levels: " + format(talisman4Effect[1],2,true)
                d.textContent = "Bonus Duplication Rune Levels: " + format(talisman4Effect[2],2,true)
                e.textContent = "Bonus Prism Rune Levels: " + format(talisman4Effect[3],2,true)
                f.textContent = "Bonus Thrift Rune Levels: " + format(talisman4Effect[4],2,true)
                g.textContent = "Bonus SI Rune Levels: " + format(talisman4Effect[5],2,true)
                h.textContent = "Mythic Effect: +125 Prism Rune Levels!"
                break;
        case 5: a.textContent = "=-=-=-= Polymath Talisman Effects =-=-=-=";
                b.textContent = "???"
                c.textContent = "Bonus Speed Rune Levels: " + format(talisman5Effect[1],2,true)
                d.textContent = "Bonus Duplication Rune Levels: " + format(talisman5Effect[2],2,true)
                e.textContent = "Bonus Prism Rune Levels: " + format(talisman5Effect[3],2,true)
                f.textContent = "Bonus Thrift Rune Levels: " + format(talisman5Effect[4],2,true)
                g.textContent = "Bonus SI Rune Levels: " + format(talisman5Effect[5],2,true)
                h.textContent = "Mythic Effect: +125 SI Rune Levels!"
                break;
        case 6: a.textContent = "=-=-=-= Mortuus Est Talisman Effects =-=-=-=";
                b.textContent = "+2 bonus levels to all other ants"
                c.textContent = "Bonus Speed Rune Levels: " + format(talisman6Effect[1],2,true)
                d.textContent = "Bonus Duplication Rune Levels: " + format(talisman6Effect[2],2,true)
                e.textContent = "Bonus Prism Rune Levels: " + format(talisman6Effect[3],2,true)
                f.textContent = "Bonus Thrift Rune Levels: " + format(talisman6Effect[4],2,true)
                g.textContent = "Bonus SI Rune Levels: " + format(talisman6Effect[5],2,true)
                h.textContent = "Mythic Effect: Gain ant speed based on your total rune level!"
                break;
        case 7: a.textContent = "=-=-=-= Plastic Talisman Effects =-=-=-=";
                b.textContent = "Gain 1x normal production"
                c.textContent = "Bonus Speed Rune Levels: " + format(talisman7Effect[1],2,true)
                d.textContent = "Bonus Duplication Rune Levels: " + format(talisman7Effect[2],2,true)
                e.textContent = "Bonus Prism Rune Levels: " + format(talisman7Effect[3],2,true)
                f.textContent = "Bonus Thrift Rune Levels: " + format(talisman7Effect[4],2,true)
                g.textContent = "Bonus SI Rune Levels: " + format(talisman7Effect[5],2,true)
                h.textContent = "Mythic Effect: +2 Quarks per Hour on Export!"
                break;
    }
    if(player.talismanRarity[i] !== 6){h.textContent = "Get Max Enhance for a Mythical bonus effect!"}
}

function showTalismanPrices(i){
    document.getElementById("talismanEffect").style.display = "none"
    document.getElementById("talismanlevelup").style.display = "block"
    document.getElementById("talismanrespec").style.display = "none"
    let a = document.getElementById("talismanShardCost")
    let b = document.getElementById("talismanCommonFragmentCost")
    let c = document.getElementById("talismanUncommonFragmentCost")
    let d = document.getElementById("talismanRareFragmentCost")
    let e = document.getElementById("talismanEpicFragmentCost")
    let f = document.getElementById("talismanLegendaryFragmentCost")
    let g = document.getElementById("talismanMythicalFragmentCost")

    document.getElementById("talismanLevelUpSummary").textContent = "-=-=- Resources Required to Level Up -=-=-"
    document.getElementById("talismanLevelUpSummary").style.color = "silver"

    let m = talismanLevelCostMultiplier[i]
    a.textContent = format(m * Math.max(0, Math.floor(1 + 1/8 * Math.pow(player.talismanLevels[i],3))));
    b.textContent = format(m * Math.max(0, Math.floor(1 + 1/32 * Math.pow(player.talismanLevels[i] - 30,3))));
    c.textContent = format(m * Math.max(0, Math.floor(1 + 1/384 * Math.pow(player.talismanLevels[i] - 60,3))));
    d.textContent = format(m * Math.max(0, Math.floor(1 + 1/250 * Math.pow(player.talismanLevels[i] - 90,3))));
    e.textContent = format(m * Math.max(0, Math.floor(1 + 1/125 * Math.pow(player.talismanLevels[i] - 120,3))));
    f.textContent = format(m * Math.max(0, Math.floor(1 + 1/64 * Math.pow(player.talismanLevels[i] - 150,3))));
    g.textContent = format(m * Math.max(0, Math.floor(1 + 1/128 * Math.pow(player.talismanLevels[i] - 150,3))));
}

function showEnhanceTalismanPrices(i){
    document.getElementById("talismanEffect").style.display = "none"
    document.getElementById("talismanlevelup").style.display = "block"
    document.getElementById("talismanrespec").style.display = "none"
    let a = document.getElementById("talismanShardCost")
    let b = document.getElementById("talismanCommonFragmentCost")
    let c = document.getElementById("talismanUncommonFragmentCost")
    let d = document.getElementById("talismanRareFragmentCost")
    let e = document.getElementById("talismanEpicFragmentCost")
    let f = document.getElementById("talismanLegendaryFragmentCost")
    let g = document.getElementById("talismanMythicalFragmentCost")

    document.getElementById("talismanLevelUpSummary").textContent = "=-=-= Resources Required to ENHANCE =-=-="
    document.getElementById("talismanLevelUpSummary").style.color = "gold"

    let array = [null, commonTalismanEnhanceCost, uncommonTalismanEnchanceCost, rareTalismanEnchanceCost, epicTalismanEnhanceCost, legendaryTalismanEnchanceCost, mythicalTalismanEnchanceCost]
    let index = player.talismanRarity[i];
    let costArray = array[index];
    let m = talismanLevelCostMultiplier[i]
    a.textContent = format(m * costArray[1]);
    b.textContent = format(m * costArray[2]);
    c.textContent = format(m * costArray[3]);
    d.textContent = format(m * costArray[4]);
    e.textContent = format(m * costArray[5]);
    f.textContent = format(m * costArray[6]);
    g.textContent = format(m * costArray[7]);
}

function showRespecInformation(i){
    talismanRespec = i
    let num=[null, "One", "Two", "Three", "Four", "Five", "Six", "Seven"]
    document.getElementById("talismanEffect").style.display = "none"
    document.getElementById("talismanlevelup").style.display = "none"
    document.getElementById("talismanrespec").style.display = "block"

    let runeName = [null, "Speed Rune", "Duplication Rune", "Prism Rune", "Thrift Rune", "SI Rune"]
    let runeModifier = [null, "Positive", "Positive", "Positive", "Positive"]
    
    for (var k=1; k<=5; k++){
        mirrorTalismanStats[k] = player["talisman"+num[i]][k]
    }

    for (var j=1; j<=5; j++){
        if(mirrorTalismanStats[j] == 1){document.getElementById("talismanRespecButton" + j).style.border = "2px solid limegreen"; runeModifier[j] = "Positive"}
        if(mirrorTalismanStats[j] == -1){document.getElementById("talismanRespecButton" + j).style.border = "2px solid crimson"; runeModifier[j] = "Negative"}
        document.getElementById("talismanRespecButton" + j).textContent = runeName[j] + ": " + runeModifier[j]
    }

    document.getElementById("confirmTalismanRespec").style.display = "none"
}

function changeTalismanModifier(i){
    let runeName = [null, "Speed Rune", "Duplication Rune", "Prism Rune", "Thrift Rune", "SI Rune"];
    let el = document.getElementById("talismanRespecButton" + i);
    if(mirrorTalismanStats[i] == 1){
        mirrorTalismanStats[i] = (-1);
        el.textContent = runeName[i] + ": Negative";
        el.style.border = "2px solid crimson";
    }
    else{
        mirrorTalismanStats[i] = (1);
        el.textContent = runeName[i] + ": Positive";
        el.style.border = "2px solid limegreen";
    }

    let checkSum = mirrorTalismanStats.reduce(function(a, b) { 
        return a + b;
    }, 0);
    console.log(checkSum)

    if (checkSum == 1){
    document.getElementById("confirmTalismanRespec").style.display = "block";
    }
    else {
    document.getElementById("confirmTalismanRespec").style.display = "none";
    }

}

function respecTalismanConfirm(i){
    let num = [null, "One", "Two", "Three", "Four", "Five", "Six", "Seven"]
    if (player.runeshards >= 100000){
        for (var j = 1; j <= 5; j++){
    player["talisman"+num[i]][j] = mirrorTalismanStats[j];
    }
    player.runeshards -= 100000;
    document.getElementById("confirmTalismanRespec").style.display = "none";
    document.getElementById("talismanrespec").style.display = "none";
    document.getElementById("talismanEffect").style.display = "block";
    showTalismanEffect(i);
    calculateRuneLevels();
    }
    else{}
}

function respecTalismanCancel(i){
    document.getElementById("talismanrespec").style.display = "none"
    document.getElementById("talismanEffect").style.display = "block";
    showTalismanEffect(i);
}

function updateTalismanAppearance(i){
let id=""
let el = document.getElementById("talisman" + i)
let la = document.getElementById("talisman" + i + "level")
if(i==2){id = "MultiplierAcceleratorTalisman"}

let rarity = player.talismanRarity[i];
if(rarity == 1){el.style.border = "4px solid white"; la.style.color = "white"}
if(rarity == 2){el.style.border = "4px solid limegreen"; la.style.color = "limegreen"}
if(rarity == 3){el.style.border = "4px solid lightblue"; la.style.color = "lightblue"}
if(rarity == 4){el.style.border = "4px solid plum"; la.style.color = "plum"}
if(rarity == 5){el.style.border = "4px solid orange"; la.style.color = "orange"}
if(rarity == 6){el.style.border = "4px solid crimson"; la.style.color = "crimson"}
}



function buyTalismanLevels(i){
    let checkSum = 0;
    let priceMult = talismanLevelCostMultiplier[i]

    if(player.talismanShards >= priceMult * Math.max(0, Math.floor(1 + 1/8 * Math.pow(player.talismanLevels[i],3)))){checkSum++}
    if(player.commonFragments >= priceMult * Math.max(0, Math.floor(1 + 1/32 * Math.pow(player.talismanLevels[i] - 30,3)))){checkSum++}
    if(player.uncommonFragments >= priceMult * Math.max(0, Math.floor(1 + 1/384 * Math.pow(player.talismanLevels[i] - 60,3)))){checkSum++}
    if(player.rareFragments >= priceMult * Math.max(0, Math.floor(1 + 1/250 * Math.pow(player.talismanLevels[i] - 90,3)))){checkSum++}
    if(player.epicFragments >= priceMult * Math.max(0, Math.floor(1 + 1/125 * Math.pow(player.talismanLevels[i] - 120,3)))){checkSum++}
    if(player.legendaryFragments >= priceMult * Math.max(0, Math.floor(1 + 1/64 * Math.pow(player.talismanLevels[i] - 150,3)))){checkSum++}
    if(player.mythicalFragments >= priceMult * Math.max(0, Math.floor(1 + 1/128 * Math.pow(player.talismanLevels[i] - 150,3)))){checkSum++}


    if (checkSum == 7 && player.talismanLevels[i] < (player.talismanRarity[i] * 30)){
        player.talismanShards -= priceMult * Math.max(0, Math.floor(1 + 1/8 * Math.pow(player.talismanLevels[i],3)))
        player.commonFragments -= priceMult * Math.max(0, Math.floor(1 + 1/32 * Math.pow(player.talismanLevels[i] - 30,3)))
        player.uncommonFragments -= priceMult * Math.max(0, Math.floor(1 + 1/384 * Math.pow(player.talismanLevels[i] - 60,3)))
        player.rareFragments -= priceMult * Math.max(0, Math.floor(1 + 1/250 * Math.pow(player.talismanLevels[i] - 90,3)))
        player.epicFragments -= priceMult * Math.max(0, Math.floor(1 + 1/125 * Math.pow(player.talismanLevels[i] - 120,3)))
        player.legendaryFragments -= priceMult * Math.max(0, Math.floor(1 + 1/64 * Math.pow(player.talismanLevels[i] - 150,3)))
        player.mythicalFragments -= priceMult * Math.max(0, Math.floor(1 + 1/128 * Math.pow(player.talismanLevels[i] - 150,3)))
        player.talismanLevels[i] += 1;

    }
    updateTalismanInventory();
    showTalismanPrices(i);
    calculateRuneLevels();
}

function buyTalismanEnhance(i){
    let checkSum = 0;
    if (player.talismanRarity[i] < 6){
    let priceMult = talismanLevelCostMultiplier[i];
    let array = [null, commonTalismanEnhanceCost, uncommonTalismanEnchanceCost, rareTalismanEnchanceCost, epicTalismanEnhanceCost, legendaryTalismanEnchanceCost, mythicalTalismanEnchanceCost];
    let index = player.talismanRarity[i];
    let costArray = array[index];
    if(player.commonFragments >= priceMult * costArray[2]){checkSum++}
    if(player.uncommonFragments >= priceMult * costArray[3]){checkSum++}
    if(player.rareFragments >= priceMult * costArray[4]){checkSum++}
    if(player.epicFragments >= priceMult * costArray[5]){checkSum++}
    if(player.legendaryFragments >= priceMult * costArray[6]){checkSum++}
    if(player.mythicalFragments >= priceMult * costArray[7]){checkSum++}


    if(checkSum == 6){
        player.commonFragments -= (priceMult * costArray[2])
        player.uncommonFragments -= (priceMult * costArray[3])
        player.rareFragments -= (priceMult * costArray[4])
        player.epicFragments -= (priceMult * costArray[5])
        player.legendaryFragments -= (priceMult * costArray[6])
        player.mythicalFragments -= (priceMult * costArray[7])
        player.talismanRarity[i] += 1
    }

    updateTalismanAppearance(i);
    updateTalismanInventory();
    showEnhanceTalismanPrices(i);
    calculateRuneLevels();
}
}