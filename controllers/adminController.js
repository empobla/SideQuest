// Require models
const User = require('../models/user');
const Hero = require('../models/hero');
const Story = require('../models/story');
const Character = require('../models/character');
const Announcement = require('../models/announcement');

// Admin Account View
exports.accountView = async (req, res, next) => {
    try{
        const user = req.user;
        
        const userId = req.params.userId;
        const heroesQuery = Hero.find()
        const usersQuery = User.find();
        const userQuery = User.findOne({ _id: userId });
        const announcementsQuery = Announcement.find();
        const storiesQuery = Story.find();
        const charactersQuery = Character.find();
        
        const [heroes, users, selectedUser, announcements, stories, characters] = await Promise.all([
            heroesQuery, usersQuery, userQuery, announcementsQuery, storiesQuery, charactersQuery
        ]);

        res.render('account_view', { title: `SideQuest - ${user.username}`, 
            user, heroes, users, selectedUser, announcements, stories, characters
        });
    } catch(error) {
        next(error);
    }
};

// Users edit and delete
exports.usersPost = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        
        if(req.body.delete == 'true') {
            await User.findByIdAndRemove({ _id: userId });
        } else {
            await User.findByIdAndUpdate(userId, req.body, { new: true });
        }

        res.redirect('/admin/users');
    } catch(error) {
        next(error);
    }
};

// Announcements delete
exports.announcementsPost = async (req, res, next) => {
    try {
        const toDelete = Object.keys(req.body);

        toDelete.forEach(async (announcement) => { await Announcement.findByIdAndRemove({ _id: announcement }) });

        res.redirect('/admin/announcements');
    } catch(error) {
        next(error);
    }
};

// Delete Heroes
exports.manageHeroesPost = async (req, res, next) => {
    try {
        const toDelete = Object.keys(req.body);

        toDelete.forEach(async (hero) => { await Hero.findByIdAndRemove({ _id: hero }) });

        res.redirect('/admin/manageheroes');
    } catch(error) {
        next(error);
    }
};

// Delete Stories
exports.storyPost = async (req, res, next) => {
    try {
        const toDelete = Object.keys(req.body);

        toDelete.forEach(async (story) => { await Story.findByIdAndRemove({ _id: story }) });

        res.redirect('/admin/story');
    } catch(error) {
        next(error);
    }
};

// Delete Characters
exports.charactersPost = async (req, res, next) => {
    try {
        const toDelete = Object.keys(req.body);

        toDelete.forEach(async (character) => { await Character.findByIdAndRemove({ _id: character }) });

        res.redirect('/admin/characters');
    } catch(error) {
        next(error);
    }
};