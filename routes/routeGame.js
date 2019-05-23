const express = require('express')
const route = express.Router()
const {User, Play, Game, Board} = require('../models')

route.get('/', (req,res) => {
  
    Game.findAll({
        include : [{
            model : Board
        }]
    })
        .then(data => {
            res.render('map/map.ejs', {
                data : data,
                dataLogin: req.session.user
            })
        })
        .catch(err => {

        })
})

route.get('/level/:id', (req, res) => {
    
    Game.findAll()
        .then(data => {
            length = data.length
            return Game.findOne({
                where : {
                    BoardId : req.params.id
                },
                include : [{
                    model : Board
                }]
            })
        })
        .then(found => {
            if(found){
                res.render('game/gameByLevel.ejs', {
                    gameData : [found.dataValues, length]
                    
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
        UserId : req.session.user.id, //session
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

route.post(`/level/last/:id`, (req, res) => {
    console.log(req.body.score, '==========')
    Play.create({
        UserId : req.session.user.id, //session
        GameId : req.params.id,
        totalScore : req.body.score
    })
        .then(created => {
            console.log(created)
            res.redirect(`/profile`)
        })
        .catch(err => {
            res.send(err)
        })
})

module.exports = route