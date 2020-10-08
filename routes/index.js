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
router.post('/characters/search', sideQuestController.charactersSearch);

/* Story */
router.get('/story', sideQuestController.story);
router.get('/story/:storyId', sideQuestController.story);
router.post('/story/search', sideQuestController.storySearch);

/* Maps */
router.get('/maps', sideQuestController.maps);

/* Login */
router.get('/login', userController.loginGet);
router.post('/login', userController.loginPost);

/* Signup */
router.get('/signup', userController.signUpGet);
router.post('/signup', 
    userController.signUpPost,
    userController.loginPost
);

router.get('/logout', userController.logout);

/* TEST */
// router.get('/test/pagedown', (req, res) => res.render('test/testpagedown'));
// const learningPdfLib = require('../controllers/learningPdfLib');
// router.get('/test', learningPdfLib.pdf);
// router.get('/test2', (req, res) => res.render('test'));

/*router.get('/testform', (req, res) => {
  // req.session.tmpTest = [];
  res.render('testform');
});
router.get('/testform2', (req, res) => {
  const test = req.session.tmpTest;
  console.log(req.session.tmpTest);
  console.log(test);
  res.render('testform', {test});
});

router.post('/data', (req, res) => {

  req.session.tmpTest.firstname = req.body.firstname;
  req.session.tmpTest.lastname = req.body.lastname;
  console.log(req.session.tmpTest);
  res.redirect('/testform2');
});*/



module.exports = router;

