var express = require('express');
var router = express.Router();

// Require controller modules
const sideQuestController = require('../controllers/sideQuestController');
const characterSheet = require('../controllers/characterSheet');

/* GET home page. */
router.get('/', sideQuestController.index);

/* Heroes */
router.get('/heroes', sideQuestController.heroes);
router.get('/heroes/:heroName', (req, res) => {
  const heroName = req.params.heroName;
  res.redirect(`/heroes/${heroName}/summary`)
});
router.get('/heroes/:heroName/summary', sideQuestController.heroSummary);
router.get('/heroes/:heroName/stats', sideQuestController.heroSummary);
router.get('/heroes/:heroName/spells', sideQuestController.heroSummary);
router.get('/heroes/:heroName/sheets', sideQuestController.heroSummary);

/* Character Sheets Routes */
router.get('/heroes/:hero/charactersheet/:selector', characterSheet.fillPdf);

/* Story */
router.get('/story', sideQuestController.story);
router.get('/story/:storyId', sideQuestController.story);

/* Characters */
router.get('/characters', sideQuestController.characters);
router.get('/characters/:characterName', sideQuestController.characters);

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

