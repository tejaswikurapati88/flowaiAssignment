const express= require('express')
const path= require('path')
const {open}= require('sqlite')
const sqlite3 = require('sqlite3')
const cors= require('cors')

const app= express()
app.use(express())
app.use(cors())

const dbPath= path.join(__dirname, 'finance.db')