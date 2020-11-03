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
router.get('/:username/spells/search', userController.spellsSearch);

// Story
router.get('/:username/story', userController.story);
router.post('/:username/story/search', userController.storySearch);
router.get('/:username/story/newstory', userController.newStoryGet);
router.post('/:username/story/newstory', userController.newStoryPost);
router.get('/:username/story/edit/:storyId', userController.editStoryGet);
router.post('/:username/story/edit/:storyId', userController.editStoryPost);

// Characters
router.get('/:username/characters', userController.characters);
router.post('/:username/characters/search', userController.charactersSearch);
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

// Maps
router.get('/:username/maps', userController.maps);
router.post('/:username/maps/search', userController.mapsSearch);
router.get('/:username/maps/newmap', userController.newMapGet);
router.post('/:username/maps/newmap', 
  userController.upload,
  userController.pushToCloudinary,
  userController.newMapPost);
router.get('/:username/maps/edit/:mapId', userController.editMapGet);
router.post('/:username/maps/edit/:mapId', 
  userController.upload,
  userController.pushToCloudinary,
  userController.editMapPost);

// FETCH DnD5eAPI Spells
// const fetch = require('node-fetch');
// const Spell = require('../models/spell');
// router.get('/:username/importspells', async (req, res, next) => {
//   try {
//     const data = await fetch('https://www.dnd5eapi.co/api/spells')
//       .then(resp => resp.json())
//       .catch(err => next(err));
    
//     const spellIdxList = data.results.map(result => result.index);

//     const spellPromises = spellIdxList.map(spellIdx => {
//       const spellData = fetch(`https://www.dnd5eapi.co/api/spells/${spellIdx}`)
//         .then(resp => resp.json())
//         .catch(err => next(err));
//       return spellData;
//     });

//     const spellsAPI = await Promise.all(spellPromises);

//     const spells = spellsAPI.map(async spell => {
//       const spellModel = new Spell(spell);
//       spellModel.school = spell.school.name;
//       spellModel.materials = spell.material;
//       spellModel.description = spell.desc.join('\n');
//       if(spell.higher_level) spellModel.description += '\nAt Higher Levels:\n' + spell.higher_level;
//       await spellModel.save()
//     });

//     // res.json(spells)
//     res.send('done')
//   } catch(error) {
//     next(error);
//   }
// });

module.exports = router;