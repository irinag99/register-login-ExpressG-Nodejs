const { body } = require('express-validator');
const bcrypt = require('bcrypt');

const db = require('../database/models/index.js')
const sequelize = db.sequelize;
const Usuario = db.Usuario;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = {
    register: [
        body('email')
            .notEmpty().withMessage('este campo es obligatorio').bail()
            .isEmail().withMessage('debes colocar un email valido').bail()
            .custom(value => {
                return Usuario.findOne({
                    where:{
                        email: value
                    }
                })
                .then(function(resultado){
                    if(resultado){
                        return Promise.reject('email en uso')
                    }
                })
            }),
            body('password')
         .notEmpty().withMessage('Este campo es obligatorio').bail()
         .isLength({min: 8}).withMessage('La contraseña debe tener por lo menos 8 caracteres').bail()
         .custom((value, { req }) => req.body.password == req.body.retype).withMessage('Las passwords no coinciden'),
      body('retype')
         .notEmpty().withMessage('Este campo es obligatorio')
    ],

    login:[
        body('email')
            .notEmpty().withMessage('este campo es obligatorio').bail()
            .isEmail().withMessage('debes colocar un email valido').bail()
            .custom((value, {req}) => {
                return Usuario.findOne({
                    where:{
                        email : value
                    }
                })
                .then(function(resultado){
                    if(resultado){
                        if(!bcrypt.compareSync(req.body.password, resultado.password)){
                            return Promise.reject('la contraseña o el email no coinciden')
                        }
                    }else{
                        return Promise.reject('la contraseña o el email no coinciden')
                    }
                })
            }),   
    ],

}