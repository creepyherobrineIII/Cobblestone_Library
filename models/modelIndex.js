const dbConfig = require('../config/dbConfig.js');

const {Sequelize, DataTypes} = require('sequelize');

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,{
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,

        pool:{
            max: dbConfig.pool.max,
            min: dbConfig.pool.in,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle    
        }
    }

)

//Tests connection to the database specified
sequelize.authenticate()
.then(() => {
    console.log(`connected to database`)
})
.catch(err =>{
    console.log(`Error:` + err)
})

const db = {};

db.Sequelize = Sequelize;
db.Sequelize = sequelize;

//Models
db.librarian = require('./librarian.js')(sequelize, DataTypes);
db.member = require('./member.js')(sequelize, DataTypes);
db.books = require('./books.js')(sequelize, DataTypes);
db.bookInventory = require('./bookInventory.js')(sequelize, DataTypes);
db.loans = require('./loans.js')(sequelize, DataTypes);
db.reservations = require('./reservations.js')(sequelize, DataTypes);


//Associations

//Books:BookInventory
db.books.hasOne(db.bookInventory, {
    onDelete: 'CASCADE',
    sourceKey: 'ISBN',
    foreignKey: 'BookISBN'
});


//Member:Loans
db.member.hasMany(db.loans,{
    onDelete: 'CASCADE',
    sourceKey: 'MemberCardID',
    foreignKey: 'MemberId'
});


//Member:r\Reservations
db.member.hasMany(db.reservations,{
    onDelete: 'CASCADE',
    sourceKey: 'MemberCardID',
    foreignKey: 'MemberId'
});

//Book: Loans
db.books.hasMany(db.loans,{
    onDelete: 'CASCADE',
    sourceKey: 'ISBN',
    foreignKey: 'BookISBN'
});


//Book: Reservations
db.books.hasMany(db.reservations,{
    onDelete: 'CASCADE',
    sourceKey: 'ISBN',
    foreignKey: 'BookISBN'
});


db.Sequelize.sync({force : false})
.then(() =>{
    console.log(`Resync complete`);
})



module.exports = db;