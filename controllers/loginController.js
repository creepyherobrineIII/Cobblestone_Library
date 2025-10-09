const db = require('../models/modelIndex.js');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const Librarian = db.librarian;
const Member = db.member;

const userLogin = async (req, res) =>{

    try{
        let user = {
            email: req.body.email,
            password: req.body.password
        };


        //Check user type
        let libCheck = await Librarian.findOne({where: {email : user.email}});
        let memCheck = await Member.findOne({where: {email: user.email}});

        //Check password
        let passCheck = null;

        if (libCheck !== null){
            passCheck = await bcrypt.compare(user.password, libCheck.password);

            if(passCheck){

                libCheck.setDataValue("userType", "Librarian");
                res.status(200).json(JSON.stringify(libCheck));
            } else{
                res.status(401).json("Incorrect username/password");
            }


        }else if(memCheck !== null){
            passCheck = await bcrypt.compare(user.password, memCheck.password);

            if(passCheck){

                memCheck.setDataValue("userType", "Member");
                res.status(200).json(JSON.stringify(memCheck));
            } else{
                res.status(401).json("Incorrect username/password");
            }
        }else{
            res.status(400).json("Incorrect email/password");
        }
        
        
    }catch(error){
        console.log('\nError Messsage:\n' + error);
        res.status(400).json(error.message);
    }
    
}

module.exports ={
    userLogin
}
