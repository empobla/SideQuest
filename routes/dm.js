var express = require('express');
var router = express.Router();

// Require controller modules
const userController = require('../controllers/userController');
const adminController = require('../controllers/adminController');
const dmController = require('../controllers/dmController');
const validatorController = require('../controllers/validatorController');

/* GET admin listing */
router.get('/', function(req, res, next) {
    req.isAuthenticated()
      ? res.redirect(`/dm/${req.user.username}`)
      : res.redirect('/users/login');
});
router.get('/*',  userController.isDM);
router.get('/:username', dmController.dmView);

// Announcements
router.get('/:username/announcements', adminController.announcements);
router.post('/:username/announcements/search', validatorController.searchVS, adminController.announcementsSearch);
router.get('/:username/announcements/newannouncement', adminController.announcements);
router.post('/:username/announcements/newannouncement', validatorController.nameSanitizer, adminController.newAnnouncementPost);
router.get('/:username/announcements/edit/:announcementId', adminController.editAnnouncementGet);
router.post('/:username/announcements/edit/:announcementId', validatorController.nameSanitizer, adminController.editAnnouncementPost);

// Notes
router.get('/:username/notes', dmController.notes);
router.post('/:username/notes/search', validatorController.searchVS, dmController.notesSearch);
router.get('/:username/notes/newnote', dmController.notes);
router.get('/:username/notes/spellsearch', validatorController.searchVS, dmController.notesSpellSearch);
router.get('/:username/notes/charactersearch', validatorController.searchVS, dmController.notesCharsSearch);
router.post('/:username/notes/newnote', validatorController.nameSanitizer, dmController.newNotePost);
router.get('/:username/notes/view/:noteId', dmController.notes);
router.get('/:username/notes/edit/:noteId', dmController.editNoteGet);
router.post('/:username/notes/edit/:noteId', validatorController.nameSanitizer, dmController.editNotePost);

module.exports = router;