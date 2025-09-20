module.exports = (Sequelize, DataTypes) =>{

    const Loans = Sequelize.define('Loans', {
        id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        loanStatus:{
            type:DataTypes.ENUM('Loaned','Loaned: Overdue', 'Returned: Not Overdue', 'Returned: Overdue - Not paid', 'Returned: Overdue - Paid'),
            allowNull: false,
            defaultValue: 'Loaned' 
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
            allowNull: true
        },

        loanFee:{
            type: DataTypes.FLOAT(10,2),
            allowNull: false,
            defaultValue: 0.00
        }
    },{
        paranoid: true,
        deletedAt: 'LoanDeletionDate'
    });

    return Loans;
}