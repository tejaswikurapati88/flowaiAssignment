const express= require('express')
const path= require('path')
const {open}= require('sqlite')
const sqlite3 = require('sqlite3')
const cors= require('cors')
const bcrypt= require('bcrypt') 
const jwt= require('jsonwebtoken')
const port = 3000 || process.env.port

const app= express()
app.use(express())
app.use(cors())

let db= null 

const dbPath= path.join(__dirname, 'finance.db')

const initializationDB= async ()=>{
    try{
        db= await open({
            filename: dbPath,
            driver: sqlite3.Database
        })
        app.listen(port, ()=>{
            console.log(`Server is running at http://localhost:${port}`)
        })
    }catch(e){
        console.log(`Server Error: ${e.message}`)
        process.exit(1)
    }
    
}

initializationDB()


// Inserting data into transactions
app.post('/transactions/', async (request, response) =>{
    const transactionDetails= request.body 
    const {type, category, amount, description}= transactionDetails 
    
    const postTransactionSQL= `
        INSERT INTO transactions (type, category, amount, description)
        values ('${type}', '${category}', ${amount}, '${description}');
    `

    await db.run(postTransactionSQL)
    response.send('posted into transactions.')

})

// Getting all transactions
app.get('/transactions/', async (request, response)=>{
    const getSql= `
        select * from transactions;
    `
    const transactions = await db.all(getSql)
    response.send(transactions)
})

// Getting transaction a Record by id
app.get('/transactions/:id/', async (request, response)=>{
    const {id}= request.params
    const getTransById= `
        select * from transactions where id= ${id};
    `
    const transactionsById = await db.get(getTransById)
    response.send(transactionsById)
})

// Updateing transactions
app.put('/transactions/:id/', async (request, response)=>{
    const {id}= request.params
    const transDetails= request.body 
    const {amount}= transDetails
    const updateTransactions= `
        update transactions 
        set amount =${amount}
        Where id = ${id} ;
    `
    await db.run(updateTransactions)
    response.send('Updated successfully.')
})

// Deleting a transaction Record 
app.delete('/transactions/:id/', async (req, res)=>{
    const {id}= req.params 
    const queryDelete = `
    delete from transactions where id=${id};
    `
    await db.run(queryDelete)
    res.send('Record Deleted Successfully')
})

// Get summary
app.get('/summary/', async (req, res)=>{
    const sqlQuery = `
        Select incomeId, totalincome, totalExpenses, totalincome - totalExpenses as balance from 
        (select id as incomeId, sum(amount) as totalincome from transactions where type= 'income' group by id) as incometable join 
        (select id as expenseId, sum(amount) as totalExpenses from transactions where type= 'expense' group by id) as expenseTable
        on incometable.incomeId == expenseTable.expenseId;
    `
    
    const query=`
        select id as incomeId, sum(amount) as totalincome from transactions where type= 'income' group by id;
    `
    const data= await db.get(sqlQuery)
    res.send(data)
})

module.exports= app