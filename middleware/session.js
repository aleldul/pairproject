module.exports = (req, res, next) => {
    console.log('masuk ke middleware')
    console.log(localStorage.getItem("userId"))
    if(localStorage.getItem("userId")){
        next()
    }else{
        res.redirect('/signin')
    }
}