const db = require('../models/modelIndex.js');
const { Op } = require('sequelize');

const Loans = db.loans;
const Member = db.member;
const Books = db.books;
const Reservations = db.reservations;

//Update loans status automatically
const updateLoanStatus = async ()=>{
    let loans = await Loans.findAll({where: {loanStatus: 'Loaned'}});

    if (loans.length !== 0){
        for(let i = 0; i < loans.length; i++){
            let currentDate = new Date();
            let dueDate = new Date(loans[i].loanDueDate)

            let loanDateCompare = currentDate <= dueDate;

            if (!loanDateCompare){
                loans[i].loanStatus = 'Loaned: Overdue'

                await loans[i].save();
            }
        }
    }
}

//Calculate overdue fees
const calculateFees = async () =>{
    //lfdu: last fee date update
    let lFDU = null;
    let currentDate = new Date();

    let overdueLoans = await Loans.findAll(
        {where: {
            loanStatus:{
                [Op.in]: ['Loaned: Overdue','Returned: Overdue - Not paid']
            }
        }});

    if (overdueLoans.length !== 0){

    }
}

//Check reservation expirations
const checkResExpiration = async () =>{

}

module.exports = {
    updateLoanStatus,
    calculateFees,
    checkResExpiration
}