var express = require('express');
var router = express.Router();

// Require controller modules
const userController = require('../controllers/userController');
const adminController = require('../controllers/adminController');

/* GET admin listing */
router.get('/', function(req, res, next) {
    req.isAuthenticated()
      ? res.redirect(`/admin/${req.user.username}`)
      : res.redirect('/users/login');
});
router.get('/*',  userController.isAdmin);
router.get('/:username', adminController.adminView);

// Users Edit and Delete
router.get('/:username/users', adminController.users);
router.get('/:username/users/:userId', adminController.editUserGet);
router.post('/:username/users/:userId', adminController.editUserPost);

// Announcements
router.get('/:username/announcements', adminController.announcements);
router.post('/:username/announcements/search', adminController.announcementsSearch);
router.get('/:username/announcements/newannouncement', adminController.announcements);
router.post('/:username/announcements/newannouncement', adminController.newAnnouncementPost);
router.get('/:username/announcements/edit/:announcementId', adminController.editAnnouncementGet);
router.post('/:username/announcements/edit/:announcementId', adminController.editAnnouncementPost);

// Heroes Edit and Delete
router.get('/:username/heroes', adminController.heroes);
router.get('/:username/heroes/:heroId', userController.newHeroGet);

// Races CURD
router.get('/:username/races', adminController.races);
router.post('/:username/races/search', adminController.racesSearch);
router.get('/:username/races/newrace', adminController.races);
router.post('/:username/races/newrace', adminController.newRacePost);
router.get('/:username/races/edit/:raceId', adminController.editRaceGet);
router.post('/:username/races/edit/:raceId', adminController.editRacePost);

// Classes CURD
router.get('/:username/classes', adminController.classes);
router.post('/:username/classes/search', adminController.classesSearch);
router.get('/:username/classes/newclass', adminController.classes);
router.post('/:username/classes/newclass', adminController.newClassPost);
router.get('/:username/classes/edit/:classId', adminController.editClassGet);
router.post('/:username/classes/edit/:classId', adminController.editClassPost);

// // Story Delete
// router.get('/story', adminController.accountView);
// router.post('/story', adminController.storyPost);

// // Characters Delete
// router.get('/characters', adminController.accountView);
// router.post('/characters', adminController.charactersPost);

module.exports = router;