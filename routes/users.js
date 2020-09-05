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
//     race.name = 'Aasimar';
//     race.description = 'Aasimar are placed in the world to serve as guardians of law and good. Their patrons expect them to strike at evil, lead by example, and further the cause of justice.';
//     const chaAbilityIncrease = {
//       name: 'charisma',
//       increase: 2
//     };
//     race.ability_increase.push(chaAbilityIncrease);
//     race.speed = 30;
//     race.alignment = 'Lawful Neutral';
//     race.size = 'Medium';
//     race.languages = 'Common, Celestial';
//     race.traits = 'Darkvision - Desc\nCelestial Resistance - Desc\nHealing Hands - Desc\nLight Bearer - Desc';

//     await race.save()
//     res.json(race);
//   } catch (error) {
//     next(error);
//   }
// });
// const Class = require('../models/class');
// router.get('/:username/temprace', async (req, res, next) => {
//   try {
//     // const heroClass = new Class();
//     // heroClass.name = 'Paladin';
//     // heroClass.description = 'A holy warrior bound to a sacred oath.';
//     // heroClass.hit_die = 'd10';
//     // heroClass.abilities.push('strength');
//     // heroClass.abilities.push('charisma');
//     // heroClass.st_proficiencies.push('wisdom');
//     // heroClass.st_proficiencies.push('charisma');
//     // heroClass.armor_weapon_proficiencies = 'All armor, shields, simple and martial weapons.';

//     const heroclass = await Class.findOne({ name: 'Paladin' });
//     heroclass.hitpoints_start = '10 + your Constitution modifier';
//     heroclass.hitpoints_higherlvls = '1d10 (or 6) + your Constitution modifier per Paladin level after 1st'
//     heroclass.spell_ability = 'charisma';
//     heroclass.skills.choose = 2;
//     const skills = ['athletics', 'insight', 'intimidation', 'medicine', 'persuasion', 'religion'];
//     heroclass.skills.skills = skills;

//     await heroclass.save();
//     res.json(heroclass);
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