// Require models
const User = require('../models/user');
const Hero = require('../models/hero');
const Spell = require('../models/spell');
const Story = require('../models/story');
const Character = require('../models/character');
const Announcement = require('../models/announcement');

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
    { name: 'image', maxCount: 1 },
    { name: 'emblem_image', maxCount: 1 }
]);

exports.pushToCloudinary = (req, res, next) => {
    if(req.files && (req.files.image != undefined || req.files.emblem_image != undefined)) {
        if(res.locals.url.endsWith('/hero/save/0')) {
            Cloudinary.v2.uploader.upload(req.files.image[0].path, {
                folder: 'sideQuest/heroImages'
            })
            .then((result) => {
                req.body.image = result.public_id;
                next();
            })
            .catch(() => {
                // req.flash('error', 'Sorry, there was a problem uploading your image. Please try again');
                const username = req.params.username;
                res.redirect(`/users/user/${username}/hero/0`);
            });

        } else if(res.locals.url.endsWith('/hero/save/9')) {
            Cloudinary.v2.uploader.upload(req.files.emblem_image[0].path || null, {
                folder: 'sideQuest/heroOrganizationEmblems'
            })
            .then((result) => {
                req.body.emblem_image = result.public_id;
                next();
            })
            .catch(() => {
                // req.flash('error', 'Sorry, there was a problem uploading your image. Please try again');
                const username = req.params.username;
                res.redirect(`/users/user/${username}/hero/9`);
            });

        } else if(res.locals.url.includes('/characters/')) {
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
                const characterName0 = req.params.characterName;
                (characterName0 != undefined && characterName0 != '')
                    ? res.redirect(`/users/user/${username}/characters/${characterName0}`)
                    : res.redirect(`/users/user/${username}/characters/addCharacter`);
            });
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

// Sign up
exports.signUpGet = (req, res) => {
    res.render('signup', { title: 'SideQuest - Crear Usuario' });
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
            res.render('signup', { title: 'Please fix the following errors:', errors: errors.array() });
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
    res.render('login', { title: 'SideQuest - Ingreso' });
};

exports.loginPost = Passport.authenticate('local', {
    successRedirect: '/users',
    // successFlash: 'You are now logged in',
    failureRedirect: '/users/login'
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
        : res.redirect('/users/login');
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
        res.render('account_view', { title: `SideQuest - ${user.username}` , user, heroes });
    } catch(error) {
        next(error);
    }
};

// Edit Hero
exports.editHeroGet = async (req, res, next) => {
    try {
        const username = req.params.username;
        const pageNumber = req.params.pageNumber;
        const hero = await Hero.findOne({ player_name: username });

        
        // const cantrips = Spell.find({ level: 'cantrip' });
        const cantrips = Spell.aggregate([
            { $match: { level: 'cantrip' } },
            { $sort: { name: 1 } },
        ]);
        const level1 = Spell.aggregate([
            { $match: { level: 'level1' } },
            { $sort: { name: 1 } }
        ]);
        const level2 = Spell.aggregate([
            { $match: { level: 'level2' } },
            { $sort: { name: 1 } }
        ]);
        const level3 = Spell.aggregate([
            { $match: { level: 'level3' } },
            { $sort: { name: 1 } }
        ]);
        const level4 = Spell.aggregate([
            { $match: { level: 'level4' } },
            { $sort: { name: 1 } }
        ]);
        const level5 = Spell.aggregate([
            { $match: { level: 'level5' } },
            { $sort: { name: 1 } }
        ]);
        const level6 = Spell.aggregate([
            { $match: { level: 'level6' } },
            { $sort: { name: 1 } }
        ]);
        const level7 = Spell.aggregate([
            { $match: { level: 'level7' } },
            { $sort: { name: 1 } }
        ]);
        const level8 = Spell.aggregate([
            { $match: { level: 'level8' } },
            { $sort: { name: 1 } }
        ]);
        const level9 = Spell.aggregate([
            { $match: { level: 'level9' } },
            { $sort: { name: 1 } }
        ]);

        const spells = await Promise.all([cantrips, level1, level2, level3, level4, level5, level6, level7, level8, level9]);
        const getHeroSpells = await Hero.aggregate([
            { $match: { player_name: username } },
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

        for(let i = 0; i < 10; i++) {
            if(i == 0) {
                spells[i].unshift('Cantrips');
                racialSpells[i].unshift('Cantrips');
                classSpells[i].unshift('Cantrips');
            } else {
                spells[i].unshift('Level ' + i);
                racialSpells[i].unshift('Level ' + i);
                classSpells[i].unshift('Level ' + i);
            }
        };

        const heroSpells = {racial: racialSpells, class: classSpells};
        
        // console.log(heroSpells.racial[8].length)
        // res.json(heroSpells)
        res.render('edit_hero', { title: 'SideQuest: Editar Heroe', hero, pageNumber, username, spells, heroSpells });
    } catch(error) {
        next(error);
    }
};

exports.editHeroPost = async (req, res, next) => {
    try {
        const username = req.params.username;
        const pageNumber = req.params.pageNumber;
        const hero = await Hero.findOne({ player_name: username });
        switch(pageNumber) {
            case '0':
                const tmpHero0 = new Hero(hero);
                hero.image = req.body.image;
                hero.info = req.body;
                req.body.image === undefined ? hero.image = tmpHero0.image : hero.image = req.body.image;
                (hero.image === '') ? hero.image = tmpHero0.image : '';
                (req.body.remove_image == 'true') ? hero.image = '' : '';
                await Hero.findByIdAndUpdate(hero._id, hero, { new: true });
                res.redirect(`/users/user/${username}/hero/${pageNumber}/saved`);
                break;
            case '1':
                hero.personality = req.body;
                await Hero.findByIdAndUpdate(hero._id, hero, { new: true });
                res.redirect(`/users/user/${username}/hero/${pageNumber}/saved`);
                break;
            // UPDATE: Calc values
            case '2':   // Missing racial and class modifiers (must also lookup if something adds modifiers)
                hero.attributes = req.body;
                // hero.attributes.strengthMod = Math.floor((hero.attributes.strength-10)/2);
                // hero.attributes.dexterityMod = Math.floor((hero.attributes.dexterity-10)/2);
                // hero.attributes.constitutionMod = Math.floor((hero.attributes.constitution-10)/2);
                // hero.attributes.intelligenceMod = Math.floor((hero.attributes.intelligence-10)/2);
                // hero.attributes.wisdomMod = Math.floor((hero.attributes.wisdom-10)/2);
                // hero.attributes.charismaMod = Math.floor((hero.attributes.charisma-10)/2);
                await Hero.findByIdAndUpdate(hero._id, hero, { new: true });
                res.redirect(`/users/user/${username}/hero/${pageNumber}/saved`);
                break;
            // UPDATE: Calc values
            case '3':
                hero.physical_attributes = req.body;
                await Hero.findByIdAndUpdate(hero._id, hero, { new: true });
                res.redirect(`/users/user/${username}/hero/${pageNumber}/saved`);
                break;
            // UPDATE: Calc proficiency values
            case '4':
                hero.saving_throws = req.body;
                await Hero.findByIdAndUpdate(hero._id, hero, { new: true });
                res.redirect(`/users/user/${username}/hero/${pageNumber}/saved`);
                break;
            // UPDATE: Calc proficiency values
            case '5':
                hero.skills = req.body;
                await Hero.findByIdAndUpdate(hero._id, hero, { new: true });
                res.redirect(`/users/user/${username}/hero/${pageNumber}/saved`);
                break;
            case '6':
                hero.attacksAndSpellCasting = req.body;
                await Hero.findByIdAndUpdate(hero._id, hero, { new: true });
                res.redirect(`/users/user/${username}/hero/${pageNumber}/saved`);
                break;
            case '7':
                hero.equipment = req.body;
                await Hero.findByIdAndUpdate(hero._id, hero, { new: true });
                res.redirect(`/users/user/${username}/hero/${pageNumber}/saved`);
                break;
            case '8':
                hero.additional_info = req.body;
                await Hero.findByIdAndUpdate(hero._id, hero, { new: true });
                res.redirect(`/users/user/${username}/hero/${pageNumber}/saved`);
                break;
            case '9':
                const tmpHero9 = new Hero(hero);
                hero.story = req.body;
                req.body.emblem_image === undefined ? hero.story.allies_and_organizations.emblem_image = tmpHero9.story.allies_and_organizations.emblem_image : hero.story.allies_and_organizations.emblem_image = req.body.emblem_image;
                (hero.story.allies_and_organizations.emblem_image === '') ? hero.story.allies_and_organizations.emblem_image = tmpHero9.story.allies_and_organizations.emblem_image : '';
                (req.body.remove_emblem == 'true') ? hero.story.allies_and_organizations.emblem_image = '' : '';
                await Hero.findByIdAndUpdate(hero._id, hero, { new: true });
                res.redirect(`/users/user/${username}/hero/${pageNumber}/saved`);
                break;
            case '10':
                hero.treasure = req.body;
                await Hero.findByIdAndUpdate(hero._id, hero, { new: true });
                res.redirect(`/users/user/${username}/hero/${pageNumber}/saved`);
                break;
            case '11':
                const racialSpell = req.body.racial_spell;
                const classSpell = req.body.class_spell;

                let flagRacial = false, flagClass = false;
                for(let i = 0; i < hero.spells.racial.length; i++) {
                    if(hero.spells.racial[i].toString() == racialSpell) flagRacial = true;
                }

                for(let i = 0; i < hero.spells.class.length; i++) {
                    if(hero.spells.class[i].toString() == classSpell) flagClass = true;
                }

                if(racialSpell != '- select -' && !flagRacial) hero.spells.racial.push(racialSpell);
                if(classSpell != '- select -' && !flagClass) hero.spells.class.push(classSpell);

                await Hero.findByIdAndUpdate(hero._id, hero, { new: true });
                res.redirect(`/users/user/${username}/hero/${pageNumber}/saved`);
                break;
            default:
                break;
        }
    } catch(error) {
        next(error);
    }
};

// Spells

exports.saveSpell = async (req, res, next) => {
    try {
        const username = req.params.username;
        const spell = new Spell(req.body);
        await spell.save();
        res.redirect(`/users/user/${username}/hero/11`);
    } catch(error) {
        next(error);
    }
};

exports.editSpell = async (req, res, next) => {
    try {
        const username = req.params.username;
        const spell = await Spell.findOne({ _id: req.body.spell_id });
        await Spell.findByIdAndUpdate(spell._id, req.body, { new: true });
        res.redirect(`/users/user/${username}/hero/11`);
    } catch(error) {
        next(error);
    }
};

exports.removeCharacterSpell = async (req, res, next) => {
    try {
        const username = req.params.username;
        const hero = await Hero.findOne({ player_name: username });

        const racialSpells = req.body.racial;
        const classSpells = req.body.class;

        for(let i = 0; i < hero.spells.racial.length; i++) {
            for(let j = 0; j < racialSpells.length; j++) {
                if (racialSpells[j] == hero.spells.racial[i].toString()) hero.spells.racial.splice(i, 1);
            }
        }
        
        for(let i = 0; i < hero.spells.class.length; i++) {
            for(let j = 0; j < classSpells.length; j++) {
                if (classSpells[j] == hero.spells.class[i].toString()) hero.spells.class.splice(i, 1);
            }
        }

        // res.json(req.body);
        await Hero.findByIdAndUpdate(hero._id, hero, { new: true });
        res.redirect(`/users/user/${username}/hero/11/saved`);
    } catch (error) {
        next(error);
    }
};

// Edit Story
exports.editStoryGet = async (req, res, next) => {
    try {
        const username = req.params.username;
        const heroQuery = Hero.findOne({ player_name: username });
        const storiesQuery = Story.find();
        const storyQuery = Story.findOne({ _id: req.params.storyId });
        const [hero, stories, story] = await Promise.all([heroQuery, storiesQuery, storyQuery]);

        res.render('edit_story', { title: 'SideQuest - Editar Historia', username, hero, stories, story });
    } catch(error) {
        next(error);
    }
};

exports.addStory = async (req, res, next) => {
    try {
        const username = req.params.username;
        const story = new Story(req.body);
        
        if(req.body.text != '' && req.body.text != undefined){
            const note = {
                character_id: req.body.character_id || null,
                character: req.body.character,
                text: req.body.text
            };
            story.notes.push(note);
        }
        await story.save();
        res.redirect(`/users/user/${username}/story/${story._id}`);
    } catch(error) {
        next(error);
    }
};

exports.editStoryPost = async (req, res, next) => {
    try {
        const username = req.params.username;
        const storyId = req.params.storyId;
        const story = await Story.findOne({ _id: storyId });

        story.name = req.body.name;
        story.summary = req.body.summary;
        if(req.body.text != '' && req.body.text != undefined){
            const note = {
                character_id: req.body.character_id,
                character: req.body.character,
                text: req.body.text
            };
            story.notes.push(note);
        }

        if(req.body.note_text != undefined && Object.keys(req.body.note_text).length != 0){
            // Find notes in story.notes that match reqNotes, and updates their text
            const noteTxt = Object.entries(req.body.note_text);
            story.notes.forEach(note => {
                for(let i = 0; i < noteTxt.length; i++) {
                    if(note._id.toString() == noteTxt[i][0]) {
                        note.text = noteTxt[i][1];
                    }
                }
            });

            // Find notes in req.body.delete_note that have been flagged for deletion and output them in an array
            const deleteFlags = Object.entries(req.body.delete_note).filter(note => note[1] != 'false');

            // Delete notes in story.notes that match deleteFlags
            for(let i = 0; i < story.notes.length; i++) {
                for(let j = 0; j < deleteFlags.length; j++) {
                    if(story.notes[i]._id.toString() == deleteFlags[j][0]) story.notes.splice(i, 1);
                }
            }
        }

        // res.json(req.body);
        await Story.findByIdAndUpdate(storyId, story, { new: true });
        res.redirect(`/users/user/${username}/story/${storyId}`);
    } catch(error) {
        next(error);
    }
};

// Edit Characters
exports.editCharactersGet = async (req, res, next) => {
    try {
        const username = req.params.username;
        const heroQuery = Hero.findOne({ player_name: username })
        const charactersQuery = Character.find();
        const characterQuery = Character.findOne({ name: req.params.characterName });
        const [hero, characters, character] = await Promise.all([heroQuery, charactersQuery, characterQuery]);

        res.render('edit_characters', { title: 'SideQuest - Editar Personajes', username, hero, characters, character });
    } catch(error) {
        next(error);
    }
};

exports.addCharacter = async (req, res, next) => {
    try {
        const username = req.params.username;
        const character = new Character(req.body);
        
        if(req.body.text != '' && req.body.text != undefined){
            const note = {
                character_id: req.body.character_id || null,
                character: req.body.character,
                text: req.body.text
            };
            character.notes.push(note);
        }

        await character.save();
        res.redirect(`/users/user/${username}/characters/${character.name}`)
    } catch(error) {
        next(error);
    }
};

exports.editCharactersPost = async (req, res, next) => {
    try {
        const username = req.params.username;
        const characterName = req.params.characterName;
        const character = await Character.findOne({ name: characterName });

        // Update Character Fields
        character.name = req.body.name;
        character.title = req.body.title;
        character.affiliation = req.body.affiliation;
        character.place = req.body.place;
        character.race = req.body.race;
        character.class = req.body.class;
        character.age = req.body.age;
        character.size = req.body.size;
        character.appearance = req.body.appearance;
        character.summary = req.body.summary;

        // Add note if a new note was added
        if(req.body.text != '' && req.body.text != undefined){
            const note = {
                character_id: req.body.character_id,
                character: req.body.character,
                text: req.body.text
            };
            character.notes.push(note);
        }

        // Manage image deletion and modification
        const tmpChar = new Character(character);
        character.image = req.body.image;
        req.body.image === undefined ? character.image = tmpChar.image : character.image = req.body.image;
        (character.image === '') ? character.image = tmpChar.image : '';
        (req.body.remove_image == 'true') ? character.image = '' : '';

        // Manage note deletion and modification
        if(req.body.note_text != undefined && Object.keys(req.body.note_text).length != 0){
            // Find notes in story.notes that match reqNotes, and updates their text
            const noteTxt = Object.entries(req.body.note_text);
            character.notes.forEach(note => {
                for(let i = 0; i < noteTxt.length; i++) {
                    if(note._id.toString() == noteTxt[i][0]) {
                        note.text = noteTxt[i][1];
                    }
                }
            });

            // Find notes in req.body.delete_note that have been flagged for deletion and output them in an array
            const deleteFlags = Object.entries(req.body.delete_note).filter(note => note[1] != 'false');

            // Delete notes in story.notes that match deleteFlags
            for(let i = 0; i < character.notes.length; i++) {
                for(let j = 0; j < deleteFlags.length; j++) {
                    if(character.notes[i]._id.toString() == deleteFlags[j][0]) character.notes.splice(i, 1);
                }
            }
        }

        await Character.findByIdAndUpdate(character._id, character, { new: true });
        res.redirect(`/users/user/${username}/characters/${character.name}`);
    } catch(error) {
        next(error);
    }
};

/******************************************/
/****************** DM ********************/
/******************************************/

exports.addHeroGet = (req, res) => {
    const username = req.params.username;
    res.render('add_hero.pug', { title: 'SideQuest - Agregar Heroe' });
};

exports.addHeroPost = async (req, res, next) => {
    try {
        const username = req.params.username;
        const hero = new Hero(req.body);
        // res.json(hero);
        await hero.save();
        res.redirect(`manageheroes`);
    } catch(error) {
        next(error);
    }
};

exports.dmEditHeroGet = async (req, res, next) => {
    try{
        const heroName = req.params.heroname;
        const hero = await Hero.findOne({ name: heroName });
        res.render('add_hero', { title: 'SideQuest - Editar Heroe', hero });
    } catch(error) {
        next(error);
    }
};

exports.dmEditHeroPost = async (req, res, next) => {
    try {
        const heroName = req.params.heroname;
        const newHeroName = req.body.name;
        const newHeroPlayer = req.body.player_name || '';
        const hero = await Hero.findOne({ name: heroName });
        // res.json(hero);
        hero.name = newHeroName;
        hero.player_name = newHeroPlayer;
        await Hero.findByIdAndUpdate(hero._id, hero, { new: true });
        res.redirect(`/users/user/${req.user.username}/manageheroes`);
    } catch(error) {
        next(error);
    }
};

exports.announcementsGet = async (req, res, next) => {
    try {
        const username = req.params.username;
        const announcementsQuery = Announcement.find();
        const announcementQuery = Announcement.findOne({ _id: req.params.announcementId });
        const [announcements, announcement] = await Promise.all([announcementsQuery, announcementQuery]);
        
        res.render('edit_announcements', { title: 'SideQuest - Editar Anuncios', username, announcements, announcement });
    } catch(error) {
        next(error);
    }
};

exports.addAnnouncement = async (req, res, next) => {
    try {
        const username = req.params.username;
        const announcement = new Announcement(req.body);
        
        await announcement.save();
        res.redirect(`/users/user/${username}/announcements/${announcement._id}`);
    } catch(error) {
        next(error);
    }
};

exports.announcementsPost = async (req, res, next) => {
    try {
        const username = req.params.username;
        const announcementId = req.params.announcementId;

        await Announcement.findByIdAndUpdate(announcementId, req.body, { new: true });
        res.redirect(`/users/user/${username}/announcements/${announcementId}/saved`)
    } catch(error) {
        next(error);
    }
};