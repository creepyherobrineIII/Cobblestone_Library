const express = require('express');

const app = express();
const PORT = process.env.PORT || 8080;

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routers
const libRouter = require('./routes/librarianRouter.js');
const memRouter = require('./routes/memberRouter.js');
const booksRouter = require('./routes/booksRouter.js');
const bookInventory = require('./routes/bookInvetoryRouter.js');

//Mounting routers
app.use('/librarian', libRouter);
app.use('/member', memRouter);
app.use('/books', booksRouter);
app.use('/inventory', bookInventory);


//Testing API
app.get('/', (req, res)=>{
    res.status(200).json({message:"Hello World"})
});


//Server
app.listen(PORT, ()=>{
    console.log(`Server is running at http://localhost:${PORT}`)
});