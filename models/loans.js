module.exports = (Sequelize, DataTypes) =>{

    const Loans = Sequelize.define('Loans', {
        id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },

        loanStatus:{
            type:DataTypes.ENUM('Loaned', 'Returned', 'Overdue - Not paid', 'Overdue - Paid'),
            allowNull: false, 
        },

        loanStartDate:{
            type: DataTypes.DATEONLY,
            allowNull: false
        },

        loanDueDate:{
            type: DataTypes.DATEONLY,
            allowNull: false
        },

        loanReturnDate:{
            type: DataTypes.DATEONLY,
            allowNull: false
        },

        loanFee:{
            type: DataTypes.FLOAT(10,2),
            allowNull: false,
            defaultValue: 0.00
        }
    });

    return Loans;
}