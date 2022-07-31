require('dotenv').config();


//load the modules
const express = require(`express`) // html עיבוד דינאמי של דפי 
const cors = require(`cors`) // בקשות מותאמות אישית
const http = require(`http`) // כתובת האתר
const path = require(`path`) // אחראי בכל מה שקשור לתיקיות


//global vars
const PORT = process.env.PORT || 5000   
process.setMaxListeners(100)


//create the server app -> use the modules
let app = express()
app.use(cors())
app.use(express.json()) 



//routes

app.use('/api/users', require('./routes/users'))
app.use('/api/reviews', require('./routes/reviews'))
app.use('/api/day', require('./routes/day'))
app.use('/api/hours', require('./routes/hours'))
app.use('/api/medicalFile', require('./routes/medicalFile'))



//send back the index.html in the static "build" folder
app.get(`/*`, (req, res) => res.sendFile(path.join(__dirname))) 

//apply the http server -> use the http
const server = http.createServer(app)

//run the server
server.listen(PORT, () => { console.log(`the server is live at http://localhost:${PORT}`) })


