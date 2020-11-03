var express = require('express');
var router = express.Router();

// Require controller modules
const indexController = require('../controllers/indexController');
const userController = require('../controllers/userController');
const characterSheet = require('../controllers/characterSheet');

/* GET home page. */
router.get('/', indexController.index);

/* Heroes */
router.get('/heroes', indexController.heroes);
router.get('/heroes/:heroName', indexController.heroSummary);

/* Character Sheets Routes */
router.get('/heroes/:hero/charactersheet/:selector', characterSheet.fillPdf);

/* Characters */
router.get('/characters', indexController.characters);
router.get('/characters/:characterName', indexController.characters);
router.post('/characters/:characterName/createcomment', indexController.addCommentPost);
router.post('/characters/:characterName/deletecomment/:commentId', indexController.deleteCommentPost);
router.post('/characters/search', indexController.charactersSearch);

/* Story */
router.get('/story', indexController.story);
router.get('/story/:storyId', indexController.story);
router.post('/story/:storyId/createcomment', indexController.addCommentPost);
router.post('/story/:storyId/deletecomment/:commentId', indexController.deleteCommentPost);
router.post('/story/search', indexController.storySearch);

/* Maps */
router.get('/maps', indexController.maps);
router.get('/maps/:mapId', indexController.maps);
router.post('/maps/:mapId/createcomment', indexController.addCommentPost);
router.post('/maps/:mapId/deletecomment/:commentId', indexController.deleteCommentPost);
router.post('/maps/search', indexController.mapsSearch);

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

