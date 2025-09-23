const db = require('../models/modelIndex.js');
const { Op } = require('sequelize');

const Loans = db.loans;
const Reservations = db.reservations;

//Update loans status automatically (Tested)
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

                currentDate = new Date(Date.UTC(d1.getUTCFullYear(), d1.getUTCMonth(), d1.getUTCDate()));
                dueDate = new Date(Date.UTC(d2.getUTCFullYear(), d2.getUTCMonth(), d2.getUTCDate()));

                loanDateCompare = currentDate.getTime() <= dueDate.getTime();

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
    console.log('Updated loan statuses successfully at: \n' + d1.toString() + '\n');
    d1 = null;
    return;
}

//Calculate overdue fees (Tested)
const calculateFees = async () =>{

    let overdueLoans = null;
    let limit = 100;
    let offset = 0;

    let d1 = new Date(); //Current date 
    let d2 = null; //Last fee update
    let d3 = null; //Loan Due Date

    //Date variables 
    let currentD = new Date(Date.UTC(d1.getUTCFullYear(), d1.getUTCMonth(), d1.getUTCDate()));
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
                for(let i = 0; i < overdueLoans.length; i++){

                    //Date acquisition
                    if (overdueLoans[i].lastFeeDateUpdate === null){
                        d2 = new Date();
                        currentDay = d2.getUTCDate()

                        d2.setDate(currentDay - 1);
                    }else{
                        d2 = new Date(overdueLoans[i].lastFeeDateUpdate);
                    }

                    
                    d3 = new Date(overdueLoans[i].loanDueDate);

                    LFDU = new Date(Date.UTC(d2.getUTCFullYear(), d2.getUTCMonth(), d2.getUTCDate()));
                    dueD = new Date(Date.UTC(d3.getUTCFullYear(), d3.getUTCMonth(), d3.getUTCDate()));

                    console.log('Current Date:' + currentD.toString())
                    console.log('LFDU:' + LFDU.toString());
                    console.log('Due Date:' + dueD.toString());

                    //Check date comaprisons
                    bCLFDUAndCurrentDate = LFDU.getTime() < currentD.getTime() 
                    bCDueDateAndCurrentDate = dueD.getTime()  < currentD.getTime() 

                    //Assign loan fees
                    if (bCLFDUAndCurrentDate){
                        if (bCDueDateAndCurrentDate){
                            nCDueDateAndCurrentDate = ((currentD.getTime() - dueD.getTime()) / (24 * 60 * 60 *1000));
                            
                            if (overdueLoans[i].loanFee === 0.00 || overdueLoans[i].loanFee === null){
                                overdueLoans[i].loanFee = 0.00;
                                overdueLoans[i].loanFee += 5;

                                overdueLoans[i].loanFee += (nCDueDateAndCurrentDate * 1) - 1;
                            }else{
                                overdueLoans[i].loanFee += 1;
                            }
                        }
                            overdueLoans[i].lastFeeDateUpdate = currentD;
                            await overdueLoans[i].save();
                    } else{
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
    console.log('Updated fees successfully at:\n '+ d1.toString() + '\n');
    d1 = null; 
    return;
    
}

//Check reservation expirations (Tested)
const checkResExpiration = async () =>{
    let d1 = new Date(); //Current date 
    let d2 = null; // Reservation date expiration
    let limit = 100;
    let offset = 0;

    //Date variables 
    let currentD = new Date(d1.getUTCFullYear(), d1.getUTCMonth(), d1.getUTCDate());
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

                    resExpD = new Date(d2.getUTCFullYear(), d2.getUTCMonth(), d2.getUTCDate());

                    bCResExpDAndCurD = currentD > resExpD;

                    if (bCResExpDAndCurD){
                       reserves[i].resDateDeleted = currentD;

                       reserves[i].save();

                       recDelCount++;
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
    console.log('Amount of deleted reservations: ' + recDelCount.toString() + '\n at:' + d1.toString() + '\n');
    d1 = null;
    recDelCount = null;
    return;

}

module.exports = {
    updateLoanStatus,
    calculateFees,
    checkResExpiration
}