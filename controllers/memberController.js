const db = require('../models/modelIndex.js');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const Member = db.member;

//Get all memebers
const getAllMembers = async (req, res) =>{
    try{
        const members = await Member.findAll();

        if (members.length !== 0){
            res.status(200).json(members);
        } else {
            res.status(400).json('No member data')
        }

    } catch(error){
        console.log('\nError Message:\n', error);
        res.status(400).json(error.message);
    }
};

//Get member by id
const getMemberById = async (req, res) =>{
    try{
        let memId = req.params.id;

        if (memId > 0){
            let member = await Member.findOne({where: {id: memId}});

            if (member){
                res.status(200).json(member);
            }else{
                res.status(400).json('Member does not exist');
            }
        }else{
            res.status(400).json('Incorrect ID Value');
        }
    }catch(error){
        console.log('\nError Message:\n', error);
        res.status(400).json(error.message);
    }
}

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

        if (memCheck === null){
           
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

        if (memCheck.length !== 0){
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

//Update member details
const updateMember = async (req, res) =>{
    try{
        let updatedMember = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phoneNo: req.body.phoneNo,
            address: req.body.address,
            email:  req.body.email,
            password: req.body.password
        }

        updatedMember.password = await bcrypt.hash(req.body.password, saltRounds);
                
        const updatedMem = await Member.update(updatedMember, {where: {email: updatedMember.email}, returning: true});

        if (updatedMem[1] !== 0){
            res.status(201).json("Updated member details");
        }else{
            res.status(400).json('Member does not exist')
        }

    }catch(error){
        console.log('\nError Message:\n', error);
        res.status(400).json(error.message);   
    }
}

const delMember = async (req, res) =>{
    try{
        memToDelEmail = req.body.email;

        let deletedMemCount = await Member.destroy({where: {email: memToDelEmail}});

        if (deletedMemCount > 0){
            res.status(200).json(`Members deleted: ${deletedMemCount}`);  
        }else{
            res.status(400).json('Member does not exist');  
        }
    }catch(error){
        console.log('\nError Message:\n', error);
        res.status(400).json(error.message);    
    }
}


/**TO-DO: Delete member*/

module.exports = {
    getAllMembers,
    getMemberById,
    createMember,
    memberLogin,
    updateMember,
    delMember
}