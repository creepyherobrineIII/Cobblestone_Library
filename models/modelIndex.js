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
    sourceKey: 'ISBN',
    foreignKey: 'BookISBN'
});

db.books.addHook('afterDestroy', async (book, options) =>{
    await db.bookInventory.destroy({where: {BookISBN: book.ISBN}});
});


//Member:Loans
db.member.hasMany(db.loans,{
    sourceKey: 'MemberCardID',
    foreignKey: 'MemberId'
});

db.member.addHook('afterDestroy', async (mem, options) =>{
    await db.loans.destroy({where: {MemberId: mem.MemberCardID}, paranoid: true})
});


//Member:Reservations
db.member.hasMany(db.reservations,{
    sourceKey: 'MemberCardID',
    foreignKey: 'MemberId'
});

db.member.addHook('afterDestroy', async (mem, options) =>{
    await db.reservations.destroy({where: {MemberId: mem.MemberCardID}})
});

//Book: Loans
db.books.hasMany(db.loans,{
    sourceKey: 'ISBN',
    foreignKey: 'BookISBN'
});

db.books.addHook('afterDestroy', async (book, options) =>{
    await db.loans.destroy({where: {BookISBN: book.ISBN}, paranoid: true});
});

//Book: Reservations
db.books.hasMany(db.reservations,{
    sourceKey: 'ISBN',
    foreignKey: 'BookISBN'
});

db.books.addHook('afterDestroy', async (book, options) =>{
    await db.reservations.destroy({where: {BookISBN: book.ISBN}})
});

//Hooks
//Reservation (add book back to inventory after a reservation has been deleted)
db.reservations.addHook('afterDestroy', async(reservation, options) =>{

    let bookInven = await db.bookInventory.findOne({where: {BookISBN: reservation.BookISBN}});

    //Check if book is being loaned, or reservation is deleting for other reason
    let loanCheck = await db.loans.findOne({where: {BookISBN: reservation.BookISBN, MemberId: reservation.MemberId}});

    if (loanCheck === null){

        bookInven.availableCopies += 1;

        await bookInven.save();
    }
})


db.Sequelize.sync({force : false})
.then(() =>{
    console.log(`Resync complete`);
})



module.exports = db;