const express = require('express')
const sql = require('mssql') //Sql גישה ל 
const config = require('../utils/config') // ../utils/config גישה לתיקיית 




let ClinicRoute = express.Router()




ClinicRoute.post('/add', async (req, res) => {

    try {
        let body = req.body;

        let db = await sql.connect(config.db)

        let query = await db.request()
            .input('textDoctor', sql.NText, body.textDoctor)
            .input('priceSevice', sql.NText, body.priceSevice)
            .input('File_user', sql.NText, body.File_user)
            .input('Date_published', sql.Date, body.Date_published)
            .input('Publish_by', sql.Int, body.Publish_by)

            .output('Serial_code', sql.Int)
            .execute('Add_medical_file_user')

        let data = await query.output
        res.send(data)

    } catch (error) {
        res.send(error)
    }
})




ClinicRoute.get('/:id', async (req, res) => {

    try {
        let params = req.params

        let db = await sql.connect(config.db)

        let query = await db.request()
            .input('Publish_by', sql.Int, params.id)
            .execute('Select_View_medical_file_user')

        let data = await query.recordset
        res.send(data)

    } catch (error) {
        res.send(error)
    }
})




ClinicRoute.get('/MedicalFileNotActive/:id', async (req, res) => {

    try {
        let params = req.params

        let db = await sql.connect(config.db)

        let query = await db.request()
            .input('Publish_by', sql.Int, params.id)
            .execute('Select_View_medical_file_userIsActive_Not')

        let data = await query.recordset
        res.send(data)

    } catch (error) {
        res.send(error)
    }
})





ClinicRoute.get('/', async (req, res) => {

    try {
        let db = await sql.connect(config.db)

        let query = await db.request().execute('Select_View_medical_file_users')

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
            .execute('Delete_medical_file_user')

        let data = await query
        res.send(data)

    } catch (error) {
        res.send(error)
    }
})





module.exports = ClinicRoute