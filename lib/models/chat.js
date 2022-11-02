var bookshelf = require('../common/bookshelf');
var Players = require('../models/players');

var Chat = bookshelf.Model.extend({
    tableName: 'chat',
    player: function() {
        return this.belongsTo(Players);
    }
});

module.exports = Chat;