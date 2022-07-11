module.exports = {
    ensureAuthenticated: function(req, res, next){
        if (req.isAuthenticated()) {
            return next();
        } else {
            req.flash('error_msg', 'Please login');
            res.redirect('/users/adminConsole');
        }
    },

    ensureAuth:(req, rs, next)=>{
        if(req.isAuthenticated()){
            next();
        }else{
            req.flash('error_msg', "User must be logged in");
        }
    }
}