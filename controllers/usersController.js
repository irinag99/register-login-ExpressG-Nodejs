const bcrypt = require('bcrypt');

const db = require('../database/models/index.js');
const sequelize = db.sequelize;
const Usuario = db.Usuario;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const {validationResult} = require('express-validator');



const usersController = {
    register: function (req, res) {
        return res.render('register')
        
    },
    processRegister: function (req, res) {
        //crear objeto que se va aguardar en la DB
        const errors = validationResult(req);


        if(errors.isEmpty()){
            let user = req.body
        delete user.retype;
        user.password = bcrypt.hashSync(user.password, 10);
        //return res.send(req.body);

        Usuario.create(user)
            .then(() => res.redirect('/users/login'));
        }else{
            return res.render('register', { errors: errors.errors })
        }
        
    },



    login: function(req, res){
        res.render('login');
    },


    processLogin: function (req, res) {
        //res.send(req.body);

        Usuario.findOne({
            where: {
                email: req.body.email
            }
        })
            .then(user => {

                if (user) {
                    if (bcrypt.compareSync(req.body.password, user.password)) {
                        let userSession = user;
                        delete userSession.password;
                        req.session.user = userSession;
                        //return res.send(req.session.user)
                        // res.locals.user = true;
                        //console.log(res.locals.user)
                        
                        if(req.body.remember){
                            res.cookie('email', userSession.email, { maxAge: 1000 * 60 * 60 * 24 });
                        }

                    return res.redirect('/');


                    } else {
                        return res.send('La password no coincide')
                    }
                } else {
                    return res.send('No se encontro usuario')
                }
            })


    },
    logout: function(req, res){
        req.session.destroy();

        if(req.cookies.email){
            res.clearCookie('email');
        }
        
        return res.redirect('/');
    }
}


module.exports = usersController;