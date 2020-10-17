// Require models
const User = require('../models/user');
const Hero = require('../models/hero');
const Spell = require('../models/spell');
const Story = require('../models/story');
const Character = require('../models/character');
const Race = require('../models/race');
const Class = require('../models/class');
const Map = require('../models/map');

// Require middleware
const Passport = require('passport');
const Cloudinary = require('cloudinary');
const Multer = require('multer');

// Set up Cloudinary
Cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});


/******************************************/
/************ Image Handling **************/
/******************************************/
// Set up Multer
const storage = Multer.diskStorage({}); // Tells multer no disk storage will be required, therefore no path, empty obj
const upload = Multer({ storage }); // Passes storage onto Multer and saves in upload const
// exports.upload = upload.single('image');    // Tells multer to only handle single-file uploads
exports.upload = upload.fields([
    { name: 'image', maxCount: 2 },
    { name: 'emblem_image', maxCount: 2 }
]);

exports.pushToCloudinary = async (req, res, next) => {
    if(req.files) {
        if(res.locals.url.includes('/heroes/')) {
            if(req.files.image != undefined){
                await Cloudinary.v2.uploader.upload(req.files.image[0].path, {
                    folder: 'sideQuest/heroImages'
                })
                .then((result) => {
                    req.body.image = result.public_id;
                    // next();
                })
                .catch(() => {
                    // req.flash('error', 'Sorry, there was a problem uploading your image. Please try again');
                    const username = req.params.username;
                    const heroId = req.params.heroId;
                    res.locals.url.endsWith('/heroes/newHero')
                        ? res.redirect(`/users/${username}/heroes/newHero`)
                        : res.redirect(`/users/${username}/heroes/${heroId}`);
                    console.log('Error: Hero Image');
                });
            }
            
            if(req.files.emblem_image != undefined) {
                await Cloudinary.v2.uploader.upload(req.files.emblem_image[0].path || null, {
                    folder: 'sideQuest/heroOrganizationEmblems'
                })
                .then((result) => {
                    req.body.emblem_image = result.public_id;
                    // next();
                })
                .catch(() => {
                    // req.flash('error', 'Sorry, there was a problem uploading your image. Please try again');
                    const username = req.params.username;
                    const heroId = req.params.heroId;
                    res.locals.url.endsWith('/heroes/newHero')
                        ? res.redirect(`/users/${username}/heroes/newHero`)
                        : res.redirect(`/users/${username}/heroes/${heroId}`);
                    console.log('Error: Emblem Image');
                });
            }

            next();

        } else if(res.locals.url.includes('/characters/')) {
            if(req.files.image == undefined) next();
            Cloudinary.v2.uploader.upload(req.files.image[0].path || null, {
                folder: 'sideQuest/characterImages'
            })
            .then((result) => {
                req.body.image = result.public_id;
                next();
            })
            .catch(() => {
                // req.flash('error', 'Sorry, there was a problem uploading your image. Please try again');
                const username = req.params.username;
                const characterId = req.params.characterId;
                (characterId != undefined && characterId != '')
                    ? res.redirect(`/users/${username}/characters/edit/${characterId}`)
                    : res.redirect(`/users/${username}/characters/newcharacter`);
            });
        } else if(res.locals.url.includes('/maps/')) {
            if(req.files.image == undefined) next();
            Cloudinary.v2.uploader.upload(req.files.image[0].path || null, {
                folder: 'sideQuest/mapImages'
            })
            .then(result => {
                req.body.image = result.public_id;
                next();
            })
            .catch(() => {
                const username = req.params.username;
                const mapId = req.params.mapId;
                (mapId != undefined && mapId != '')
                    ? res.redirect(`/users/${username}/maps/edit/${mapId}`)
                    : res.redirect(`/users/${username}/maps/newmap`);
            })
        } else {
            Cloudinary.v2.uploader.upload(req.file.path, {
                folder: 'sideQuest'
            })
            .then((result) => {
                req.body.image = result.public_id;
                next();
            })
            .catch(() => {
                // req.flash('error', 'Sorry, there was a problem uploading your image. Please try again');
                const username = req.params.username;
                res.redirect(`/users/user/${username}`);
            });
        }
    } else {
        next();
    }
};


/******************************************/
/************* Login/Signup ***************/
/******************************************/
// Express Validator
const { check, validationResult } = require('express-validator');
const { sanitize } = require('express-validator');
const e = require('express');

// Sign up
exports.signUpGet = (req, res) => {
    res.render('users/signup', { title: 'SideQuest - Crear Usuario' });
};

exports.signUpPost = [
    // Validate user's data
    check('username').isLength({ min: 1 }).withMessage('Username must be specified')
    .isAlphanumeric().withMessage('Username must be alphanumeric'),

    check('password').isLength({ min: 6 }).withMessage('Invalid password, passwords must be a minimum of 6 characters long'),

    check('confirm_password')
    .custom((value, { req }) => value === req.body.password)
    .withMessage('Passwords do not match'),

    check('*').trim().escape(),

    (req, res, next) => {
        const errors = validationResult(req);

        if(!errors.isEmpty()) {
            // There are errors
            // res.json(req.body);
            res.render('users/signup', { title: 'Please fix the following errors:', errors: errors.array() });
            return;
        } else {
            // No errors
            const newUser = new User(req.body);
            User.register(newUser, req.body.password, function(err) {
                if(err) {
                    console.log('Error while registering.', err);
                    return next(err);
                }
                next(); // Moves over to loginPost after registering
            });
        }
    }
];

// Login/Logout
exports.loginGet = (req, res) => {
    res.render('users/login', { title: 'SideQuest - Ingreso' });
};

exports.loginPost = Passport.authenticate('local', {
    successRedirect: '/users',
    // successFlash: 'You are now logged in',
    failureRedirect: '/login'
    // failureFlash: 'Login failed, please try again'
});

exports.logout = (req, res) => {
    req.logout();
    // req.flash('info', 'You are now logged out');
    res.redirect('/');
};

// Authentication (Admin, DM)
exports.isAuth = (req, res, next) => {
    req.isAuthenticated()
        ? next()
        : res.redirect('/login');
};

exports.isAdmin = (req, res, next) => {
    if(req.isAuthenticated() && req.user.isAdmin) {
        next();
        return;
    }
    res.redirect('/users');
};

exports.isDM = (req, res, next) => {
    if(req.isAuthenticated() && req.user.isDM) {
        next();
        return;
    }
    res.redirect('/users');
};

exports.isDMorAdmin = (req, res, next) => {
    if(req.isAuthenticated() && (req.user.isDM || req.user.isAdmin)) {
        next();
        return;
    }
    res.redirect('/users');
};

/******************************************/
/************* Account View ***************/
/******************************************/
exports.accountView = async (req, res, next) => {
    try{
        const user = req.user;
        const heroes = await Hero.find()
        res.render('users/account_view', { title: `SideQuest - ${user.username}` , user, heroes });
    } catch(error) {
        next(error);
    }
};

// Heroes
exports.heroes = async (req, res, next) => {
    try {
        const username = req.params.username;
        const user = await User.findOne({ username: username });

        const userHeroes = await User.aggregate([
            { $match: { username: username } },
            { $lookup: {
                from: 'heros',
                localField: 'characters',
                foreignField: '_id',
                as: 'characters'
            } }
        ]).then(result => result[0].characters);

        res.render('users/heroes', { title: 'SideQuest - Mis Héroes', username, userHeroes });
    } catch(error) {
        next(error);
    }
};

// Create/Edit Hero
/* SECURITY: Must check if owner user or admin user is editing. Else, deny access. */
exports.newHeroGet = async (req, res, next) => {
    try {
        const username = req.params.username;
        const heroId = req.params.heroId;

        const heroQuery = Hero.findOne({ _id: heroId });
        const racesQuery = Race.find();
        const classesQuery = Class.find();

        const spellLevels = ['cantrip', 'level1', 'level2', 'level3', 'level4', 'level5', 'level6', 'level7', 'level8', 'level9'];
        const spellsQuery = [];

        for(let i = 0; i < spellLevels.length; i++) {
            const level = Spell.aggregate([
                { $match: { level: spellLevels[i] } },
                { $sort: { name: 1 } }
            ]);
            spellsQuery.push(level);
        }

        const [hero, races, classes] = await Promise.all([heroQuery, racesQuery, classesQuery]);
        const spells = await Promise.all(spellsQuery.map(level => level));

        let heroSpells = {};
        
        if(!res.locals.url.endsWith('/newHero')) {
            // Hero spells (can be 'slimmed-down')
            const getHeroSpells = await Hero.aggregate([
                { $match: { name: hero.name } },
                { $lookup: {
                    from: 'spells',
                    localField: 'spells.racial',
                    foreignField: '_id',
                    as: 'spells.racial'
                } },
                { $lookup: {
                    from: 'spells',
                    localField: 'spells.class',
                    foreignField: '_id',
                    as: 'spells.class'
                } }
            ]).then(res => res[0].spells);

            const racialSpells = [
                getHeroSpells.racial.map(spell => { if(spell.level === 'cantrip') return spell; }).filter(el => { return el != null; }),
                getHeroSpells.racial.map(spell => { if(spell.level === 'level1') return spell; }).filter(el => { return el != null; }),
                getHeroSpells.racial.map(spell => { if(spell.level === 'level2') return spell; }).filter(el => { return el != null; }),
                getHeroSpells.racial.map(spell => { if(spell.level === 'level3') return spell; }).filter(el => { return el != null; }),
                getHeroSpells.racial.map(spell => { if(spell.level === 'level4') return spell; }).filter(el => { return el != null; }),
                getHeroSpells.racial.map(spell => { if(spell.level === 'level5') return spell; }).filter(el => { return el != null; }),
                getHeroSpells.racial.map(spell => { if(spell.level === 'level6') return spell; }).filter(el => { return el != null; }),
                getHeroSpells.racial.map(spell => { if(spell.level === 'level7') return spell; }).filter(el => { return el != null; }),
                getHeroSpells.racial.map(spell => { if(spell.level === 'level8') return spell; }).filter(el => { return el != null; }),
                getHeroSpells.racial.map(spell => { if(spell.level === 'level9') return spell; }).filter(el => { return el != null; })
            ];

            const classSpells = [
                getHeroSpells.class.map(spell => { if(spell.level === 'cantrip') return spell; }).filter(el => { return el != null; }),
                getHeroSpells.class.map(spell => { if(spell.level === 'level1') return spell; }).filter(el => { return el != null; }),
                getHeroSpells.class.map(spell => { if(spell.level === 'level2') return spell; }).filter(el => { return el != null; }),
                getHeroSpells.class.map(spell => { if(spell.level === 'level3') return spell; }).filter(el => { return el != null; }),
                getHeroSpells.class.map(spell => { if(spell.level === 'level4') return spell; }).filter(el => { return el != null; }),
                getHeroSpells.class.map(spell => { if(spell.level === 'level5') return spell; }).filter(el => { return el != null; }),
                getHeroSpells.class.map(spell => { if(spell.level === 'level6') return spell; }).filter(el => { return el != null; }),
                getHeroSpells.class.map(spell => { if(spell.level === 'level7') return spell; }).filter(el => { return el != null; }),
                getHeroSpells.class.map(spell => { if(spell.level === 'level8') return spell; }).filter(el => { return el != null; }),
                getHeroSpells.class.map(spell => { if(spell.level === 'level9') return spell; }).filter(el => { return el != null; })
            ];

            heroSpells = {racial: racialSpells, class: classSpells};
        }

        // res.json(heroSpells)

        res.locals.url.endsWith('/newHero')
            ? res.render('users/heroes', { title: 'SideQuest - Crear Héroe', username, races, classes, spells })
            : res.render('users/heroes', { title: 'SideQuest - Editar Héroe', username, races, classes, spells, hero, heroSpells });
    } catch(error) {
        next(error);
    }
};

exports.newHeroPost = async (req, res, next) => {
    try {
        const hero = new Hero(req.body);
        const userQuery = User.findOne({ username: req.params.username });
        const heroClassQuery = Class.findOne({ _id: req.body.class.split(',')[1] });
        const [user, heroClass] = await Promise.all([userQuery, heroClassQuery]);
        
        user.characters.push(hero._id);
        
        hero.race = req.body.race.split(',')[1];
        hero.class = req.body.class.split(',')[1];

        hero.class_proficiencies = req.body.proficiency;
        
        if(req.body.class != -1){
            heroClass.st_proficiencies.forEach(st => hero['saving_throws'][`${st}`] = true);
            if ('proficiency' in req.body) req.body.proficiency.forEach(skill => (skill != -1) ? hero['skills'][`${skill}`] = true : []);
        }

        req.body.emblem_image == undefined
            ? hero.description.notes.organization.emblem = ''
            : hero.description.notes.organization.emblem = req.body.emblem_image;

        // res.json(hero)
        await hero.save();
        await User.findByIdAndUpdate(user._id, user, { new: true });
        res.redirect(`/users/${user.username}/heroes`);
    } catch(error) {
        next(error);
    }
};

exports.editHeroPost = async (req, res, next) => {
    try {
        console.log(req.body.admin)
        const username = req.params.username;
        const heroId = req.params.heroId;
        const oldHeroQuery = Hero.findOne({ _id: heroId });
        const hero = new Hero(req.body);
        const heroClassQuery = Class.findOne({ _id: req.body.class.split(',')[1] });
        const [oldHero, heroClass] = await Promise.all([oldHeroQuery, heroClassQuery]);

        hero._id = oldHero._id;
        hero.image = oldHero.image;
        hero.description.notes.organization.emblem = oldHero.description.notes.organization.emblem;

        hero.race = req.body.race.split(',')[1];
        hero.class = req.body.class.split(',')[1];

        hero.class_proficiencies = req.body.proficiency;
        
        if(req.body.class != -1){
            heroClass.st_proficiencies.forEach(st => hero['saving_throws'][`${st}`] = true);
            if ('proficiency' in req.body) req.body.proficiency.forEach(skill => (skill != -1) ? hero['skills'][`${skill}`] = true : []);
        }

        const tmpHero = new Hero(hero);
        hero.image = req.body.image;
        req.body.image === undefined ? hero.image = tmpHero.image : hero.image = req.body.image;
        (hero.image === '') ? hero.image = tmpHero.image : '';
        (req.body.remove_image == 'true') ? hero.image = '' : '';

        req.body.emblem_image === undefined ? hero.description.notes.organization.emblem = tmpHero.description.notes.organization.emblem : hero.description.notes.organization.emblem = req.body.emblem_image;
        (hero.description.notes.organization.emblem === '') ? hero.description.notes.organization.emblem = tmpHero.description.notes.organization.emblem : '';
        (req.body.remove_emblem == 'true') ? hero.description.notes.organization.emblem = '' : '';

        if(req.body.deletecharacter) {
            const user = await User.findOne({ characters: heroId });
            user.characters.forEach((character, idx) => {
                if(character.toString() == heroId) user.characters.splice(idx, 1);
            });
            await Promise.all([User.findByIdAndUpdate(user._id, user, { new: true }), Hero.findByIdAndRemove(heroId)]);
            req.body.admin != 'true'
                ? res.redirect(`/users/${username}/heroes`)
                : res.redirect(`/admin/${username}/heroes`);
        } else {
            await Hero.findByIdAndUpdate(oldHero._id, hero, { new: true });
            req.body.admin != 'true'
                ? res.redirect(`/users/${username}/heroes`)
                : res.redirect(`/admin/${username}/heroes`);
        }
    } catch(error) {
        next(error);
    }
};

// Spells
exports.spells = async (req, res, next) => {
    try {
        const spells = await Spell.aggregate([ { $sort: { level: 1 } } ]);
        
        const spellLevels = ['cantrip', 'level1', 'level2', 'level3', 'level4', 'level5', 'level6', 'level7', 'level8', 'level9'];
        const spellsQuery = [];

        for(let i = 0; i < spellLevels.length; i++) {
            const level = Spell.aggregate([
                { $match: { level: spellLevels[i] } },
                { $sort: { name: 1 } }
            ]);
            spellsQuery.push(level);
        }

        const sortedSpells = await Promise.all(spellsQuery.map(level => level));

        res.render('users/spells', { title: 'SideQuest - Spell Compendium', spells, sortedSpells });
    } catch(error) {
        next(error);
    }
};

exports.saveSpellPost = async (req, res, next) => {
    try {
        const username = req.params.username;
        const spell = new Spell(req.body);
        await spell.save();
        res.redirect(`/users/${username}/spells`);
    } catch(error) {
        next(error);
    }
};

exports.editSpellPost = async (req, res, next) => {
    try {
        const username = req.params.username;
        const spell = await Spell.findOne({ _id: req.body.spell_id });
        await Spell.findByIdAndUpdate(spell._id, req.body, { new: true });
        res.redirect(`/users/${username}/spells`);
    } catch(error) {
        next(error);
    }
};

exports.spellsSearch = async (req, res, next) => {
    try {
        const username = req.params.username;
        const searchQuery = req.body;
        let searchData = await Promise.all([
            Spell.aggregate([ { $match: { $text: { $search: searchQuery.name } } } ]),
            Spell.aggregate([ { $match: { $text: { $search: searchQuery.level.replace(/\s/g, '') } } } ]),
            Spell.aggregate([ { $match: { $text: { $search: searchQuery.school } } } ]),
        ]);

        searchData = searchData[0].concat(searchData[1], searchData[2]);

        const spells = Array.from(new Set(searchData.map(character => character._id.toString()))).map(id => {
            return searchData.find(spell => spell._id.toString() == id)
        });

        const spellLevels = ['cantrip', 'level1', 'level2', 'level3', 'level4', 'level5', 'level6', 'level7', 'level8', 'level9'];
        const spellsQuery = [];

        for(let i = 0; i < spellLevels.length; i++) {
            const level = Spell.aggregate([
                { $match: { level: spellLevels[i] } },
                { $sort: { name: 1 } }
            ]);
            spellsQuery.push(level);
        }

        const sortedSpells = await Promise.all(spellsQuery.map(level => level));
        
        res.render('users/spells', { title: 'SideQuest - Spell Compendium: Search', username, spells, sortedSpells });
    } catch(error) {
        next(error);
    }
};

// Edit Story
exports.story = async (req, res, next) => {
    try {
        const username = req.params.username;
        const stories = await Story.aggregate([ { $sort: { name: -1 } } ]);
        res.render('users/story', { title: 'SideQuest - Editar Historia', username, stories });
    } catch(error) {
        next(error);
    }
};

exports.storySearch = async (req, res, next) => {
    try {
        const username = req.params.username;
        const searchQuery = req.body;
        const stories = await Story.aggregate([ { $match: { $text: { $search: searchQuery.name } } } ]);
        
        res.render('users/story', { title: 'SideQuest - Editar Historia: Búsqueda', username, stories });
    } catch(error) {
        next(error);
    }
};

exports.newStoryGet = async (req, res, next) => {
    try {
        const username = req.params.username;
        res.render('users/story', { title: 'SideQuest: Nueva Historia', username });
    } catch(error) {
        next(error);
    }
};

exports.newStoryPost = async (req, res, next) => {
    try {
        const username = req.params.username;
        const story = new Story(req.body);

        await story.save();
        res.redirect(`/users/${username}/story`);
    } catch(error) {
        next(error);
    }
};

exports.editStoryGet = async (req, res, next) => {
    try {
        const username = req.params.username;
        const story = await Story.findOne({ _id: req.params.storyId });

        res.render('users/story', { title: 'SideQuest - Editar Historia', username, story });
    } catch(error) {
        next(error);
    }
};

exports.editStoryPost = async (req, res, next) => {
    try {
        const username = req.params.username;
        const storyId = req.params.storyId;

        if(req.body.deletestory != 'true') {
            await Story.findByIdAndUpdate(storyId, req.body, { new: true });
            res.redirect(`/users/${username}/story/edit/${storyId}`);
        } else {
            await Story.findByIdAndRemove(storyId);
            res.redirect(`/users/${username}/story`);
        }
    } catch(error) {
        next(error);
    }
};

// Edit Characters
exports.characters = async (req, res, next) => {
    try {
        const username = req.params.username;
        const characters = await Character.aggregate([ { $sort: { name: 1 } } ]);

        res.render('users/characters', { title: 'SideQuest - Editar Personajes', username, characters });
    } catch(error) {
        next(error);
    }
};

exports.charactersSearch = async (req, res, next) => {
    try {
        const username = req.params.username;
        const searchQuery = req.body;
        let searchData = await Promise.all([
            Character.aggregate([ { $match: { $text: { $search: searchQuery.name } } } ]),
            Character.aggregate([ { $match: { $text: { $search: searchQuery.relationship } } } ]),
            Character.aggregate([ { $match: { $text: { $search: searchQuery.place } } } ]),
            Character.aggregate([ { $match: { $text: { $search: searchQuery.race } } } ])
        ]);

        searchData = searchData[0].concat(searchData[1], searchData[2], searchData[3]);

        const characters = Array.from(new Set(searchData.map(character => character._id.toString()))).map(id => {
            return searchData.find(character => character._id.toString() == id)
        });
        
        res.render('users/characters', { title: 'SideQuest - Editar Personajes: Búsqueda', username, characters });
    } catch(error) {
        next(error);
    }
};

exports.newCharacterGet = async (req, res, next) => {
    try {
        res.render('users/characters', { title: 'SideQuest - Personaje Nuevo' })
    } catch(error) {
        next(error);
    }
};

exports.newCharacterPost = async (req, res, next) => {
    try {
        const username = req.params.username;
        const character = new Character(req.body);

        await character.save();
        res.redirect(`/users/${username}/characters`);
    } catch(error) {
        next(error);
    }
};

exports.editCharacterGet = async (req, res, next) => {
    try {
        const characterId = req.params.characterId;
        const character = await Character.findOne({ _id: characterId });

        res.render('users/characters', { title: `SideQuest - Editar a ${character.name}`, character });
    } catch(error) {
        next(error);
    }
};

exports.editCharacterPost = async (req, res, next) => {
    try {
        const username = req.params.username;
        const characterId = req.params.characterId;

        if(req.body.deletecharacter == 'true') {
            await Character.findByIdAndRemove(characterId);
            res.redirect(`/users/${username}/characters`);
        } else {
            await Character.findByIdAndUpdate(characterId, req.body, { new: true });
            res.redirect(`/users/${username}/characters/edit/${characterId}`);
        }
    } catch(error) {
        next(error);
    }
};

// Edit Maps
exports.maps = async (req, res, next) => {
    try {
        const username = req.params.username;
        const maps = await Map.aggregate([{ $sort: { name: 1 } }]);

        res.render('users/maps', { title: 'SideQuest - Editar Mapas', username, maps });
    } catch(error) {
        next(error);
    }
};

exports.mapsSearch = async (req, res, next) => {
    try {
        const username = req.params.username;
        const searchQuery = req.body;
        const maps = await Map.aggregate([ { $match: { $text: { $search: searchQuery.name } } } ]);

        res.render('users/maps', { title: 'SideQuest - Editar Mapas: Búsqueda', username, maps });
    } catch(error) {
        next(error);
    }
};

exports.newMapGet = async (req, res, next) => {
    try {
        const username = req.params.username;
        res.render('users/maps', { title: 'SideQuest - Mapa Nuevo' });
    } catch(error) {
        next(error);
    }
};

exports.newMapPost = async (req, res, next) => {
    try {
        const username = req.params.username;
        const map = new Map(req.body);
        
        await map.save();
        res.redirect(`/users/${username}/maps`);
    } catch(error) {
        next(error);
    }
};

exports.editMapGet = async (req, res, next) => {
    try {
        const username = req.params.username;
        const mapId = req.params.mapId;
        const map = await Map.findOne({ _id: mapId });

        res.render('users/maps', { title: 'SideQuest - Editar Mapa', username, map });
    } catch(error) {
        next(error);
    }
};

exports.editMapPost = async (req, res, next) => {
    try {
        const username = req.params.username;
        const mapId = req.params.mapId;

        if(req.body.deletemap == 'true') {
            await Map.findByIdAndRemove(mapId);
            res.redirect(`/users/${username}/maps`);
        } else {
            await Map.findByIdAndUpdate(mapId, req.body, { new: true });
            res.redirect(`/users/${username}/maps/edit/${mapId}`);
        }
    } catch(error) {
        next(error);
    }
};