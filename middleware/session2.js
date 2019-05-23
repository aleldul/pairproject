function session(req, res, next){
    console.log(req.session, '=============== session2')
    if(req.session.user){
        res.redirect('/')
    }
    else{
        next()
    }
    
}

module.exports = session