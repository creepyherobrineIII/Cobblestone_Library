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
            allowNull: false,
            validate:{
                isLessOrEqualToTotalCopies(value){
                    if(value > this.totalCopies){
                        throw new Error('Available copies must be less than or equal to total copies')
                    }
                }
            }
        }
    },{
        paranaoid: true,
        deletedAt: 'BookRemovalDate'
    });

    return BookInventory;
}