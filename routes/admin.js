var express = require('express');
var router = express.Router();

// Require controller modules
const userController = require('../controllers/userController');
const adminController = require('../controllers/adminController');
const validatorController = require('../controllers/validatorController');

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
router.post('/:username/announcements/search', validatorController.searchVS, adminController.announcementsSearch);
router.get('/:username/announcements/newannouncement', adminController.announcements);
router.post('/:username/announcements/newannouncement', validatorController.nameSanitizer, adminController.newAnnouncementPost);
router.get('/:username/announcements/edit/:announcementId', adminController.editAnnouncementGet);
router.post('/:username/announcements/edit/:announcementId', validatorController.nameSanitizer, adminController.editAnnouncementPost);

// Heroes Edit and Delete
router.get('/:username/heroes', adminController.heroes);
router.get('/:username/heroes/:heroId', userController.newHeroGet);

// Races CURD
router.get('/:username/races', adminController.races);
router.post('/:username/races/search', validatorController.searchVS, adminController.racesSearch);
router.get('/:username/races/newrace', adminController.races);
router.post('/:username/races/newrace', validatorController.raceVS, adminController.newRacePost);
router.get('/:username/races/edit/:raceId', adminController.editRaceGet);
router.post('/:username/races/edit/:raceId', validatorController.raceVS, adminController.editRacePost);

// Classes CURD
router.get('/:username/classes', adminController.classes);
router.post('/:username/classes/search', validatorController.searchVS, adminController.classesSearch);
router.get('/:username/classes/newclass', adminController.classes);
router.post('/:username/classes/newclass', validatorController.classVS, adminController.newClassPost);
router.get('/:username/classes/edit/:classId', adminController.editClassGet);
router.post('/:username/classes/edit/:classId', validatorController.classVS, adminController.editClassPost);

module.exports = router;