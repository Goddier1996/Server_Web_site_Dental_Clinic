const express = require('express')
const sql = require('mssql')
const config = require('../utils/config')


let ClinicRoute = express.Router()




ClinicRoute.get('/', async (req, res) => {

    try {
        let db = await sql.connect(config.db)

        let query = await db.request().execute('Select_Reviews_from_Dentist')

        let data = await query.recordset
        res.send(data)

    } catch (error) {
        res.send(error)
    }
})




ClinicRoute.get('/CountReviews', async (req, res) => {

    try {
        let db = await sql.connect(config.db)

        let query = await db.request().execute('countReviews')

        let data = await query.recordset
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
            .execute('Select_View_Review_user_usercode')

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
            .execute('Delete_View_Review_user')

        let data = await query
        res.send(data)

    } catch (error) {
        res.send(error)
    }
})




ClinicRoute.post('/add', async (req, res) => {

    try {
        let body = req.body;

        let db = await sql.connect(config.db)

        let query = await db.request()
            .input('textReviews', sql.NText, body.textReviews)
            .input('DatePublished', sql.Date, body.DatePublished)
            .input('Publish_by', sql.Int, body.Publish_by)
            .output('Serial_code', sql.Int)
            .execute('Add_Reviews')

        let data = await query.output
        res.send(data)

    } catch (error) {
        res.send(error)
    }
})




ClinicRoute.post('/addLike', async (req, res) => {

    try {
        let body = req.body;

        let db = await sql.connect(config.db)

        let query = await db.request()
            .input('how_like', sql.NText, body.how_like)
            .input('Serial_code_how_Like', sql.Int, body.Serial_code_how_Like)
            
            .output('Serial_code', sql.Int)
            .execute('Add_Review_Likes')

        let data = await query.output
        res.send(data)

    } catch (error) {
        res.send(error)
    }
})



module.exports = ClinicRoute