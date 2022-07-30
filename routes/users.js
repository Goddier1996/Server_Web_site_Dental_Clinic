const express = require('express')
const sql = require('mssql')
const config = require('../utils/config')




let ClinicRoute = express.Router()




ClinicRoute.get('/', async (req, res) => {

    try {
        let db = await sql.connect(config.db)

        let query = await db.request().execute('Select_users_from_Dentist')

        let data = await query.recordset
        res.send(data)

    } catch (error) {
        res.send(error)
    }
})




ClinicRoute.get('/CountDoctors', async (req, res) => {

    try {
        let db = await sql.connect(config.db)

        let query = await db.request().execute('countDoctors')

        let data = await query.recordset
        res.send(data)

    } catch (error) {
        res.send(error)
    }
})




ClinicRoute.get('/CountUsers', async (req, res) => {

    try {
        let db = await sql.connect(config.db)

        let query = await db.request().execute('countUsers')

        let data = await query.recordset
        res.send(data)

    } catch (error) {
        res.send(error)
    }
})




ClinicRoute.get('/users_Active_queues', async (req, res) => {

    try {
        let db = await sql.connect(config.db)

        let query = await db.request().execute('Select_users_check_Active_queues_from_Dentist')

        let data = await query.recordset
        res.send(data)

    } catch (error) {
        res.send(error)
    }
})





ClinicRoute.get('/blocked_users', async (req, res) => {

    try {
        let db = await sql.connect(config.db)

        let query = await db.request().execute('Select_users_blocked_from_Dentist')

        let data = await query.recordset
        res.send(data)

    } catch (error) {
        res.send(error)
    }
})





ClinicRoute.get('/Doctors', async (req, res) => {

    try {
        let db = await sql.connect(config.db)

        let query = await db.request().execute('Select_Doctors_from_Dentist')

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
            .input('User_code', sql.Int, params.id)
            .execute('Select_users_from_Dentist_by_usercode')

        let data = await query.recordset
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
            .input('Birthday', sql.Date, body.Birthday)
            .input('FirstName', sql.NVarChar(20), body.FirstName)
            .input('User_Login', sql.NVarChar(20), body.User_Login)
            .input('UserTypeCode', sql.Int, body.UserTypeCode)
            .input('Email', sql.NVarChar(30), body.Email)
            .input('ConfirmPassword', sql.NVarChar(20), body.ConfirmPassword)
            .input('UserPassword', sql.NVarChar(20), body.Password)

            .input('Day_date', sql.NVarChar(20), body.Day_date)
            .input('Hour_day', sql.NVarChar(10), body.Hour_day)
            .input('Serial_codeHour', sql.Int, body.Serial_codeHour)

            .output('UserCode', sql.Int)
            .execute('Add_user_from_Dentist')

        let data = await query.output
        res.send(data)

    } catch (error) {
        res.send(error)
    }
})




ClinicRoute.post('/login', async (req, res) => {

    try {
        let body = req.body;

        let db = await sql.connect(config.db);

        let query = await db.request()
            .input("Login", sql.NVarChar, body.Login)
            .input("Password", sql.NVarChar, body.Password)
            .execute("Login_user_from_Dentist");

        let data = query.recordset[0]; //  מערך אובייקטים - משתמש ספציפי מתחבר 
        console.log(data);
        res.send(data);


    } catch (error) {
        res.send(error)
    }
})




ClinicRoute.post('/forget', async (req, res) => {

    try {
        let body = req.body;

        let db = await sql.connect(config.db);

        let query = await db.request()
            .input("Email", sql.NVarChar, body.Email)
            .execute("Find_user_from_Dentist");

        let data = query.recordset[0];
        console.log(data);
        res.send(data);


    } catch (error) {
        res.send(error)
    }
})




ClinicRoute.put('/update/:id', async (req, res) => {

    try {

        let params = req.params
        let body = req.body

        let db = await sql.connect(config.db)

        let query = await db.request()
            .input('User_code', sql.Int, params.id)

            .input('Birthday', sql.Date, body.Birthday)
            .input('FirstName', sql.NVarChar(20), body.FirstName)
            .input('User_Login', sql.NVarChar(20), body.User_Login)
            .input('UserType_code', sql.Int, body.UserType_code)
            .input('Email', sql.NVarChar(20), body.Email)
            .input('Confirm_password', sql.NVarChar(20), body.Confirm_password)
            .input('User_password', sql.NVarChar(20), body.User_password)
            .input('Day_date', sql.Text, body.Day_date)
            .input('Hour_day', sql.Text, body.Hour_day)
            .input('Serial_codeHour', sql.Int, body.Serial_codeHour)

            .execute('Update_userWebSideDoctor_Dentist')

        let data = await query
        res.send(data)

    } catch (error) {
        res.send(error)
    }
})




ClinicRoute.put('/updatePassword/:id', async (req, res) => {

    try {

        let params = req.params
        let body = req.body

        let db = await sql.connect(config.db)

        let query = await db.request()

            .input('User_code', sql.Int, params.id)

            .input('Confirm_password', sql.NVarChar(20), body.Confirm_password)
            .input('User_password', sql.NVarChar(20), body.User_password)


            .execute('Update_new_password_user_from_Dentist')

        let data = await query
        res.send(data)

    } catch (error) {
        res.send(error)
    }

})




ClinicRoute.put('/updateDayHour/:id', async (req, res) => {

    try {

        let params = req.params
        let body = req.body

        let db = await sql.connect(config.db)

        let query = await db.request()

            .input('User_code', sql.Int, params.id)

            .input('Day_date', sql.NText, body.Day_date)
            .input('Hour_day', sql.NText, body.Hour_day)
            .input('Serial_codeHour', sql.Int, body.Serial_codeHour)


            .execute('Update_new_Day_hour_user_after_check_doctor_from_Dentist')

        let data = await query
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
            .input('User_code', sql.Int, params.id)
            .execute('Delete_User_WebSideDoctor_Dentist')

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
            .input('User_code', sql.Int, params.id)
            .execute('Reactivate_User_WebSideDoctor_Dentist')

        let data = await query
        res.send(data)

    } catch (error) {
        res.send(error)
    }
})





module.exports = ClinicRoute