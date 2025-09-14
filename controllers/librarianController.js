const db = require('../models/modelIndex.js');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const Librarian = db.librarian;

//Adding new librarian 
const addLibrarian = async (req, res) =>{
    
    try{
        //Librarian object
        let admin = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password
        } 
        
        //Hashing password
        const hashedPass = await bcrypt.hash(admin.password, saltRounds);

        admin.password = hashedPass;

        console.log()

        //Check if user exists already
        let libCheck = await Librarian.findOne({where: {email : admin.email}});

        let libAdmin;
        
        if (libCheck == null || libCheck == undefined)
        {
            libAdmin = await Librarian.create(admin);
        } else{
            res.status(401).json("Email already in use");
        }


        //Error handling
        if (libAdmin !== null || libAdmin !== undefined)
        {
            res.status(201).json(libAdmin);
        } else
        {
            res.status(400).json({message: "Unable to create object: Null object"})
        }
    } catch (error)
    {
        console.log('\nError Messsage:\n' + error);
        res.status(400).json(error.message);
    }
   
}

//Librarian login
const librarianLogin = async (req, res) => {

    try{
        let libAdmin = {
                email: req.body.email,
                password: req.body.password
            }

        //Check if user exists
        let libCheck = await Librarian.findOne({where: {email : libAdmin.email}});

        if (libCheck == null || libCheck == undefined  || libCheck.isActive == false)
        {
            res.status(401).json("Incorrect username/password");
        }

        //Comparing passwords
        let passCheck = await bcrypt.compare(libAdmin.password, libCheck.password);

        if(passCheck)
        {
            res.status(200).json(libCheck);
        } else{
            res.status(401).json("Incorrect username/password");
        }

        
    } catch (error){
        console.log('\nError Messsage:\n' + error);
        res.status(400).json(error.message);
    }
}

//Update librarian account
const updateLibrarian = async (req, res) =>{
    try{
        let libEmail = req.body.email;

        req.body.password = await  bcrypt.hash(req.body.password, saltRounds);
        
        const updatedLibAdmin = await Librarian.update(req.body, {where: {email: libEmail}});

        res.status(201).json("Updated user");
    } catch(error){
        console.log('\nError Messsage:\n' + error);
        res.status(400).json(error.message);
    }
}

//Delete librarian account
const deleteLibrarian = async (req, res) =>{
    try{
        let libEmail = req.body.email;

        const updatedLibAdmin = await Librarian.update(req.body, {where: {email: libEmail}});
    } catch(error){
        console.log('\nError Messsage:\n' + error);
        res.status(400).json(error.message);
    }
}


/**TO-DO: Update libarian(change function), Delete librarian, Get Libraian (all & one)*/

module.exports ={
    addLibrarian,
    librarianLogin,
    updateLibrarian,
    deleteLibrarian
}