const express = require('express');
const backgroundFuncs = require('./controllers/services.js');

const app = express();
const PORT = process.env.PORT || 8080;

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routers
const libRouter = require('./routes/librarianRouter.js');
const memRouter = require('./routes/memberRouter.js');
const booksRouter = require('./routes/booksRouter.js');
const bookInventory = require('./routes/bookInventoryRouter.js');
const reserveRouter = require('./routes/reserveRouter.js');
const loansRouter = require('./routes/loansRouter.js');

//Mounting routers
app.use('/librarian', libRouter);
app.use('/member', memRouter);
app.use('/books', booksRouter);
app.use('/inventory', bookInventory);
app.use('/reservation', reserveRouter);
app.use('/loans', loansRouter);


//Testing API
app.get('/', (req, res)=>{
    res.status(200).json({message:"Hello World"})
});


//Server
app.listen(PORT, ()=>{
    console.log(`Server is running at http://localhost:${PORT}`)
});

//Background Functions
//Updating loan status
setInterval(backgroundFuncs.updateLoanStatus(), 210000);

//Calculating loan fees
setInterval(backgroundFuncs.calculateFees(), 300000);

//Clearing expired reservations
setInterval(backgroundFuncs.checkResExpiration(), 120000);