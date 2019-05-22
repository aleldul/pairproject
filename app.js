const express = require('express')
const app = express()
const port = 3000
const {User} = require('./models')
const gameRoute = require('./routes/routeGame')

app.use(express.static(__dirname + '/views'));

app.use(express.urlencoded({extended: false}));

app.get('/map', (req,res) => {
    res.render('./game/3Dmap.ejs')
})

app.use('/game', gameRoute)

app.get('/', (req, res) => {
    res.render('home.ejs')
})

app.get('/signin', (req, res) => {
    res.render('user/signin.ejs', {
        errSignIn: req.query.errMsg
    })
})

app.post('/signin', (req, res) => {
    User.findOne({
        where: {
            username: req.body.username
        }
    })
    .then(user => {
        if (user) {
            if (user.password == req.body.password) {
                res.send(user)
            } else {
                throw Error('Wrong password')
            }
        } else {
            throw Error('Wrong username')
        }
    })
    .catch(err => {
        res.render('user/signin.ejs', {err: err})
    })
})

app.get('/signup', (req,res) => {
    res.render('./user/signup.ejs', {
        errSignUp: req.query.errMsg
    })
})

app.post('/signup', (req, res) => {
    console.log('test masuk')
    if (req.body.repeatpass != req.body.password) {
        throw Error('Repeat Password and Password not match')
    } else {
        let temp = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        }
        console.log(temp)
        User.create(temp)
        .then(success => {
            res.send(success)
        })
        .catch(err => {
            res.render('user/signup.ejs', {err: err})
        })
    }
})

// app.use("/user", require('./routes/routeUser'))

app.listen(port, () => 
console.log(`Reaction Game listening on port ${port}!`))