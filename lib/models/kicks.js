var bookshelf = require('../common/bookshelf');
var Players = require('../models/players');

var Kicks = bookshelf.Model.extend({
    tableName: 'kicks',
    player: function() {
        return this.belongsTo(Players);
    }
});

module.exports = Kicks;