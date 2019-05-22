const express = require('express')
const route = express.Router()
const {Game, Board} = require('../models')

// route.get('/', (req,res) => {

// })

route.get('/level/:id', (req, res) => {
    Board.findOne({
        where : {
            id : req.params.id
        }
    })
        .then(found => {
            if(found){
                res.render('game/gameByLevel.ejs', {
                    gameData : found
                })
            }
        })
        .catch(err => {
            res.send(err)
        })
})

module.exports = route