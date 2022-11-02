var bookshelf = require('../common/bookshelf');
var Bans = require('../models/bans');
var Kicks = require('../models/kicks');

var Players = bookshelf.Model.extend({
    tableName: 'player_data',
    bans: function() {
        return this.hasMany(Bans);
    },
    kicks: function() {
        return this.hasMany(Kicks);
    }
});

module.exports = Players;