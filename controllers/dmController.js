// Require Models
const Hero = require('../models/hero');
const Character = require('../models/character');
const Spell = require('../models/spell');
const Note = require('../models/note');

// DM Account View
exports.dmView = (req, res) => {
    const username = req.user.username;
    res.render('dm/account_view', { title: 'SideQuest - Dungeon Master', username });
};

// Notes
exports.notes = async (req, res, next) => {
    try {
        const username = req.params.username;

        if(res.locals.url.endsWith('/notes')) {
            const notes = await Note.find();
            res.render('dm/notes', { title: 'SideQuest DM - Notas', username, notes });
        } else {
            const tmpHeroes = await Hero.find();
            const heroesArray = [];
            tmpHeroes.forEach(hero => {
                hero = Hero.aggregate([
                    { $match: { _id: hero._id } },
                    { $lookup: {
                        from: 'races',
                        localField: 'race',
                        foreignField: '_id',
                        as: 'race'
                    } },
                    { $lookup: {
                        from: 'classes',
                        localField: 'class',
                        foreignField: '_id',
                        as: 'class'
                    } }
                ]).then(res => res[0]);
                heroesArray.push(hero);
            });
            
            const heroesQuery = Promise.all(heroesArray);
            const [heroes, characters, spells] = await Promise.all([heroesQuery, Character.find(), Spell.find()]);
            heroes.forEach(hero => {
                hero.race = hero.race[0];
                hero.class = hero.class[0];
            });

            if(res.locals.url.includes('/view/')) {
                const note = await Note.findOne({ _id: req.params.noteId });
                res.render('dm/notes', { title: 'SideQuest DM - Notas', username, note, heroes, characters, spells });
            } else {
                res.render('dm/notes', { title: 'SideQuest DM - Nota Nueva', username, heroes, characters, spells });
            }
        }
    } catch(error) {
        next(error);
    }
};

exports.newNotePost = async (req, res, next) => {
    try {
        const username = req.params.username;
        const note = new Note(req.body);
        
        await note.save();
        res.redirect(`/dm/${username}/notes`);
    } catch(error) {
        next(error);
    }
};

exports.editNoteGet = async (req, res, next) => {
    try {
        const username = req.params.username;
        const noteId = req.params.noteId;

        const tmpHeroes = await Hero.find();
        const heroesArray = [];
        tmpHeroes.forEach(hero => {
            hero = Hero.aggregate([
                { $match: { _id: hero._id } },
                { $lookup: {
                    from: 'races',
                    localField: 'race',
                    foreignField: '_id',
                    as: 'race'
                } },
                { $lookup: {
                    from: 'classes',
                    localField: 'class',
                    foreignField: '_id',
                    as: 'class'
                } }
            ]).then(res => res[0]);
            heroesArray.push(hero);
        });
        
        const heroesQuery = Promise.all(heroesArray);
        const [note, heroes, characters, spells] = await Promise.all([Note.findOne({ _id: noteId }), heroesQuery, Character.find(), Spell.find()]);
        heroes.forEach(hero => {
            hero.race = hero.race[0];
            hero.class = hero.class[0];
        });

        res.render('dm/notes', { title: 'SideQuest DM - Editar Nota', username, note, heroes, characters, spells });
    } catch(error) {
        next(error);
    }
};

exports.editNotePost = async (req, res, next) => {
    try {
        const username = req.params.username;
        const noteId = req.params.noteId;

        if(req.body.deletenote != 'true') {
            await Note.findByIdAndUpdate(noteId, req.body, { new: true });
            res.redirect(`/dm/${username}/notes/edit/${noteId}`);
        } else {
            await Note.findByIdAndRemove(noteId);
            res.redirect(`/dm/${username}/notes`);
        }
    } catch(error) {
        next(error);
    }
};