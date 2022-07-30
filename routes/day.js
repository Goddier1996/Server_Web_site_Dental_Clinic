const express = require('express')
const sql = require('mssql')
const config = require('../utils/config')



let ClinicRoute = express.Router()



//show all days from MySql
ClinicRoute.get('/', async (req, res) => {

    try {
        let db = await sql.connect(config.db)

        let query = await db.request().execute('Select_days_from_Dentist_Serial_code')

        let data = await query.recordset
        res.send(data)

    } catch (error) {
        res.send(error)
    }
})





module.exports = ClinicRoute