var express = require('express');
var router = express.Router();

// Require controller modules
const sideQuestController = require('../controllers/sideQuestController');
const userController = require('../controllers/userController');
const characterSheet = require('../controllers/characterSheet');

/* GET home page. */
router.get('/', sideQuestController.index);

/* Heroes */
router.get('/heroes', sideQuestController.heroes);
router.get('/heroes/:heroName', sideQuestController.heroSummary);

/* Character Sheets Routes */
router.get('/heroes/:hero/charactersheet/:selector', characterSheet.fillPdf);

/* Characters */
router.get('/characters', sideQuestController.characters);
router.get('/characters/:characterName', sideQuestController.characters);
router.post('/characters/:characterName/createcomment', sideQuestController.addCommentPost);
router.post('/characters/:characterName/deletecomment/:commentId', sideQuestController.deleteCommentPost);
router.post('/characters/search', sideQuestController.charactersSearch);

/* Story */
router.get('/story', sideQuestController.story);
router.get('/story/:storyId', sideQuestController.story);
router.post('/story/:storyId/createcomment', sideQuestController.addCommentPost);
router.post('/story/:storyId/deletecomment/:commentId', sideQuestController.deleteCommentPost);
router.post('/story/search', sideQuestController.storySearch);

/* Maps */
router.get('/maps', sideQuestController.maps);
router.get('/maps/:mapId', sideQuestController.maps);
router.post('/maps/:mapId/createcomment', sideQuestController.addCommentPost);
router.post('/maps/:mapId/deletecomment/:commentId', sideQuestController.deleteCommentPost);
router.post('/maps/search', sideQuestController.mapsSearch);

/* Login */
router.get('/login', userController.loginGet);
router.post('/login', userController.loginPost);

/* Signup */
router.get('/signup', userController.signUpGet);
router.post('/signup', 
    userController.signUpPost,
    userController.loginPost
);

/* Logout */
router.get('/logout', userController.logout);


module.exports = router;

