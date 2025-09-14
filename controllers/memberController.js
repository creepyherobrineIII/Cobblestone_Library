const db = require('../models/modelIndex.js');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const Member = db.member;

//Get all memebers
const getAllMembers = async (req, res) =>{
    try{
        const members = await Member.findAll();

        if (members !== null || members !== undefined){
            res.status(200).json(members);
        } else {
            res.status(400).json("No data")
        }

    } catch(error){
        console.log('\nError Message:\n', error);
        res.status(400).json(error.message);
    }
};

//Create new member account
const createMember = async(req, res) =>{
    try{
        let newMember = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phoneNo: req.body.phoneNo,
            address: req.body.address,
            email:  req.body.email,
            password: req.body.password
        }

        //Check if member exists
        let memCheck = await Member.findOne({where: {email: newMember.email}});

        if (memCheck == null || memCheck == undefined){
           
            //Hash password
            const hashedPass = await bcrypt.hash(newMember.password, saltRounds);
            newMember.password = hashedPass

            //Create new member
            let retMember = await Member.create(newMember);

            //return successful creation
            res.status(201).json(retMember);
        } else{
            res.status(401).json("Email already in use");
        }
    } catch(error){
        console.log('\nError Message:\n', error);
        res.status(400).json(error.message);   
    }
}

//Login as library member
const memberLogin = async (req, res) =>{
    try{
        let loggingMem = {
            email:  req.body.email,
            password: req.body.password
        }

        //Search for member
         let memCheck = await Member.findOne({where: {email: loggingMem.email}});

        if (memCheck !== null || memCheck !== undefined){
            const passCheck = await bcrypt.compare(loggingMem.password, memCheck.password);
            
            if (passCheck){
                res.status(200).json(memCheck)
            } else{
                res.status(401).json("Incorrect email or password");
            }
        } else{
            res.status(401).json("Incorrect email or password");
        }
    } catch(error){
        console.log('\nError Message:\n', error);
        res.status(400).json(error.message);   
    }
}

//Get Member Loans

//Get Member History (with loans, books)

/**TO-DO: Update member, Delete member, Get Member(one)*/

module.exports = {
    getAllMembers,
    createMember,
    memberLogin
}