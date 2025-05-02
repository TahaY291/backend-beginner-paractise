//To see how the final website should work, run "node solution.js".
//Make sure you have installed all the dependencies with "npm i".
//The password is ILoveProgramming
import express from 'express'
import bodyParser from 'body-parser'
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express()
const  port = 3000;

var  userAuthorized  =  false

app.use(bodyParser.urlencoded({extended: true}))

const password  = (req, res, next) => {
    const passwordreq = req.body["password"]
    if (passwordreq ===  'passwordispassword') {
        userAuthorized = true
    }
    next()
}
app.use(password)

app.get('/',(req, res)=>{
    res.sendFile(__dirname + '/public/index.html')
})

app.post('/check',  (req, res)=>{
    if (userAuthorized === true) {
        res.sendFile(__dirname + '/public/secret.html')
    }else{
        res.sendFile(__dirname + '/public/index.html')
    }
})

app.listen(3000, ()=>{
    console.log("The server is running on port 3000");
})