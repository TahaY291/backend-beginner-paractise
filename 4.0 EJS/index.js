import express from "express";
const app  = express()
const port = 3000;


app.get('/',(req, res)=>{
    const today  =  new Date()
    const day = today.getDay()

    console.log(day)
    res.render("index.ejs",{
        dayType: "a weekly",
        advice: "it's time to work hard",
    })
})

app.listen(port, ()=>{
    console.log("Server running on the port 3000")
})