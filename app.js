const express = require('express')
const app = express()
const port = 3000
const {User} = require('./models')
const gameRoute = require('./routes/routeGame')
const bcrypt = require('bcryptjs')
const session = require('express-session')
const checkSession = require('./middleware/session')
const checkSession2 = require('./middleware/session2')

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

app.get('/signout', checkSession2, (req, res) => {
    res.render('home.ejs')
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
    res.render('user/profile.ejs')
})



app.listen(port, () => 
console.log(`Reaction Game listening on port ${port}!`))