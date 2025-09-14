module.exports = (Sequelize, DataTypes) =>{

    const BookInventory = Sequelize.define('BookInventory', {
        id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        totalCopies:{
            type: DataTypes.INTEGER,
            allowNull: false
        },

        availableCopies:{
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });

    return BookInventory;
}