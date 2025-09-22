const db = require('../models/modelIndex.js');
const { Op } = require('sequelize');

const Loans = db.loans;
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
        loans = await Loans.findAll({where: {loanStatus: 'Loaned'}, limit: limit, offset: offset});
        offset += limit;

        if (loans.length !== 0)
        try{
            for(let i = 0; i < loans.length; i++){
                d2 = new Date(loans[i].loanDueDate);

                console.log(d2.toString());

                currentDate = new Date(d1.getFullYear(), d1.getMonth(), d1.getDate());
                dueDate = new Date(d2.getFullYear(), d2.getMonth(), d2.getDate());

                loanDateCompare = currentDate <= dueDate;

                if (!loanDateCompare){
                    loans[i].loanStatus = 'Loaned: Overdue'

                    await loans[i].save();
                }else{
                    continue;
                }
            }
        }catch(error){
            d1 = null;
            d2 = null; 
            currentDate = null;
            dueDate = null;
            loans = null;
            loanDateCompare = null;
            console.log(error.message + '\n');
            throw error;
        }
    }while(loans.length === limit)
    
    //Assigning variables to null for garbage collection
    
    d2 = null; 
    currentDate = null;
    dueDate = null;
    loans = null;
    loanDateCompare = null;
    console.log('Updated loan statuses successfully at: ' + d1.toString() + '\n');
    d1 = null;
    return;
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
    let currentDay = null;
    let dueD = null;
    let LFDU =  null;

    //Boolean date comparisons
    let bCDueDateAndCurrentDate = null;
    let bCLFDUAndCurrentDate = null;

    //Numerical date comparisons
    let nCDueDateAndCurrentDate = null;

    do{
        overdueLoans = await Loans.findAll(
        {where: {
            loanStatus:{
                [Op.in]: ['Loaned: Overdue','Returned: Overdue - Not paid']
            }
        }, limit: limit, offset: offset} );

        offset += limit;

        if (overdueLoans.length !== 0){
            try{
                for(let i = 0; i < overdueLoans.length(); i++){

                    //Date acquisition
                    if (overdueLoans[i].lastFeeDateUpdate === null){
                        d2 = new Date();
                        currentDay = d2.getDate()

                        d2.setDate(currentDay - 1);
                    }else{
                        d2 = new Date(overdueLoans[i].lastFeeDateUpdate);
                    }
                    d3 = new Date(overdueLoans[i].loanDueDate);

                    LFDU = new Date(d2.getFullYear(), d2.getMonth(), d2.getDate());
                    dueD = new Date(d3.getFullYear(), d3.getMonth(), d3.getDate());

                    //Check date comaprisons
                    bCLFDUAndCurrentDate = LFDU < currentD
                    bCDueDateAndCurrentDate = dueD < currentD

                    //Assign loan fees
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

                    }else{
                        continue;
                    }
                }
            }catch(error){
                overdueLoans = null;
                d1 =null; 
                d2 = null; 
                d3 = null; 
                currentD = null;
                dueD = null;
                LFDU =  null;
                bCDueDateAndCurrentDate = null;
                bCLFDUAndCurrentDate = null;
                nCDueDateAndCurrentDate = null;
                currentDay = null;
                console.log(error.message + '\n');
                throw error;
            }
    }
    }while(overdueLoans.length === limit)

    overdueLoans = null;
    d2 = null; 
    d3 = null; 
    currentD = null;
    dueD = null;
    LFDU =  null;
    bCDueDateAndCurrentDate = null;
    bCLFDUAndCurrentDate = null;
    nCDueDateAndCurrentDate = null;
    currentDay = null;
    console.log('Updated fees successfully at: '+ d1.toString() + '\n');
    d1 = null; 
    return;
    
}

//Check reservation expirations
const checkResExpiration = async () =>{
    let d1 = new Date(); //Current date 
    let d2 = null; // Reservation date expiration
    let limit = 100;
    let offset = 0;

    //Date variables 
    let currentD = new Date(d1.getFullYear(), d1.getMonth(), d1.getDate());
    let resExpD = null;
    let recDelCount = 0;

    //Boolean date variables
    let bCResExpDAndCurD = null;

    let reserves = null;

    do{
        reserves = await Reservations.findAll({limit: limit, offset: offset});
        offset+= limit;

        try{
            if (reserves.length !== 0){

                for(let i = 0; i < reserves.length; i++){
                    d2 = new Date(reserves[i].resDateExpiry);

                    resExpD = new Date(d2.getFullYear(), d2.getMonth(), d2.getDate());

                    bCResExpDAndCurD = currentD > resExpD;

                    if (bCResExpDAndCurD){
                       recDelCount += await reserves.destroy({where: {id: reserves[i].id}});
                    }else{
                        continue;
                    }
                }
            }
        }catch(error){
            d1 = null;
            d2 = null;
            currentD = null;
            resExpD = null;
            reserves = null;
            bCResExpDAndCurD = null;
            console.log(error.message + '\n');
            throw error
        }

    } while(reserves.limit === limit)

    d2 = null;
    currentD = null;
    resExpD = null;
    reserves = null;
    bCResExpDAndCurD = null;
    console.log('Amount of deleted records: ' + recDelCount.toString() + '\n at:' + d1.toString() + '\n');
    d1 = null;
    recDelCount = null;
    return;

}

module.exports = {
    updateLoanStatus,
    calculateFees,
    checkResExpiration
}