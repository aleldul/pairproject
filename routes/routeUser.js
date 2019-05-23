// const Route = require('express').Router()
// const User = require('../models').User

// // Route.get('/login', (req, res) => {
// //     User.findOne({
// //         where: {
// //             username: 'eliavictor'
// //         }
// //     })
// //     .then(user => {
// //         if (user) {
// //             res.redirect('../views/home.ejs')
// //         }
// //     })
// //     .catch(err => {
// //         res.send(err)
// //     })
// // })

// // Route.post('/signin', (req, res) => {
// //     User.findOne({
// //         where: {
// //             username: req.body.username,
// //             password: req.body.password
// //         }
// //     })
// //     .then(user => {
// //         if (user) {
// //             res.send(user)
// //             // console.log(user.dataValues)
// //         } else {
// //             throw new Error('Username or password wrong')
// //         }
// //     })
// //     .catch(err => {
// //         res.redirect('/user/signin?errMsg=' + err.msg)
// //     })
// // })


// module.exports = Route