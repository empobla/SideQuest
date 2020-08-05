var express = require('express');
var router = express.Router();

// Require controller modules
const userController = require('../controllers/userController');
const adminController = require('../controllers/adminController');

/* GET admin listing */
router.get('/', function(req, res, next) {
    req.isAuthenticated()
      // ? res.send('respond with a resource - '+req.user.username)
      ? res.redirect(`/users/user/${req.user.username}`)
      : res.redirect('/users/login');
});
router.get('/*',  userController.isAdmin);

// Users Edit and Delete
router.get('/users', adminController.accountView);
router.get('/users/:userId', adminController.accountView);
router.post('/users/:userId', adminController.usersPost);

// Announcements Delete
router.get('/announcements', adminController.accountView);
router.post('/announcements', adminController.announcementsPost);

// Heroes Edit and Delete
router.get('/manageheroes', adminController.accountView);
router.post('/manageheroes', adminController.manageHeroesPost);

// Story Delete
router.get('/story', adminController.accountView);
router.post('/story', adminController.storyPost);

// Characters Delete
router.get('/characters', adminController.accountView);
router.post('/characters', adminController.charactersPost);

module.exports = router;