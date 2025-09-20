module.exports = (sequelize, DataTypes) =>{

    const Librarian = sequelize.define('librarian', {
       id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
       },

       firstName:{
        type: DataTypes.STRING,
        allowNull: false
       },

       lastName:{
        type: DataTypes.STRING,
        allowNull: false
       },

       email:{
        type: DataTypes.STRING,
        allowNull: false
       },

       password:{
        type: DataTypes.STRING,
        allowNull: false
       }
    },{
        paranoid: true,
        deletedAt: 'LibAccDelDate'
    })

    return Librarian;
}