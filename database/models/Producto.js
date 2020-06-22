module.exports = (sequelize, dataTypes) => {
    
    const alias = 'Producto';
    const cols = {
        nombre: dataTypes.STRING,
        descripcion: dataTypes.STRING,
        imagen: dataTypes.STRING,
        cantidad: dataTypes.INTEGER,
        idCategoria: dataTypes.INTEGER
    }

    const config = {
        timestamps: true 
    }
    
    const Producto = sequelize.define(alias, cols, config);

        Producto.associate = function(models){
            Producto.belongsTo(models.Categoria, {
                as: 'categoria',
                foreignKey: 'idCategoria'
            });
        }


    return Producto;
}