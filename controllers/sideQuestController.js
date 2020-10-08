const Hero = require('../models/hero');
const Story = require('../models/story');
const Character = require('../models/character');
const Announcements = require('../models/announcement');

// Index
exports.index = async (req, res, next) => {
    try {
        const announcements = await Announcements.find();

        announcements.sort((a, b) => {
            var keyA = new Date(a.date);
            var keyB = new Date(b.date);

            if(keyA < keyB) return 1;
            if (keyA > keyB) return -1;
            return 0;
        });

        res.render('index', { title: 'SideQuest DnD - Inicio', announcements });
    } catch(error) {
        next(error);
    }
}

// Heroes
exports.heroes = async (req, res, next) => {
    try{
        const heroes = await Hero.aggregate([ { $sort: { name: 1 } } ]);
        res.render('heroes', { title: 'SideQuest - Heroes', heroes });
    } catch(error) {
        next(error);
    }
};

exports.heroSummary = async (req, res, next) => {
    try{
        const heroName = req.params.heroName;
        const heroes = await Hero.find();
        const hero = await Hero.aggregate([
            { $match: { name: heroName } },
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
        hero.race = hero.race[0];
        hero.class = hero.class[0];

        const getHeroSpells = await Hero.aggregate([
            { $match: { name: heroName } },
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
                racialSpells[i].unshift('Cantrips');
                classSpells[i].unshift('Cantrips');
            } else {
                racialSpells[i].unshift('Level ' + i);
                classSpells[i].unshift('Level ' + i);
            }
        };

        const heroSpells = {racial: racialSpells, class: classSpells};

        res.render('heroes', { title: `SideQuest - ${heroName}`, heroes, hero, heroSpells });
    } catch(error) {
        next(error);
    }
};

// Story
exports.story = async (req, res, next) => {
    try {
        const storyId = req.params.storyId;

        const storiesQuery = Story.find();
        const storyQuery = Story.findOne({ _id: storyId });
        const [stories, story] = await Promise.all([storiesQuery, storyQuery]);


        const title = res.locals.url.endsWith('/story') ? 'Historia' : `Historia: ${story.name}`;
        res.render('story', { title: `SideQuest - ${title}`, stories, story })
    } catch(error) {
        next(error);
    }
};

exports.storySearch = async (req, res, next) => {
    try {
        const searchQuery = req.body;
        const stories = await Story.aggregate([ { $match: { $text: { $search: searchQuery.name } } } ]);
        
        res.render('story', { title: 'SideQuest - Historia: Búsqueda', stories });
    } catch(error) {
        next(error);
    }
};

// Characters
exports.characters = async (req, res, next) => {
    try {
        const charactersQuery = Character.aggregate([
            { $sort: { name: 1 } }
        ]);
        const characterQuery = Character.findOne({ name: req.params.characterName });
        const [characters, character] = await Promise.all([charactersQuery, characterQuery]);

        const title = res.locals.url.endsWith('/characters') ? 'Personajes' : `Personajes: ${character.name}`
        res.render('characters', { title: `SideQuest - ${title}`, characters, character });
    } catch(error) {
        next(error);
    }
};

exports.charactersSearch = async (req, res, next) => {
    try {
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
        
        res.render('characters', { title: 'SideQuest - Personajes: Búsqueda', characters });
    } catch(error) {
        next(error);
    }
};

// Maps
exports.maps = async (req, res, next) => {
    try {
        res.render('maps', { title: 'SideQuest - Mapas' })
    } catch(error) {
        next(error);
    }
};