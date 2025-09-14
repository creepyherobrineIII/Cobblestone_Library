const db = require('../models/modelIndex.js');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const Librarian = db.librarian;

//Get all librarians 
const getLibrarians = async (req, res) =>{
    try{
        let librarians = await Librarian.findAll();

        if (librarians.length !== 0){
            res.status(200).json(librarians);
        }else{
            res.status(400).json('No libraians in database');
        }
    }catch(error){
        console.log('\nError Messsage:\n' + error);
        res.status(400).json(error.message);
    }
}

//Get librarian by id
const getLibrarianById = async (req, res) =>{
    try{
        let libId = req.params.id;

        let librarian = await Librarian.findAll({where: {id: libId}});

        if (librarian.length !== 0){
            res.status(200).json(librarian);
        }else{
            res.status(400).json('Invalid id');
        }
    }catch(error){
        console.log('\nError Messsage:\n' + error);
        res.status(400).json(error.message);
    }
}

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
        
        if (libCheck.length === 0)
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

        if (libCheck.length === 0 || libCheck.isActive == false)
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
        let updatedLib ={
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password
        }

        updatedLib.password = await bcrypt.hash(req.body.password, saltRounds);
        
        const updatedLibAdmin = await Librarian.update(updatedLib, {where: {email: updatedLib.email}});

        if (updatedLibAdmin !== null || updatedLibAdmin !== undefined){
            res.status(201).json("Updated user");
        }else{
            res.status(400).json('Unable to update')
        }
    } catch(error){
        console.log('\nError Messsage:\n' + error);
        res.status(400).json(error.message);
    }
}

//Delete librarian account
const deleteLibrarian = async (req, res) =>{
    try{
        let libEmail = req.body.email;

        let delLib =  await Librarian.destroy({where: {email: libEmail}});

        if (delLib !== null || delLib !== undefined){
            res.status(200).json(delLib);
        }else{
            res.status(400).json('Cannot delete librarian');
        }
    } catch(error){
        console.log('\nError Messsage:\n' + error);
        res.status(400).json(error.message);
    }
}


/**TO-DO: Get Libraian (all & one)*/

module.exports ={
    getLibrarians,
    getLibrarianById,
    addLibrarian,
    librarianLogin,
    updateLibrarian,
    deleteLibrarian
}