// Require Models
const Announcement = require('../models/announcement');

// DM Account View
exports.dmView = (req, res) => {
    const username = req.user.username;
    res.render('dm/account_view', { title: 'SideQuest - Dungeon Master', username });
};

// Notes
exports.notes = async (req, res, next) => {
    try {
        const username = req.params.username;

        res.render('dm/notes', { title: 'SideQuest DM - Notas' });
    } catch(error) {
        next(error);
    }
};