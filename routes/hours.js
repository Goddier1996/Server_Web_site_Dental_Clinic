const express = require('express')
const sql = require('mssql')
const config = require('../utils/config')



let ClinicRoute = express.Router()



//show all hours from MySql
ClinicRoute.get('/', async (req, res) => {

    try {
        let db = await sql.connect(config.db)

        let query = await db.request().execute('Select_hours_from_Dentist_Serial_code')

        let data = await query.recordset
        res.send(data)

    } catch (error) {
        res.send(error)
    }
})




//show with id hours from MySql

ClinicRoute.get('/:id', async (req, res) => {

    try {
        let params = req.params

        let db = await sql.connect(config.db)

        let query = await db.request()
            .input('Day_date', sql.Int, params.id)
            .execute('Select_hours_from_Dentist_by_usercode')

        let data = await query.recordset
        res.send(data)

    } catch (error) {
        res.send(error)
    }
})




ClinicRoute.delete('/delete/:id', async (req, res) => {

    try {
        let params = req.params

        let db = await sql.connect(config.db)

        let query = await db.request()
            .input('Serial_code', sql.Int, params.id)
            .execute('Delete_hour')

        let data = await query
        res.send(data)

    } catch (error) {
        res.send(error)
    }
})




ClinicRoute.put('/reactivate/:id', async (req, res) => {

    try {
        let params = req.params

        let db = await sql.connect(config.db)

        let query = await db.request()
            .input('Serial_code', sql.Int, params.id)
            .execute('Reactivate_hour')

        let data = await query
        res.send(data)

    } catch (error) {
        res.send(error)
    }
})



module.exports = ClinicRoute