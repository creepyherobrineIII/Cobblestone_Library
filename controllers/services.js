const db = require('../models/modelIndex.js');
const { Op } = require('sequelize');

const Loans = db.loans;
const Member = db.member;
const Books = db.books;
const Reservations = db.reservations;

//Update loans status automatically
const updateLoanStatus = async ()=>{
    let loans = null;
    let loanDateCompare = null;
    let limit = 100;
    let offset = 0;

    let d1 = new Date(); //Current date 
    let d2 = null; //loan Due Date

    let currentDate = null;
    let dueDate = null;

    do{
        loans = await Loans.findAll({where: {loanStatus: 'Loaned'}, limit, offset});
        offset += limit;

        if (loans.length !== 0)
        try{
            for(let i = 0; i < loans.length; i++){
                d2 = new Date(loans[i].loanDueDate);

                currentDate = new Date(d1.getFullYear(), d1.getMonth(), d1.getDate());


                dueDate = new Date(d2.getFullYear(), d2.getMonth(), d2.getDate());

                loanDateCompare = currentDate <= dueDate;

                if (!loanDateCompare){
                    loans[i].loanStatus = 'Loaned: Overdue'

                    await loans[i].save();
                }
            }
        }catch(error){
            throw error;
        }
    }while(loans.length === limit)
}

//Calculate overdue fees
const calculateFees = async () =>{

    let overdueLoans = null;
    let limit = 100;
    let offset = 0;

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

    do{


    }while(overdueLoans.length === limit)

    overdueLoans = await Loans.findAll(
        {where: {
            loanStatus:{
                [Op.in]: ['Loaned: Overdue','Returned: Overdue - Not paid']
            }
        }});

    //Assign loan fees
    if (overdueLoans.length !== 0){
        try{
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
        }catch(error){
            throw error
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