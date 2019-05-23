function session(req, res, next){
    console.log(req.session, '=============== session')
    if(req.session.user){
        next()
    }
    else{
        res.redirect('/')
    }
    
}

module.exports = session