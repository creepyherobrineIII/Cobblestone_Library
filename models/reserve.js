module.exports = (Sequelize, DataTypes) => {

    const Reserve = Sequelize.define('Reserve', {
        
        id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        resDateExpiry:{
            type: DataTypes.DATEONLY,
            allowNull: false
        }
    });

    return Reserve
}