// Require models
const User = require('../models/user');
const Hero = require('../models/hero');
const Race = require('../models/race');
const Class = require('../models/class');
const Story = require('../models/story');
const Character = require('../models/character');
const Announcement = require('../models/announcement');

// Admin Account View
exports.adminView = async (req, res, next) => {
    try {
        const username = req.user.username;
        res.render('admin/account_view', { title: 'SideQuest - Admin', username });
    } catch(error) {
        next(error);
    }
};

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
exports.users = async (req, res, next) => {
    try {
        const username = req.params.username;
        const users = await User.find();
        res.render('admin/users', { title: 'SideQuest Admin - Manage Users', username, users });
    } catch(error) {
        next(error);
    }
};

exports.editUserGet = async (req, res, next) => {
    try {
        const username = req.params.username;
        const usersQuery = User.find();
        const userQuery = User.findOne({ _id: req.params.userId });
        const [users, user] = await Promise.all([usersQuery, userQuery]);
        const userHeroes = await User.aggregate([
            { $match: { _id: user._id } },
            { $lookup: {
                from: 'heros',
                localField: 'characters',
                foreignField: '_id',
                as: 'characters'
            } }
        ]).then(result => result[0].characters);
        res.render('admin/users', { title: 'SideQuest Admin - Edit User', username, user, userHeroes, users});
    } catch(error) {
        next(error);
    }
};

exports.editUserPost = async (req, res, next) => {
    try {
        const user = await User.findOne({ _id: req.params.userId });

        req.body.isAdmin
            ? user.isAdmin = true
            : user.isAdmin = false;
        req.body.isDM
            ? user.isDM = true
            : user.isDM = false;
        
        const updatedHeroes = [];
        if(req.body.transfer) {
            let heroIdx = 0;
            for(const change of req.body.transfer) {
                if(change != -1) {
                    const heroId = change.split(',')[0];
                    const userId = change.split(',')[1]
                    
                    user.characters.splice(heroIdx, 1);
                    const heroTransfer = await User.findOne({ _id: userId });
                    heroTransfer.characters.push(heroId);
                    updatedHeroes.push(heroTransfer);
                } else {
                    heroIdx++;
                }
            }
        }

        await User.findByIdAndUpdate(user._id, user, { new: true });
        for(const updatedUser of updatedHeroes) {
            await User.findByIdAndUpdate(updatedUser._id, updatedUser, { new: true });
        }

        res.redirect(`/admin/${req.params.username}/users`);
    } catch(error) {
        next(error);
    }
};

// Announcements
exports.announcements = async (req, res, next) => {
    try {
        const username = req.params.username;
        const announcements = await Announcement.find();

        res.locals.url.endsWith('/newannouncement')
            ? res.render('admin/announcements', { title: 'SideQuest Admin - Anuncio Nuevo' })
            : res.render('admin/announcements', { title: 'SideQuest Admin - Anuncios', username, announcements });
    } catch(error) {
        next(error);
    }
};

exports.newAnnouncementPost = async (req, res, next) => {
    try {
        const username = req.params.username;
        const announcement = new Announcement(req.body);
        announcement.user = username;
        
        await announcement.save();
        res.redirect(`/admin/${username}/announcements/edit/${announcement._id}`);
    } catch(error) {
        next(error);
    }
};

exports.editAnnouncementGet = async (req, res, next) => {
    try {
        const username = req.params.username;
        const announcement = await Announcement.findOne({ _id: req.params.announcementId });

        res.render('admin/announcements', { title: 'SideQuest Admin - Editar Anuncio', username, announcement });
    } catch(error) {
        next(error);
    }
};

exports.editAnnouncementPost = async (req, res, next) => {
    try {
        const username = req.params.username;
        const announcementId = req.params.announcementId;

        if(req.body.deleteannouncement != 'true') {
            await Announcement.findByIdAndUpdate(announcementId, req.body, { new: true });
            res.redirect(`/admin/${username}/announcements/edit/${announcementId}`);
        } else {
            await Announcement.findByIdAndRemove(announcementId);
            res.redirect(`/admin/${username}/announcements`);
        }
    } catch(error) {
        next(error);
    }
};

// Heroes edit and delete
exports.heroes = async (req, res, next) => {
    try {
        const username = req.params.username;
        const heroes = await Hero.find();

        res.render('admin/heroes', { title: 'SideQuest Admin - Manage Heroes', username, heroes });
    } catch(error) {
        next(error);
    }
};

// Races CURD
exports.races = async (req, res, next) => {
    try {
        const username = req.params.username;
        const races = await Race.find();
        
        res.locals.url.endsWith('/newrace')
            ? res.render('admin/races', { title: 'SideQuest Admin - New Race' })
            : res.render('admin/races', { title: 'SideQuest Admin - Manage Races', username, races });
    } catch(error) {
        next(error);
    }
};

exports.newRacePost = async (req, res, next) => {
    try {
        const username = req.params.username;
        const race = new Race(req.body);

        const abilities = ['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'];
        const abilityIncreaseDict = {
            strength: req.body.strengthIncrease,
            dexterity: req.body.dexterityIncrease,
            constitution: req.body.constitutionIncrease,
            intelligence: req.body.intelligenceIncrease,
            wisdom: req.body.wisdomIncrease,
            charisma: req.body.charismaIncrease
        };

        for(let i = 0; i < 6; i++) {
            if(abilityIncreaseDict[abilities[i]]) {
                const abilityIncrease = {
                    name: abilities[i],
                    increase: abilityIncreaseDict[abilities[i]]
                }
                race.ability_increase.push(abilityIncrease);
            }
        }

        await race.save();
        res.redirect(`/admin/${username}/races/edit/${race._id}`);
    } catch(error) {
        next(error);
    }
};

exports.editRaceGet = async (req, res, next) => {
    try {
        const race = await Race.findOne({ _id: req.params.raceId });

        res.render('admin/races', { title: 'SideQuest Admin - Edit Race', race });
    } catch(error) {
        next(error);
    }
};

exports.editRacePost = async (req, res, next) => {
    try {
        const username = req.params.username;
        const raceId = req.params.raceId;
        const race = new Race(req.body);
        
        race._id = raceId;
        const abilities = ['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'];
        const abilityIncreaseDict = {
            strength: req.body.strengthIncrease,
            dexterity: req.body.dexterityIncrease,
            constitution: req.body.constitutionIncrease,
            intelligence: req.body.intelligenceIncrease,
            wisdom: req.body.wisdomIncrease,
            charisma: req.body.charismaIncrease
        };

        for(let i = 0; i < 6; i++) {
            if(abilityIncreaseDict[abilities[i]]) {
                const abilityIncrease = {
                    name: abilities[i],
                    increase: abilityIncreaseDict[abilities[i]]
                }
                race.ability_increase.push(abilityIncrease);
            }
        }

        if(req.body.deleterace != 'true') {
            await Race.findByIdAndUpdate(raceId, race, { new: true });
            res.redirect(`/admin/${username}/races/edit/${raceId}`);
        } else {
            await Race.findByIdAndRemove(raceId);
            res.redirect(`/admin/${username}/races`);
        }
    } catch(error) {
        next(error);
    }
};

exports.classes = async (req, res, next) => {
    try {
        const username = req.params.username;
        const classes = await Class.find();
        
        res.locals.url.endsWith('/newclass')
            ? res.render('admin/classes', { title: 'SideQuest Admin - New Class' })
            : res.render('admin/classes', { title: 'SideQuest Admin - Manage Classes', username, classes });
    } catch(error) {
        next(error);
    }
};

exports.newClassPost = async (req, res, next) => {
    try {
        const username = req.params.username;
        const newClass = new Class(req.body);

        await newClass.save();
        res.redirect(`/admin/${username}/classes`)
    } catch(error) {
        next(error);
    }
};

exports.editClassGet = async (req, res, next) => {
    try {
        const classId = req.params.classId;
        const heroClass = await Class.findOne({ _id: classId });

        res.render('admin/classes', { title: 'SideQuest Admin - Edit Class', heroClass });
    } catch(error) {
        next(error);
    }
};

exports.editClassPost = async (req, res, next) => {
    try {
        const username = req.params.username;
        const classId = req.params.classId;
        const editedClass = new Class(req.body);

        editedClass._id = classId;
        if(req.body.spell_ability == undefined) editedClass.spell_ability = '';

        if(req.body.deleteclass != 'true') {
            await Class.findByIdAndUpdate(classId, editedClass, { new: true });
            res.redirect(`/admin/${username}/classes/edit/${classId}`);
        } else {
            await Class.findByIdAndRemove(classId);
            res.redirect(`/admin/${username}/classes`);
        }
    } catch(error) {
        next(error);
    }
};