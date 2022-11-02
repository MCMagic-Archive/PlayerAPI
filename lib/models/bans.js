var bookshelf = require('../common/bookshelf');
var Players = require('../models/players');

var Bans = bookshelf.Model.extend({
    tableName: 'banned_players',
    player: function() {
        return this.belongsTo(Players);
    }
});

module.exports = Bans;