var express = require('express');
var router = express.Router();
var Players = require('../models/players');
var Chat = require('../models/chat');
var Bans = require('../models/bans');
var Kicks = require('../models/kicks');

router.get('/', function(req, res) {
    res.json({error: false, message: 'MCMagic Player API - Version 1.0 - See README for more information. '})
});
//fetch all users from the database
router.route('/players')
    .get(function(req, res) {
        new Players().query(function(qb) {
            qb.offset(30).limit(1000).orderBy('username');
        })
        .fetchAll()
        .then(function(players) {
            res.json({error: false, data: players.tpJSON()});
        }).catch(function(error) {
            res.status(500).json({error: true, data: {message: error.message}});
        });
    });
//fetch a single player from the database
router.route('/players/:username')
    .get(function(req, res) {
        new Players().where({'username': req.params.username})
        .fetch()
        .then(function(players) {
            res.json({error: false, data: players.toJSON()});
        }).catch(function(error) {
            res.status(404).json({error: true, data: {message: 'The requested resource could not be found'}});
        });
    });
//fetch all bans for a player related to a player
router.route('/players/:username/bans')
    .get(function(req, res) {
        new Bans().query(function(qb) {
            qb.join('player_data', 'banned_players.uuid', '=', 'player_data.uuid')
            qb.where({username: req.params.username})
        })
        .fetchAll({withRelated: ['player']})
        .then(function(player) {
            res.json({error: false, data: player.toJSON()});
        }).catch(function(error) {
            res.status(500).json
        });
    });
//fetch all chat for username
router.route('/players/:username/chat')
    .get(function(req, res) {
        new Chat().query(function(qb) {
            qb.join('player_data', 'chat.user', '=', 'player_data.uuid')
            qb.where({username: req.params.username});
        })
        .fetchAll({withRelated: ['player']})
        .then(function(player) {
            res.json({error: false, data: player.toJSON()});
        }).catch(function(error) {
            res.status(500).json({error: true, data: { message: error.message }})
        });       
    });
 
module.exports = router;