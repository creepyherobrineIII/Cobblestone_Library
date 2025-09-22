const db = require('../models/modelIndex.js');
const { Op } = require('sequelize');

const Loans = db.loans;
const Member = db.member;
const Books = db.books;
const Reservations = db.reservations;

//Update loans status automatically
const updateLoanStatus = async ()=>{
    let loans = await Loans.findAll({where: {loanStatus: 'Loaned'}});

    let d1 = new Date(); //Current date 
    let d2 = null; //loan Due Date

    if (loans.length !== 0){
        for(let i = 0; i < loans.length; i++){
            d2 = new Date(loans[i].loanDueDate);

            let currentDate = new Date(d1.getFullYear(), d1.getMonth(), d1.getDate());


            let dueDate = new Date(d2.getFullYear(), d2.getMonth(), d2.getDate());

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

    let d1 = new Date(); //Current date 
    let d2 = null; //Last fee update
    let d3 = null; //Loan Due Date

    //Date variables 
    let currentD = new Date(d1.getFullYear(), d1.getMonth(), d1.getDate());
    let dueD = null;
    let LFDU =  null;

    //Boolean date comparisons
    let bCDueDateAndCurrentDate = null;
    let bCLFDUAndCurrentDate = null;

    //Numerical date comparisons
    let nCDueDateAndCurrentDate = null;

    let overdueLoans = await Loans.findAll(
        {where: {
            loanStatus:{
                [Op.in]: ['Loaned: Overdue','Returned: Overdue - Not paid']
            }
        }});

    //Assign loan fees
    if (overdueLoans.length !== 0){
        for(let i = 0; i < overdueLoans.length(); i++){

            //Date acquisition
            d2 = new Date(overdueLoans[i].lastFeeDateUpdate);
            d3 = new Date(overdueLoans[i].loanDueDate);

            LFDU = new Date(d2.getFullYear(), d2.getMonth(), d2.getDate());
            dueD = new Date(d3.getFullYear(), d3.getMonth(), d3.getDate());

            //Check date comaprisons
            bCLFDUAndCurrentDate = LFDU <= currentD
            bCDueDateAndCurrentDate = dueD < currentD

            //Loan operation
            if (bCLFDUAndCurrentDate){
                if (bCDueDateAndCurrentDate){
                    nCDueDateAndCurrentDate = ((currentD.getTime() - dueD.getTime()) / (24 * 60 * 60 *1000));
                    
                    if (nCDueDateAndCurrentDate === 1){
                        overdueLoans[i].loanFee += 5;

                    } else if(nCDueDateAndCurrentDate > 1){
                        overdueLoans[i].loanFee += 1;
                    }

                     await overdueLoans[i].save();
                }

            }


        }
    }
}

//Check reservation expirations
const checkResExpiration = async () =>{
    let d1 = new Date(); //Current date 
    let d2 = null; // Reservation date expiration

    //Date variables 
    let currentD = new Date(d1.getFullYear(), d1.getMonth(), d1.getDate());
    let resExpD = null;

}

module.exports = {
    updateLoanStatus,
    calculateFees,
    checkResExpiration
}