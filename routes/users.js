var express = require('express');
var router = express.Router();

/* Require controller modules */
const userController = require('../controllers/userController');

/* GET users listing. */
router.get('/', function(req, res, next) {
  req.isAuthenticated()
    // ? res.send('respond with a resource - '+req.user.username)
    ? res.redirect(`/users/${req.user.username}`)
    : res.redirect('/login');
});

/* Account View Routes */
router.get('/*', userController.isAuth);
router.get('/:username', userController.accountView);
router.get('/:username/changepassword', userController.accountView); // Must add post for editing password

// Hero
router.get('/:username/heroes', userController.heroes);
router.get('/:username/heroes/newHero', userController.newHeroGet);
router.post('/:username/heroes/newHero', 
  userController.upload,
  userController.pushToCloudinary,
  userController.newHeroPost
);

router.get('/:username/heroes/:heroId', userController.newHeroGet);
router.post('/:username/heroes/:heroId', 
  userController.upload,
  userController.pushToCloudinary,
  userController.editHeroPost
);

// Spells
router.get('/:username/spells', userController.spells);
router.post('/:username/savespell', userController.saveSpellPost);
router.post('/:username/editSpell', userController.editSpellPost);

// TEMP CREATE RACE AND CLASS
// const Race = require('../models/race');
// router.get('/:username/temprace', async (req, res, next) => {
//   try {
//     const race = new Race();
//     race.name = 'Tortle';
//     race.description = "What many tortles consider a simple life, others might call a life of adventure. Tortles are born near sandy coastlines, but as soon as they're able to walk on two legs, they become nomad survivalists eager to explore the wilderness, experience its many wonders, put their skills to the test, and make new acquaintances.";
//     const strAbilityIncrease = {
//       name: 'strength',
//       increase: 2
//     };
//     const wisAbilityIncrease = {
//       name: 'wisdom',
//       increase: 1
//     };
//     race.ability_increase.push(strAbilityIncrease);
//     race.ability_increase.push(wisAbilityIncrease);
//     race.speed = 30;
//     race.alignment = 'Lawful Good';
//     race.size = 'Medium';
//     race.languages = 'Common, Aquan';
//     race.traits = 'Claws - Desc\nHold Breath - Desc\nNatural Armor - Desc\nShell Defense - Desc\nSurvival Instinct - Desc';

//     await race.save()
//     res.json(race);
//   } catch (error) {
//     next(error);
//   }
// });
// const Class = require('../models/class');
// router.get('/:username/temprace', async (req, res, next) => {
//   try {
//     const heroClass = new Class();
//     heroClass.name = 'Monk';
//     heroClass.description = 'A master of martial arts, harnessing the power of the body in pursuit of physical and spiritual perfection.';
//     heroClass.hit_die = 'd8';
//     heroClass.hitpoints_start = '8 + your Constitution modifier';
//     heroClass.hitpoints_higherlvls = '1d8 (or 5) + your Constitution modifier per Monk level after 1st';
//     heroClass.abilities.push('dexterity');
//     heroClass.abilities.push('wisdom');
//     heroClass.st_proficiencies.push('strength');
//     heroClass.st_proficiencies.push('dexterity');
//     heroClass.skills.choose = 2;
//     const skills = ['acrobatics', 'athletics', 'history', 'insight', 'religion', 'stealth'];
//     heroClass.skills.skills = skills;

//     heroClass.spell_ability = 'wisdom';
    
//     heroClass.armor_weapon_proficiencies = 'Simple weapons and shortswords.';
//     heroClass.tool_proficiencies = 'Choose one type of the artisan\'s tools or one musical instrument.'

//     await heroClass.save();
//     res.json(heroClass);
//   } catch (error) {
//     next(error);
//   }
// });


// Story
router.get('/:username/story', userController.story);
router.get('/:username/story/newstory', userController.newStoryGet);
router.post('/:username/story/newstory', userController.newStoryPost);
router.get('/:username/story/edit/:storyId', userController.editStoryGet);
router.post('/:username/story/edit/:storyId', userController.editStoryPost);

// Characters
router.get('/:username/characters', userController.characters);
router.get('/:username/characters/newcharacter', userController.newCharacterGet);
router.post('/:username/characters/newcharacter',
  userController.upload,
  userController.pushToCloudinary,
  userController.newCharacterPost
);
router.get('/:username/characters/edit/:characterId', userController.editCharacterGet);
router.post('/:username/characters/edit/:characterId',
  userController.upload,
  userController.pushToCloudinary,
  userController.editCharacterPost
);

/* DM */
// Manage Heroes
router.get('/user/:username/manageheroes',
  userController.isDM,
  userController.accountView
);

router.get('/user/:username/addhero', 
  userController.isDMorAdmin,
  userController.addHeroGet
);
router.post('/user/:username/addhero', userController.addHeroPost);

router.get('/user/:username/edithero/:heroname',
  userController.isDMorAdmin,
  userController.dmEditHeroGet
);
router.post('/user/:username/edithero/:heroname', userController.dmEditHeroPost);

// Announcements
router.get('/user/:username/announcements', 
  userController.isDMorAdmin,
  userController.announcementsGet
);
router.get('/user/:username/announcements/addAnnouncement', userController.announcementsGet);
router.post('/user/:username/announcements/addAnnouncement', userController.addAnnouncement);
router.get('/user/:username/announcements/:announcementId', userController.announcementsGet);
router.post('/user/:username/announcements/:announcementId', userController.announcementsPost);
router.get('/user/:username/announcements/:announcementId/saved', userController.announcementsGet);
router.post('/user/:username/announcements/:announcementId/saved', userController.announcementsPost);

module.exports = router;