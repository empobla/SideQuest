var express = require('express');
var router = express.Router();

/* Require controller modules */
const userController = require('../controllers/userController');

/* GET users listing. */
router.get('/', function(req, res, next) {
  req.isAuthenticated()
    // ? res.send('respond with a resource - '+req.user.username)
    ? res.redirect(`/users/user/${req.user.username}`)
    : res.redirect('/users/login');
});

/* Account View Routes */
router.get('/user/*', userController.isAuth);
router.get('/user/:username', userController.accountView);
router.get('/user/:username/changepassword', userController.accountView); // Must add post for editing password

// Hero
router.get('/user/:username/hero/:pageNumber', userController.editHeroGet);
router.get('/user/:username/hero/:pageNumber/:saved', userController.editHeroGet);
router.post('/user/:username/hero/save/:pageNumber', 
  userController.upload,
  userController.pushToCloudinary,
  userController.editHeroPost
);
router.post('/user/:username/savespell', userController.saveSpell);
router.post('/user/:username/removeCharacterSpell', userController.removeCharacterSpell);
router.post('/user/:username/editSpell', userController.editSpell);

// Story
router.get('/user/:username/story', userController.editStoryGet);
router.get('/user/:username/story/addStory', userController.editStoryGet);
router.post('/user/:username/story/addStory', userController.addStory);
router.get('/user/:username/story/:storyId', userController.editStoryGet);
router.post('/user/:username/story/:storyId', userController.editStoryPost);

// Characters
router.get('/user/:username/characters', userController.editCharactersGet);
router.get('/user/:username/characters/addCharacter', userController.editCharactersGet);
router.post('/user/:username/characters/addCharacter', 
  userController.upload,
  userController.pushToCloudinary,
  userController.addCharacter
);
router.get('/user/:username/characters/:characterName', userController.editCharactersGet);
router.post('/user/:username/characters/:characterName', 
  userController.upload,
  userController.pushToCloudinary,
  userController.editCharactersPost
);

/* DM */
// Manage Heroes
router.get('/user/:username/manageheroes',
  userController.isDM,
  userController.accountView
);

router.get('/user/:username/addhero', 
  userController.isDM,
  userController.addHeroGet
);
router.post('/user/:username/addhero', userController.addHeroPost);

router.get('/user/:username/edithero/:heroname',
  userController.isDM,
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

/* Admin */

/* Get log in page */
router.get('/login', userController.loginGet);
router.post('/login', userController.loginPost);

router.get('/signup', userController.signUpGet);
router.post('/signup', 
    userController.signUpPost,
    userController.loginPost
);

router.get('/logout', userController.logout);

module.exports = router;