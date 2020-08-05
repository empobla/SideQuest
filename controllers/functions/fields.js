const PdfEdit = require('./pdfEdit');

// Have to manually create this.
// Field names can be found using `logAcroFieldNames(pdfDoc)`

// CharacterSheet field names
exports.sheetFieldNames = {
    header: {
        name: 'CharacterName',
        classAndLevel: 'ClassLevel',
        background: 'Background',
        playerName: 'PlayerName',
        race: 'Race ',
        alignment: 'Alignment',
        xp: 'XP'
    },
    attributes: {
        strengthMod: 'STR',
        strength: 'STRmod',
        dexterityMod: 'DEX',
        dexterity: 'DEXmod ',
        constitutionMod: 'CON',
        constitution: 'CONmod',
        intelligenceMod: 'INT',
        intelligence: 'INTmod',
        wisdomMod: 'WIS',
        wisdom: 'WISmod',
        charismaMod: 'CHA',
        charisma: 'CHamod'
    },
    physicalAttributes: {
        armorClass: 'AC',
        initiative: 'Initiative',
        speed: 'Speed',
        maxHitPoints: 'HPMax',
        currentHitPoints: 'HPCurrent',
        tempHitPoints: 'HPTemp',
        totalHitDie: 'HDTotal',
        hitDie: 'HD',
        savingThrows: {
            success: {
                first: 'Check Box 12',
                second: 'Check Box 13',
                third: 'Check Box 14'
            },
            failure: {
                first: 'Check Box 15',
                second: 'Check Box 16',
                third: 'Check Box 17'
            }
        }
    },
    savingThrows: {
        strength: 'ST Strength',
        strengthRadio: 'Check Box 11',
        dexterity: 'ST Dexterity',
        dexterityRadio: 'Check Box 18',
        constitution: 'ST Constitution',
        constitutionRadio: 'Check Box 19',
        intelligence: 'ST Intelligence',
        intelligenceRadio: 'Check Box 20',
        wisdom: 'ST Wisdom',
        wisdomRadio: 'Check Box 21',
        charisma: 'ST Charisma',
        charismaRadio: 'Check Box 22'
    },
    skills: {
        acrobatics: 'Acrobatics',
        acrobaticsRadio: 'Check Box 23',
        animalHandling: 'Animal',
        animalHandlingRadio: 'Check Box 24',
        arcana: 'Arcana',
        arcanaRadio: 'Check Box 25',
        athletics: 'Athletics',
        athleticsRadio: 'Check Box 26',
        deception: 'Deception ',
        deceptionRadio: 'Check Box 27',
        history: 'History ',
        historyRadio: 'Check Box 28',
        insight: 'Insight',
        insightRadio: 'Check Box 29',
        intimidation: 'Intimidation',
        intimidationRadio: 'Check Box 30',
        investigation: 'Investigation ',
        investigationRadio: 'Check Box 31',
        medicine: 'Medicine',
        medicineRadio: 'Check Box 32',
        nature: 'Nature',
        natureRadio: 'Check Box 33',
        perception: 'Perception ',
        perceptionRadio: 'Check Box 34',
        performance: 'Performance',
        performanceRadio: 'Check Box 35',
        persuasion: 'Persuasion',
        persuasionRadio: 'Check Box 36',
        religion: 'Religion',
        religionRadio: 'Check Box 37',
        sleightOfHand: 'SleightofHand',
        sleightOfHandRadio: 'Check Box 38',
        stealth: 'Stealth ',
        stealthRadio: 'Check Box 39',
        survival: 'Survival',
        survivalRadio: 'Check Box 40'
    },
    personality: {
        personalityTraits: 'PersonalityTraits ',
        ideals: 'Ideals',
        bonds: 'Bonds',
        flaws: 'Flaws'
    },
    attacksAndSpellcasting: {
        firstWeapon: {
            name: 'Wpn Name',
            attackBonus: 'Wpn1 AtkBonus',
            damage: 'Wpn1 Damage'
        },
        secondWeapon: {
            name: 'Wpn Name 2',
            attackBonus: 'Wpn2 AtkBonus ',
            damage: 'Wpn2 Damage '
        },
        thirdWeapon: {
            name: 'Wpn Name 3',
            attackBonus: 'Wpn3 AtkBonus  ',
            damage: 'Wpn3 Damage '
        },
        notes: 'AttacksSpellcasting'
    },
    equipment: {
        copperPieces: 'CP',
        silverPieces: 'SP',
        electrumPieces: 'EP',
        goldPieces: 'GP',
        platinumPieces: 'PP',
        equipment: 'Equipment'
    },
    inspiration: 'Inspiration',
    proficiencyBonus: 'ProfBonus',
    passivePerception: 'Passive',
    featuresAndTraits: 'Features and Traits',
    proficienciesAndLanguages: 'ProficienciesLang'
};

// CharacterDetails field names
exports.detailFieldNames = {
    name: 'CharacterName 2',
    age: 'Age',
    height: 'Height',
    weight: 'Weight',
    eyes: 'Eyes',
    skin: 'Skin',
    hair: 'Hair',
    factionSymbolImage: 'Faction Symbol Image',
    allies: 'Allies',
    factionName: 'FactionName',
    backstory: 'Backstory',
    featuresAndTraits: 'Feat+Traits',
    treasure: 'Treasure',
    characterImage: 'CHARACTER IMAGE',
};

exports.spellFieldNames = {
    spellcastingClass: 'Spellcasting Class 2',
    spellcastingAbility: 'SpellcastingAbility 2',
    spellSaveDC: 'SpellSaveDC  2',
    spellAttackBonus: 'SpellAtkBonus 2',
    cantrips: {
        line0: 'Spells 1014',
        line1: 'Spells 1016',
        line2: 'Spells 1017',
        line3: 'Spells 1018',
        line4: 'Spells 1019',
        line5: 'Spells 1020',
        line6: 'Spells 1021',
        line7: 'Spells 1022'
    },
    level1: {
        spellSlots: 'SlotsTotal 19',
        expended: 'SlotsRemaining 19',
        line0: 'Spells 1015',
        line1: 'Spells 1023',
        line2: 'Spells 1024',
        line3: 'Spells 1025',
        line4: 'Spells 1026',
        line5: 'Spells 1027',
        line6: 'Spells 1028',
        line7: 'Spells 1029',
        line8: 'Spells 1030',
        line9: 'Spells 1031',
        line10: 'Spells 1032',
        line11: 'Spells 1033',
    },
    level2: {
        spellSlots: 'SlotsTotal 20',
        expended: 'SlotsRemaining 20',
        line0: 'Spells 1046',
        line1: 'Spells 1034',
        line2: 'Spells 1035',
        line3: 'Spells 1036',
        line4: 'Spells 1037',
        line5: 'Spells 1038',
        line6: 'Spells 1039',
        line7: 'Spells 1040',
        line8: 'Spells 1041',
        line9: 'Spells 1042',
        line10: 'Spells 1043',
        line11: 'Spells 1044',
        line12: 'Spells 1045',
    },
    level3: {
        spellSlots: 'SlotsTotal 21',
        expended: 'SlotsRemaining 21',
        line0: 'Spells 1048',
        line1: 'Spells 1047',
        line2: 'Spells 1049',
        line3: 'Spells 1050',
        line4: 'Spells 1051',
        line5: 'Spells 1052',
        line6: 'Spells 1053',
        line7: 'Spells 1054',
        line8: 'Spells 1055',
        line9: 'Spells 1056',
        line10: 'Spells 1057',
        line11: 'Spells 1058',
        line12: 'Spells 1059',
    },
    level4: {
        spellSlots: 'SlotsTotal 22',
        expended: 'SlotsRemaining 22',
        line0: 'Spells 1061',
        line1: 'Spells 1060',
        line2: 'Spells 1062',
        line3: 'Spells 1063',
        line4: 'Spells 1064',
        line5: 'Spells 1065',
        line6: 'Spells 1066',
        line7: 'Spells 1067',
        line8: 'Spells 1068',
        line9: 'Spells 1069',
        line10: 'Spells 1070',
        line11: 'Spells 1071',
        line12: 'Spells 1072',
    },
    level5: {
        spellSlots: 'SlotsTotal 23',
        expended: 'SlotsRemaining 23',
        line0: 'Spells 1074',
        line1: 'Spells 1073',
        line2: 'Spells 1075',
        line3: 'Spells 1076',
        line4: 'Spells 1077',
        line5: 'Spells 1078',
        line6: 'Spells 1079',
        line7: 'Spells 1080',
        line8: 'Spells 1081',
    },
    level6: {
        spellSlots: 'SlotsTotal 24',
        expended: 'SlotsRemaining 24',
        line0: 'Spells 1083',
        line1: 'Spells 1082',
        line2: 'Spells 1084',
        line3: 'Spells 1085',
        line4: 'Spells 1086',
        line5: 'Spells 1087',
        line6: 'Spells 1088',
        line7: 'Spells 1089',
        line8: 'Spells 1090',
    },
    level7: {
        spellSlots: 'SlotsTotal 25',
        expended: 'SlotsRemaining 25',
        line0: 'Spells 1092',
        line1: 'Spells 1091',
        line2: 'Spells 1093',
        line3: 'Spells 1094',
        line4: 'Spells 1095',
        line5: 'Spells 1096',
        line6: 'Spells 1097',
        line7: 'Spells 1098',
        line8: 'Spells 1099',
    },
    level8: {
        spellSlots: 'SlotsTotal 26',
        expended: 'SlotsRemaining 26',
        line0: 'Spells 10101',
        line1: 'Spells 10100',
        line2: 'Spells 10102',
        line3: 'Spells 10103',
        line4: 'Spells 10104',
        line5: 'Spells 10105',
        line6: 'Spells 10106',
    },
    level9: {
        spellSlots: 'SlotsTotal 27',
        expended: 'SlotsRemaining 27',
        line0: 'Spells 10108',
        line1: 'Spells 10107',
        line2: 'Spells 10109',
        line3: 'Spells 101010',
        line4: 'Spells 101011',
        line5: 'Spells 101012',
        line6: 'Spells 101013',
    }
};

/***************************************************/
/************* Fill Sheet Functions ****************/
/***************************************************/

// Fills in CharacterDetails PDF fields
exports.detailsFillFields = (pdfDoc, fieldNames, hero, font) => {
    // Basic Info/Header
    PdfEdit.fillInField(pdfDoc, fieldNames.age, `${hero.info.age}`, font);
    PdfEdit.fillInFieldCenter(pdfDoc, fieldNames.name, hero.name, font);
    PdfEdit.fillInField(pdfDoc, fieldNames.height, `${hero.info.height || ''}`, font);
    PdfEdit.fillInField(pdfDoc, fieldNames.weight, `${hero.info.weight} lbs`, font);
    PdfEdit.fillInField(pdfDoc, fieldNames.eyes, `${hero.info.eye_color || ''}`, font);
    PdfEdit.fillInField(pdfDoc, fieldNames.skin, `${hero.info.skin_color || ''}`, font);
    PdfEdit.fillInField(pdfDoc, fieldNames.hair, `${hero.info.hair_color || ''}`, font);
    
    // Backstory
    PdfEdit.fillInField(pdfDoc, fieldNames.backstory, `${hero.story.backstory || ''}`, font, { multiline: true });
    
    // Features and Traits
    PdfEdit.fillInField(pdfDoc, fieldNames.featuresAndTraits, `${hero.additional_info.additional_features_traits || ''}`, font, { multiline: true });
    
    // Allies and Organizations
    PdfEdit.fillInField(pdfDoc, fieldNames.allies, `${hero.story.allies_and_organizations.text || ''}`, font, { multiline: true });
    
    // Emblem Name
    PdfEdit.fillInField(pdfDoc, fieldNames.factionName, `${hero.story.allies_and_organizations.organization_name || ''}`, font);

    // Treasure
    PdfEdit.fillInField(pdfDoc, fieldNames.treasure, `${hero.treasure.text || ''}`, font, { multiline: true });

    // PdfEdit.logAcroFieldNames(pdfDoc);
};

// Fills in CharacterSheet PDF fields
exports.sheetFillFields = (pdfDoc, fieldNames, hero, font) => {
    // Basic Info/Header
    PdfEdit.fillInFieldCenter(pdfDoc, fieldNames.header.name, hero.name, font);
    PdfEdit.fillInField(pdfDoc, fieldNames.header.classAndLevel, `${hero.info.class || '???'}, ${hero.info.level}`, font);
    PdfEdit.fillInField(pdfDoc, fieldNames.header.background, `${hero.info.background || ''}`, font);
    PdfEdit.fillInField(pdfDoc, fieldNames.header.playerName, hero.player_name, font);
    PdfEdit.fillInField(pdfDoc, fieldNames.header.race, `${hero.info.race || ''}`, font);
    PdfEdit.fillInField(pdfDoc, fieldNames.header.alignment, `${hero.info.alignment || ''}`, font);
    PdfEdit.fillInField(pdfDoc, fieldNames.header.xp, 'N/A', font);

    // Floating Stats
    PdfEdit.fillInFieldCenter(pdfDoc, fieldNames.inspiration, `${hero.attributes.inspiration ? 'Y': ''}`, font);
    PdfEdit.fillInFieldCenter(pdfDoc, fieldNames.proficiencyBonus, `${hero.attributes.proficiency_bonus > 0 ? '+' + hero.attributes.proficiency_bonus : hero.attributes.proficiency_bonus}`, font);
    PdfEdit.fillInFieldCenter(pdfDoc, fieldNames.passivePerception, `${hero.attributes.passive_perception}`, font);

    // Attributes
    PdfEdit.fillInFieldCenter(pdfDoc, fieldNames.attributes.strength, `${hero.attributes.strength}`, font);
    PdfEdit.fillInFieldCenter(pdfDoc, fieldNames.attributes.strengthMod, `${hero.attributes.strengthMod > 0 ? '+' + hero.attributes.strengthMod : hero.attributes.strengthMod}`, font);
    PdfEdit.fillInFieldCenter(pdfDoc, fieldNames.attributes.dexterity, `${hero.attributes.dexterity}`, font);
    PdfEdit.fillInFieldCenter(pdfDoc, fieldNames.attributes.dexterityMod, `${hero.attributes.dexterityMod > 0 ? '+' + hero.attributes.dexterityMod : hero.attributes.dexterityMod}`, font);
    PdfEdit.fillInFieldCenter(pdfDoc, fieldNames.attributes.constitution, `${hero.attributes.constitution}`, font);
    PdfEdit.fillInFieldCenter(pdfDoc, fieldNames.attributes.constitutionMod, `${hero.attributes.constitutionMod > 0 ? '+' + hero.attributes.constitutionMod : hero.attributes.constitutionMod}`, font);
    PdfEdit.fillInFieldCenter(pdfDoc, fieldNames.attributes.intelligence, `${hero.attributes.intelligence}`, font);
    PdfEdit.fillInFieldCenter(pdfDoc, fieldNames.attributes.intelligenceMod, `${hero.attributes.intelligenceMod > 0 ? '+' + hero.attributes.intelligenceMod : hero.attributes.intelligenceMod}`, font);
    PdfEdit.fillInFieldCenter(pdfDoc, fieldNames.attributes.wisdom, `${hero.attributes.wisdom}`, font);
    PdfEdit.fillInFieldCenter(pdfDoc, fieldNames.attributes.wisdomMod, `${hero.attributes.wisdomMod > 0 ? '+' + hero.attributes.wisdomMod : hero.attributes.wisdomMod}`, font);
    PdfEdit.fillInFieldCenter(pdfDoc, fieldNames.attributes.charisma, `${hero.attributes.charisma}`, font);
    PdfEdit.fillInFieldCenter(pdfDoc, fieldNames.attributes.charismaMod, `${hero.attributes.charismaMod > 0 ? '+' + hero.attributes.charismaMod : hero.attributes.charismaMod}`, font);

    // Physical Attributes
    PdfEdit.fillInFieldCenter(pdfDoc, fieldNames.physicalAttributes.armorClass, `${hero.physical_attributes.ac}`, font);
    PdfEdit.fillInFieldCenter(pdfDoc, fieldNames.physicalAttributes.initiative, `${hero.physical_attributes.initiative > 0 ? '+' + hero.physical_attributes.initiative : hero.physical_attributes.initiative}`, font);
    PdfEdit.fillInFieldCenter(pdfDoc, fieldNames.physicalAttributes.speed, `${hero.physical_attributes.speed}`, font);
    PdfEdit.fillInFieldCenter(pdfDoc, fieldNames.physicalAttributes.maxHitPoints, `${hero.physical_attributes.max_hp}`, font);
    PdfEdit.fillInFieldCenter(pdfDoc, fieldNames.physicalAttributes.currentHitPoints, `${hero.physical_attributes.current_hp}`, font);
    PdfEdit.fillInFieldCenter(pdfDoc, fieldNames.physicalAttributes.tempHitPoints, `${hero.physical_attributes.temp_hp}`, font);
    PdfEdit.fillInFieldCenter(pdfDoc, fieldNames.physicalAttributes.totalHitDie, `${hero.physical_attributes.total_hitdie}`, font);
    PdfEdit.fillInFieldCenter(pdfDoc, fieldNames.physicalAttributes.hitDie, `${hero.physical_attributes.current_hitdie}`, font);
    
    // Death Saving Throws
    PdfEdit.fillInRadio(pdfDoc, fieldNames.physicalAttributes.savingThrows.success.first, 'No');
    PdfEdit.fillInRadio(pdfDoc, fieldNames.physicalAttributes.savingThrows.success.second, 'No');
    PdfEdit.fillInRadio(pdfDoc, fieldNames.physicalAttributes.savingThrows.success.third, 'No');
    PdfEdit.fillInRadio(pdfDoc, fieldNames.physicalAttributes.savingThrows.failure.first, 'No');
    PdfEdit.fillInRadio(pdfDoc, fieldNames.physicalAttributes.savingThrows.failure.second, 'No');
    PdfEdit.fillInRadio(pdfDoc, fieldNames.physicalAttributes.savingThrows.failure.third, 'No');
    switch(hero.physical_attributes.deathsaves_success) {
        case 3:
            PdfEdit.fillInRadio(pdfDoc, fieldNames.physicalAttributes.savingThrows.success.third, 'Yes');
        case 2:
            PdfEdit.fillInRadio(pdfDoc, fieldNames.physicalAttributes.savingThrows.success.second, 'Yes');
        case 1:
            PdfEdit.fillInRadio(pdfDoc, fieldNames.physicalAttributes.savingThrows.success.first, 'Yes');
            break;
        default:
            break;
    }

    switch(hero.physical_attributes.deathsaves_fail) {
        case 3:
            PdfEdit.fillInRadio(pdfDoc, fieldNames.physicalAttributes.savingThrows.failure.third, 'Yes');
        case 2:
            PdfEdit.fillInRadio(pdfDoc, fieldNames.physicalAttributes.savingThrows.failure.second, 'Yes');
        case 1:
            PdfEdit.fillInRadio(pdfDoc, fieldNames.physicalAttributes.savingThrows.failure.first, 'Yes');
            break;
        default:
            break;
    }

    // Saving Throws
    PdfEdit.fillInFieldCenter(pdfDoc, fieldNames.savingThrows.strength, `${hero.saving_throws.strength.value > 0 ? '+' + hero.saving_throws.strength.value : hero.saving_throws.strength.value}`, font);
    hero.saving_throws.strength.proficient ? PdfEdit.fillInRadio(pdfDoc, fieldNames.savingThrows.strengthRadio, 'Yes') : PdfEdit.fillInRadio(pdfDoc, fieldNames.savingThrows.strengthRadio, 'No');
    PdfEdit.fillInFieldCenter(pdfDoc, fieldNames.savingThrows.dexterity, `${hero.saving_throws.dexterity.value > 0 ? '+' + hero.saving_throws.dexterity.value : hero.saving_throws.dexterity.value}`, font);
    hero.saving_throws.dexterity.proficient ? PdfEdit.fillInRadio(pdfDoc, fieldNames.savingThrows.dexterityRadio, 'Yes') : PdfEdit.fillInRadio(pdfDoc, fieldNames.savingThrows.dexterityRadio, 'No');
    PdfEdit.fillInFieldCenter(pdfDoc, fieldNames.savingThrows.constitution, `${hero.saving_throws.constitution.value > 0 ? '+' + hero.saving_throws.constitution.value : hero.saving_throws.constitution.value}`, font);
    hero.saving_throws.constitution.proficient ? PdfEdit.fillInRadio(pdfDoc, fieldNames.savingThrows.constitutionRadio, 'Yes') : PdfEdit.fillInRadio(pdfDoc, fieldNames.savingThrows.constitutionRadio, 'No');
    PdfEdit.fillInFieldCenter(pdfDoc, fieldNames.savingThrows.intelligence, `${hero.saving_throws.intelligence.value > 0 ? '+' + hero.saving_throws.intelligence.value : hero.saving_throws.intelligence.value}`, font);
    hero.saving_throws.intelligence.proficient ? PdfEdit.fillInRadio(pdfDoc, fieldNames.savingThrows.intelligenceRadio, 'Yes') : PdfEdit.fillInRadio(pdfDoc, fieldNames.savingThrows.intelligenceRadio, 'No');
    PdfEdit.fillInFieldCenter(pdfDoc, fieldNames.savingThrows.wisdom, `${hero.saving_throws.wisdom.value > 0 ? '+' + hero.saving_throws.wisdom.value : hero.saving_throws.wisdom.value}`, font);
    hero.saving_throws.wisdom.proficient ? PdfEdit.fillInRadio(pdfDoc, fieldNames.savingThrows.wisdomRadio, 'Yes') : PdfEdit.fillInRadio(pdfDoc, fieldNames.savingThrows.wisdomRadio, 'No');
    PdfEdit.fillInFieldCenter(pdfDoc, fieldNames.savingThrows.charisma, `${hero.saving_throws.charisma.value > 0 ? '+' + hero.saving_throws.charisma.value : hero.saving_throws.charisma.value}`, font);
    hero.saving_throws.charisma.proficient ? PdfEdit.fillInRadio(pdfDoc, fieldNames.savingThrows.charismaRadio, 'Yes') : PdfEdit.fillInRadio(pdfDoc, fieldNames.savingThrows.charismaRadio, 'No');

    // Skills
    PdfEdit.fillInFieldCenter(pdfDoc, fieldNames.skills.acrobatics, `${hero.skills.acrobatics.value > 0 ? '+' + hero.skills.acrobatics.value : hero.skills.acrobatics.value}`, font);
    hero.skills.acrobatics.proficient ? PdfEdit.fillInRadio(pdfDoc, fieldNames.skills.acrobaticsRadio, 'Yes') : PdfEdit.fillInRadio(pdfDoc, fieldNames.skills.acrobaticsRadio, 'No');
    PdfEdit.fillInFieldCenter(pdfDoc, fieldNames.skills.animalHandling, `${hero.skills.animal_handling.value > 0 ? '+' + hero.skills.animal_handling.value : hero.skills.animal_handling.value}`, font);
    hero.skills.animal_handling.proficient ? PdfEdit.fillInRadio(pdfDoc, fieldNames.skills.animalHandlingRadio, 'Yes') : PdfEdit.fillInRadio(pdfDoc, fieldNames.skills.animalHandlingRadio, 'No');
    PdfEdit.fillInFieldCenter(pdfDoc, fieldNames.skills.arcana, `${hero.skills.arcana.value > 0 ? '+' + hero.skills.arcana.value : hero.skills.arcana.value}`, font);
    hero.skills.arcana.proficient ? PdfEdit.fillInRadio(pdfDoc, fieldNames.skills.arcanaRadio, 'Yes') : PdfEdit.fillInRadio(pdfDoc, fieldNames.skills.arcanaRadio, 'No');
    PdfEdit.fillInFieldCenter(pdfDoc, fieldNames.skills.athletics, `${hero.skills.athletics.value > 0 ? '+' + hero.skills.athletics.value : hero.skills.athletics.value}`, font);
    hero.skills.athletics.proficient ? PdfEdit.fillInRadio(pdfDoc, fieldNames.skills.athleticsRadio, 'Yes') : PdfEdit.fillInRadio(pdfDoc, fieldNames.skills.athleticsRadio, 'No');
    PdfEdit.fillInFieldCenter(pdfDoc, fieldNames.skills.deception, `${hero.skills.deception.value > 0 ? '+' + hero.skills.deception.value : hero.skills.deception.value}`, font);
    hero.skills.deception.proficient ? PdfEdit.fillInRadio(pdfDoc, fieldNames.skills.deceptionRadio, 'Yes') : PdfEdit.fillInRadio(pdfDoc, fieldNames.skills.deceptionRadio, 'No');
    PdfEdit.fillInFieldCenter(pdfDoc, fieldNames.skills.history, `${hero.skills.history.value > 0 ? '+' + hero.skills.history.value : hero.skills.history.value}`, font);
    hero.skills.history.proficient ? PdfEdit.fillInRadio(pdfDoc, fieldNames.skills.historyRadio, 'Yes') : PdfEdit.fillInRadio(pdfDoc, fieldNames.skills.historyRadio, 'No');
    PdfEdit.fillInFieldCenter(pdfDoc, fieldNames.skills.insight, `${hero.skills.insight.value > 0 ? '+' + hero.skills.insight.value : hero.skills.insight.value}`, font);
    hero.skills.insight.proficient ? PdfEdit.fillInRadio(pdfDoc, fieldNames.skills.insightRadio, 'Yes') : PdfEdit.fillInRadio(pdfDoc, fieldNames.skills.insightRadio, 'No');
    PdfEdit.fillInFieldCenter(pdfDoc, fieldNames.skills.intimidation, `${hero.skills.intimidation.value > 0 ? '+' + hero.skills.intimidation.value : hero.skills.intimidation.value}`, font);
    hero.skills.intimidation.proficient ? PdfEdit.fillInRadio(pdfDoc, fieldNames.skills.intimidationRadio, 'Yes') : PdfEdit.fillInRadio(pdfDoc, fieldNames.skills.intimidationRadio, 'No');
    PdfEdit.fillInFieldCenter(pdfDoc, fieldNames.skills.investigation, `${hero.skills.investigation.value > 0 ? '+' + hero.skills.investigation.value : hero.skills.investigation.value}`, font);
    hero.skills.investigation.proficient ? PdfEdit.fillInRadio(pdfDoc, fieldNames.skills.investigationRadio, 'Yes') : PdfEdit.fillInRadio(pdfDoc, fieldNames.skills.investigationRadio, 'No');
    PdfEdit.fillInFieldCenter(pdfDoc, fieldNames.skills.medicine, `${hero.skills.medicine.value > 0 ? '+' + hero.skills.medicine.value : hero.skills.medicine.value}`, font);
    hero.skills.medicine.proficient ? PdfEdit.fillInRadio(pdfDoc, fieldNames.skills.medicineRadio, 'Yes') : PdfEdit.fillInRadio(pdfDoc, fieldNames.skills.medicineRadio, 'No');
    PdfEdit.fillInFieldCenter(pdfDoc, fieldNames.skills.nature, `${hero.skills.nature.value > 0 ? '+' + hero.skills.nature.value : hero.skills.nature.value}`, font);
    hero.skills.nature.proficient ? PdfEdit.fillInRadio(pdfDoc, fieldNames.skills.natureRadio, 'Yes') : PdfEdit.fillInRadio(pdfDoc, fieldNames.skills.natureRadio, 'No');
    PdfEdit.fillInFieldCenter(pdfDoc, fieldNames.skills.perception, `${hero.skills.perception.value > 0 ? '+' + hero.skills.perception.value : hero.skills.perception.value}`, font);
    hero.skills.perception.proficient ? PdfEdit.fillInRadio(pdfDoc, fieldNames.skills.perceptionRadio, 'Yes') : PdfEdit.fillInRadio(pdfDoc, fieldNames.skills.perceptionRadio, 'No');
    PdfEdit.fillInFieldCenter(pdfDoc, fieldNames.skills.performance, `${hero.skills.performance.value > 0 ? '+' + hero.skills.performance.value : hero.skills.performance.value}`, font);
    hero.skills.performance.proficient ? PdfEdit.fillInRadio(pdfDoc, fieldNames.skills.performanceRadio, 'Yes') : PdfEdit.fillInRadio(pdfDoc, fieldNames.skills.performanceRadio, 'No');
    PdfEdit.fillInFieldCenter(pdfDoc, fieldNames.skills.persuasion, `${hero.skills.persuasion.value > 0 ? '+' + hero.skills.persuasion.value : hero.skills.persuasion.value}`, font);
    hero.skills.persuasion.proficient ? PdfEdit.fillInRadio(pdfDoc, fieldNames.skills.persuasionRadio, 'Yes') : PdfEdit.fillInRadio(pdfDoc, fieldNames.skills.persuasionRadio, 'No');
    PdfEdit.fillInFieldCenter(pdfDoc, fieldNames.skills.religion, `${hero.skills.religion.value > 0 ? '+' + hero.skills.religion.value : hero.skills.religion.value}`, font);
    hero.skills.religion.proficient ? PdfEdit.fillInRadio(pdfDoc, fieldNames.skills.religionRadio, 'Yes') : PdfEdit.fillInRadio(pdfDoc, fieldNames.skills.religionRadio, 'No');
    PdfEdit.fillInFieldCenter(pdfDoc, fieldNames.skills.sleightOfHand, `${hero.skills.sleight_of_hand.value > 0 ? '+' + hero.skills.sleight_of_hand.value : hero.skills.sleight_of_hand.value}`, font);
    hero.skills.sleight_of_hand.proficient ? PdfEdit.fillInRadio(pdfDoc, fieldNames.skills.sleightOfHandRadio, 'Yes') : PdfEdit.fillInRadio(pdfDoc, fieldNames.skills.sleightOfHandRadio, 'No');
    PdfEdit.fillInFieldCenter(pdfDoc, fieldNames.skills.stealth, `${hero.skills.stealth.value > 0 ? '+' + hero.skills.stealth.value : hero.skills.stealth.value}`, font);
    hero.skills.stealth.proficient ? PdfEdit.fillInRadio(pdfDoc, fieldNames.skills.stealthRadio, 'Yes') : PdfEdit.fillInRadio(pdfDoc, fieldNames.skills.stealthRadio, 'No');
    PdfEdit.fillInFieldCenter(pdfDoc, fieldNames.skills.survival, `${hero.skills.survival.value > 0 ? '+' + hero.skills.survival.value : hero.skills.survival.value}`, font);
    hero.skills.survival.proficient ? PdfEdit.fillInRadio(pdfDoc, fieldNames.skills.survivalRadio, 'Yes') : PdfEdit.fillInRadio(pdfDoc, fieldNames.skills.survivalRadio, 'No');

    // Personality
    PdfEdit.fillInField(pdfDoc, fieldNames.personality.personalityTraits, `${hero.personality.personality_traits || ''}`, font, { multiline: true });
    PdfEdit.fillInField(pdfDoc, fieldNames.personality.ideals, `${hero.personality.ideals || ''}`, font, { multiline: true });
    PdfEdit.fillInField(pdfDoc, fieldNames.personality.bonds, `${hero.personality.bonds || ''}`, font, { multiline: true });
    PdfEdit.fillInField(pdfDoc, fieldNames.personality.flaws, `${hero.personality.flaws || ''}`, font, { multiline: true });

    // Attacks and Spellcasting
    switch(hero.attacksAndSpellCasting.weapons.length) {
        case 3:
            PdfEdit.fillInField(pdfDoc, fieldNames.attacksAndSpellcasting.thirdWeapon.name, hero.attacksAndSpellCasting.weapons[2].name, font);
            PdfEdit.fillInField(pdfDoc, fieldNames.attacksAndSpellcasting.thirdWeapon.attackBonus, `${hero.attacksAndSpellCasting.weapons[2].attackBonus > 0 ? '+' + hero.attacksAndSpellCasting.weapons[2].attackBonus : hero.attacksAndSpellCasting.weapons[2].attackBonus}`, font);
            PdfEdit.fillInField(pdfDoc, fieldNames.attacksAndSpellcasting.thirdWeapon.damage, hero.attacksAndSpellCasting.weapons[2].damage, font);
        case 2:
            PdfEdit.fillInField(pdfDoc, fieldNames.attacksAndSpellcasting.secondWeapon.name, hero.attacksAndSpellCasting.weapons[1].name, font);
            PdfEdit.fillInField(pdfDoc, fieldNames.attacksAndSpellcasting.secondWeapon.attackBonus, `${hero.attacksAndSpellCasting.weapons[1].attackBonus > 0 ? '+' + hero.attacksAndSpellCasting.weapons[1].attackBonus : hero.attacksAndSpellCasting.weapons[1].attackBonus}`, font);
            PdfEdit.fillInField(pdfDoc, fieldNames.attacksAndSpellcasting.secondWeapon.damage, hero.attacksAndSpellCasting.weapons[1].damage, font);
        case 1:
            PdfEdit.fillInField(pdfDoc, fieldNames.attacksAndSpellcasting.firstWeapon.name, hero.attacksAndSpellCasting.weapons[0].name, font);
            PdfEdit.fillInField(pdfDoc, fieldNames.attacksAndSpellcasting.firstWeapon.attackBonus, `${hero.attacksAndSpellCasting.weapons[0].attackBonus > 0 ? '+' + hero.attacksAndSpellCasting.weapons[0].attackBonus : hero.attacksAndSpellCasting.weapons[0].attackBonus}`, font);
            PdfEdit.fillInField(pdfDoc, fieldNames.attacksAndSpellcasting.firstWeapon.damage, hero.attacksAndSpellCasting.weapons[0].damage, font);
            break;
        default:
            break;
    }
    PdfEdit.fillInField(pdfDoc, fieldNames.attacksAndSpellcasting.notes, `${hero.attacksAndSpellCasting.notes || ''}`, font, { multiline: true });
    
    // Equipment
    PdfEdit.fillInFieldCenter(pdfDoc, fieldNames.equipment.copperPieces, `${hero.equipment.money.copper || 0}`, font);
    PdfEdit.fillInFieldCenter(pdfDoc, fieldNames.equipment.silverPieces, `${hero.equipment.money.silver || 0}`, font);
    PdfEdit.fillInFieldCenter(pdfDoc, fieldNames.equipment.electrumPieces, `${hero.equipment.money.electrum || 0}`, font);
    PdfEdit.fillInFieldCenter(pdfDoc, fieldNames.equipment.goldPieces, `${hero.equipment.money.gold || 0}`, font);
    PdfEdit.fillInFieldCenter(pdfDoc, fieldNames.equipment.platinumPieces, `${hero.equipment.money.platinum || 0}`, font);
    PdfEdit.fillInField(pdfDoc, fieldNames.equipment.equipment, `${hero.equipment.equipment || ''}`, font, { multiline: true });

    // Features and Traits
    PdfEdit.fillInField(pdfDoc, fieldNames.featuresAndTraits, `${hero.additional_info.features_and_traits || ''}`, font, { multiline: true });
    
    // Proficiencies and Languages
    PdfEdit.fillInField(pdfDoc, fieldNames.proficienciesAndLanguages, `${hero.additional_info.proficiencies_and_languages|| ''}`, font, { multiline: true });

    // PdfEdit.logAcroFieldNames(pdfDoc);
};

const fillLevel = (pdfDoc, font, heroSpells, fieldNames, level) => {
    let spells = Object.values(fieldNames);
    let hSpells = heroSpells[level];
    if(level != 0){
        spells.shift();
        spells.shift();
    }
    if(hSpells.length != 0) {
        for(let i = 0; i < spells.length; i++) {
            (hSpells[i] != '' && hSpells[i] != undefined)
                ? PdfEdit.fillInField(pdfDoc, spells[i], `${hSpells[i].name || ''}`, font)
                : PdfEdit.fillInField(pdfDoc, spells[i], '', font);
        }
    } else {
        for(const value of spells) {
            PdfEdit.fillInField(pdfDoc, value, '', font);
        }
    }
};

exports.spellFillFields = (pdfDoc, fieldNames, hero, heroSpells, font) => {
    // PdfEdit.fillInField(pdfDoc, fieldNames.test0, '0', font);

    // Spell Casting Info/Header
    PdfEdit.fillInFieldCenter(pdfDoc, fieldNames.spellcastingClass, `${hero.info.class || ''}`, font);
    let scAbility = '', ssDC = '', saBonus = '';
    if(hero.info.class != '' && hero.info.class != undefined){
        switch(hero.info.class.toLowerCase()){
            case 'sorcerer':
            case 'paladin':
            case 'warlock':
                scAbility = 'Charisma';
                ssDC = '' + (8 + hero.attributes.proficiency_bonus + hero.attributes.charismaMod);
                saBonus = '+' + (hero.attributes.proficiency_bonus + hero.attributes.charismaMod);
                break;
            case 'monk':
                scAbility = 'Ki';
                ssDC = '' + (8 + hero.attributes.proficiency_bonus + hero.attributes.wisdomMod);
                break;
            default:
                break;
        }
    }
    PdfEdit.fillInFieldCenter(pdfDoc, fieldNames.spellcastingAbility, scAbility, font);
    PdfEdit.fillInFieldCenter(pdfDoc, fieldNames.spellSaveDC, ssDC, font);
    PdfEdit.fillInFieldCenter(pdfDoc, fieldNames.spellAttackBonus, saBonus, font);

    // Cantrips
    fillLevel(pdfDoc, font, heroSpells, fieldNames.cantrips, 0);

    // Level 1
    fillLevel(pdfDoc, font, heroSpells, fieldNames.level1, 1);
    
    // Level 2
    fillLevel(pdfDoc, font, heroSpells, fieldNames.level2, 2);
    
    // Level 3
    fillLevel(pdfDoc, font, heroSpells, fieldNames.level3, 3);
    
    // Level 4
    fillLevel(pdfDoc, font, heroSpells, fieldNames.level4, 4);
    
    // Level 5
    fillLevel(pdfDoc, font, heroSpells, fieldNames.level5, 5);
    
    // Level 6
    fillLevel(pdfDoc, font, heroSpells, fieldNames.level6, 6);
    
    // Level 7
    fillLevel(pdfDoc, font, heroSpells, fieldNames.level7, 7);
    
    // Level 8
    fillLevel(pdfDoc, font, heroSpells, fieldNames.level8, 8);
    
    // Level 9
    fillLevel(pdfDoc, font, heroSpells, fieldNames.level9, 9);
    
};