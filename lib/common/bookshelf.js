var knex = require('knex')({
    client: 'mysql',
    connection: {
        host: '104.244.53.154',
        user: 'root',
        password: 'MCgek5eMsLAH34MJ',
        database: 'MainServer',
        charset: 'utf8'
    }
});

var bookshelf = require('bookshelf')(knex);

module.exports = bookshelf;