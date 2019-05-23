const express = require('express')
const route = express.Router()
const {User, Play, Game, Board} = require('../models')

route.get('/', (req,res) => {
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
    Game.findAll({
        include : [{
            model : Board
        }]
    })
        .then(data => {
            res.render('game/game.ejs', {
                data : data
            })
        })
        .catch(err => {

        })
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

route.post('/level/:id', (req, res) => {
    console.log(req.body.score, '==========')
    Play.create({
        UserId : 0, //session
        GameId : req.params.id,
        totalScore : req.body.score
    })
        .then(created => {
            console.log(created)
            res.redirect(`/game/level/${Number(req.params.id) + 1}`)
        })
        .catch(err => {
            res.send(err)
        })
})

route.get('/map', (req, res)=> {
    res.render('map/map.ejs')
})

module.exports = route