const express = require('express')
const route = express.Router()
const {User, Play, Game, Board} = require('../models')

route.get('/', (req,res) => {
    res.render('game/game.ejs')
})

route.get('/level/:id', (req, res) => {
    // User.findOne({
    //     where : {
    //         id : ''
    //     },
    //     include : [{
    //         model : Play,
    //         include : [{
    //             model : Game,
    //             include : [{
    //                 model : Board
    //             }]
    //         }]
    //     }]
    // })
    //     .then(found => {
    //         if(found){
    //             res.render('game/gameByLevel.ejs', {
    //                 gameData : found.dataValues
    //             })
    //         }
    //     })
    //     .catch(err => {
    //         res.send(err)
    //     })
    Game.findOne({
        where : {
            BoardId : req.params.id
        },
        include : [{
            model : Board
        }]
    })
        .then(found => {
            if(found){
                res.render('game/gameByLevel.ejs', {
                    gameData : found.dataValues
                })
            }
        })
        .catch(err => {
            res.send(err)
        })
})

module.exports = route