module.exports = (Sequelize, DataTypes) => {

    const Reservations = Sequelize.define('Reservation', {
        
        id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        resDateExpiry:{
            type: DataTypes.DATEONLY,
            allowNull: false
        },

        resDateDeleted:{
            type: DataTypes.DATEONLY,
            allowNull: true
        }
    });

    return Reservations
}