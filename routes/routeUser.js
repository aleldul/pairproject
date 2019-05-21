const Route = require('express').Router()
const User = require('../models').User

Route.get('/login', (req, res) => {
    User.findAll()
    .then(allUser => {        
        res.render('../views/user.ejs', { dataUser: allUser })
    })
    .catch(err => {
        res.send(err)
    })
})

Route.post('/register', (req, res) => {
    let temp = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }
    User.create(temp)
    .then(success => {
        res.redirect('/user')
    })
    .catch(err => {
        res.send(err)
    })
})

module.exports = Route