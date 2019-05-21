const express = require('express')
const app = express()
const port = 3000
const gameRoute = require('./routes/routeGame')

app.use(express.urlencoded({extended:false}))

app.use(express.static(__dirname + '/views'));


app.get('/map', (req,res) => {
    res.render('./game/3Dmap.ejs')
})

app.use('/game', gameRoute)

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})
