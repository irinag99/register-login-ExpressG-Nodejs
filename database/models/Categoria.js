module.exports = (sequelize, dataTypes) => {
    
    const alias = 'Categoria';
    const cols = {
        nombre: dataTypes.STRING,
        descripcion: dataTypes.TEXT
    }

    const config = {
        timestamps: true 
    }
    
    const Categoria = sequelize.define(alias, cols, config);

    Categoria.associate = function(models){
        Categoria.belongsTo(models.Producto, {
            as: 'producto',
            foreignKey: 'idCategoria'
        });
    }

    return Categoria;
}