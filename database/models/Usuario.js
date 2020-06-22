module.exports = (sequelize, dataTypes) => {
    
    const alias = 'Usuario';
    const cols = {
        nombre: dataTypes.STRING,
        email: dataTypes.STRING,
        password: dataTypes.INTEGER
    }

    const config = {
        timestamps: true 
    }
    
    const Usuario = sequelize.define(alias, cols, config);

    return Usuario;
}