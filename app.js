const express = require('express')
const app = express()
const port = 3000
const {User, Play, Game, Board} = require('./models')
const gameRoute = require('./routes/routeGame')
const bcrypt = require('bcryptjs')
const session = require('express-session')
const checkSession = require('./middleware/session')
const checkSession2 = require('./middleware/session2')
const sortData = require('./helpers/sort')
const playerScore = require('./helpers/playerScore')

app.use(express.static(__dirname + '/views'));

app.use(express.urlencoded({extended: false}));

app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false }
}))

app.use('/game', checkSession, gameRoute)

app.get('/', (req, res) => {
    res.render('home.ejs', {
        dataLogin : req.session.user
    })
})

app.get('/signin', checkSession2, (req, res) => {
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
            if (bcrypt.compareSync(req.body.password, user.password)) {
                req.session.user = {
                    id : user.id,
                    username : user.username
                }
                console.log(req.session, '$$$$$$$$$$$$$$$$')
                res.redirect('/')
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

app.get('/signout', checkSession, (req, res) => {
    req.session.destroy(err => {
        res.send(err)
    })
    res.redirect('/')
})

app.get('/signup', checkSession2, (req,res) => {
    res.render('./user/signup.ejs', {
        errSignUp: req.query.errMsg
    })
})

app.post('/signup',  (req, res) => {
    if (req.body.password != req.body.repeatpass) {
        let errSignUp = "Error : Password and Re-password not match"
        res.render('user/signup.ejs', {err: errSignUp})
    } else {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(req.body.password, salt);

    let temp = {
        username: req.body.username,
        email: req.body.email,
        password: hash
    }

    User.create(temp)
    .then(success => {
        // res.send(success)
        res.redirect('/signin')
    })
    .catch(err => {
        res.render('user/signup.ejs', {err: err})
    })
    }
})

app.get('/profile', checkSession, (req, res) => {
    let dataPlay;
    Play.findAll({
        where : {
            UserId : req.session.user.id
        },
        include : [{
            model : User
        },{
            model : Game
        }]
    })
        .then(data => {
            dataPlay = data
            return Game.findAll()
        })
        .then(data => {
            let allData = playerScore(dataPlay, data)
            let obj = {
                gameid : allData[0],
                gameidKey : Object.keys(allData[0]),
                user : allData[1]
            }
            console.log(obj)
            res.render('user/profile.ejs', obj)
        })
        .catch(err => {
            console.log(err)
            res.send(err)
        })
})

app.get('/profile/edit', checkSession, (req, res) => {
    res.render('user/editProfile.ejs')
})

app.get('/leaderboard', checkSession, (req, res) => {
    Play.findAll({
        include : [{
            model : User
        },{
            model : Game
        }]
    })
    .then(data => {
        data.forEach(element => {
            
            console.log(element.dataValues)
        });
        data = sortData(data).slice(0,5)
        
        res.render('leaderboard.ejs', {
            data : data
        })
    })
    .catch(err => {
        console.log(err)
        res.send(err)
    })
})



app.listen(port, () => 
console.log(`Reaction Game listening on port ${port}!`))