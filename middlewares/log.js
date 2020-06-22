const db = require('../database/models/index.js')
const sequelize = db.sequelize;
const Usuario = db.Usuario;
const Sequelize = require('sequelize');


function log (req, res, next) {
   // return res.send(req.cookies)

   res.locals.user = false;

    if(req.session.user){
       res.locals.user = req.session.user
       return next();

    } else if (req.cookies.email){

      Usuario.findOne({
         where:{
            email: req.cookies.email
         }
      }).then(function(user){
         
          delete user.password;
          res.locals.user = user;
          req.session.user = user;
          return next();
      })
      
    }else{
       return next();
    }
    
 }
 
 module.exports = log;