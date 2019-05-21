const express = require('express')
const app = express()
const port = 3000

app.use(express.urlencoded({extended: false}));
app.use("/user", require('./routes/routeUser'))

app.listen(port, () => 
console.log(`Reaction Game listening on port ${port}!`))