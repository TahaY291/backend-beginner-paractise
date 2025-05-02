// import express from "express";
// import bodyParser from "body-parser";
// import { dirname } from "path";
// import { fileURLToPath } from "url";
// const __dirname = dirname(fileURLToPath(import.meta.url));

// const app = express();
// const port = 3000;

// app.use(bodyParser.urlencoded({extended: true}))

// app.get('/', (req, res)=>{
//   res.sendFile(__dirname + "/public/index.html")
// })


// app.post('/submit',(req,  res)=>{
//   const { street, pet } = req.body;
//   if (street && pet) {
//     res.send(`<h1>${street}${pet} 😎</h1>`);
//   } else {
//     res.send("Please provide both name and pet.");
//   }
// })

// app.listen(port, () => {
//   console.log(`Listening on port ${port}`);
// });


import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended: true}))

let  bandname = ""

const generateBandName = (req, res, next) =>{
  bandname  = req.body["street"] + req.body["pet"]
  next()
}

app.use(generateBandName)

app.get('/',(req,  res)=>{
  res.sendFile(__dirname  + '/public/index.html')
})

app.post('/submit',(req, res)=>{
  res.send(`<h1>Here is your bandname  </h1>  <h3>${bandname}🤘</h3>`)
})

app.listen(3000,()=>{
  console.log("the port  is running  on 3000");
})
