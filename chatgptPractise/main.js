// const fs =  require('fs')

// fs.writeFileSync('hello.txt', "This is the file i am creating")
// fs.appendFileSync('hello.txt', ' Taha is here')
// const data = fs.readFileSync('hello.txt', 'utf8')

// console.log(data);
// const http = require('http')

// const server = http.createServer((req, res)=> {
//     res.writeHead(200, {'Content-Type': 'text/plain'})
//     if (req.url === '/') {
//         res.end('hello , node.js!')
//     }else if (req.url === '/about') {
//         res.end('This is about page')
//     }else if (req.url === '/contact') {
//         res.end("this is a contact page")
//     }
// })

// server.listen(3000, ()=>{
//     console.log("Taha yasin is creating this server");
    
// })

// const http = require('http')

// const server = http.createServer((req, res)=> {
//     res.writeHead(200, {'Content-Type': 'text/html'})
//     res.end('<h1>This is another one that i one creating</h1>')

// })

// server.listen(3000, ()=>{
//     console.log("This is another server that one i create");
    
// })

// const express = require('express')

// const app = express()

// app.get('/greet',(req, res)=>{
//     const name = req.query.name || 'Geust';
//     const age = req.query.age || 'Age is not defined';
//     const clas = req.query.clas || 'Age is not defined';
//     res.send(`<h1>${name} is ${age} ${clas} old</h1>`)
// })
// app.get('/about',(req, res)=>{
//     const name = req.query.name || 'Geust';
//     res.send(`<h1>This about this ${name} </h1>`)
// })

// app.listen(3000, ()=>{
//     console.log('Taha');
    
// })
// const {MongoClient} = require('mongodb')
// async function connectDB() {
//     const client = new MongoClient('mongodb://127.0.0.1:27017');
//     try {
//         await client.connect();
//         console.log('Connected to MongoDb');
        
//         const db = client.db('Taha')
//         const collection = db.collection('user')

//         const result = await collection.insertOne({
//             name: 'Taha',
//             age: 20,
//             city: "Lahore",

//         })
//         console.log('Document Inserted:', result.insertedId);
        
//     } catch (error) {
//         console.log(error);
        
//     }finally{
//         await client.close();
//     }
// }
// connectDB()
// const express = require('express')
// const mongoose = require('mongoose')
// const app = express()
// const PORT = 3000;

// mongoose.connect('mongodb://127.0.0.1:27017/testDB')
//     .then(() => console.log('Connected to MongoDB'))
//     .catch(err => console.error('Could not connect to MongoDB', err));

// const UserSchema = new mongoose.Schema({
//     name: String,
//     age: Number
// })

// const User = mongoose.model('User', UserSchema);

// app.post('/users', async (req, res)=>{
//     const user = new User(req.body);
//     await user.save()
//     res.send(user);
// })

// app.get('/users', async (req, res) => {
//     const users = await User.find();
//     res.send(users);
// });

// app.listen(3000, () => console.log('Server running on port 3000'));
// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');

// const app = express();
// app.use(bodyParser.json());

// // ✅ Fix: Correct MongoDB connection logging
// mongoose.connect('mongodb://localhost:27017/userDB')
//   .then(() => console.log("Connected to MongoDB"))
//   .catch(err => console.error("MongoDB connection error:", err));

// // ✅ Define Schema and Model
// const UserSchema = new mongoose.Schema({
//     name: String,
//     age: Number,
//     group: String,
// });

// const User = mongoose.model('User', UserSchema);

// // ✅ GET: Fetch all users
// app.get('/users', async (req, res) => {
//     try {
//         const users = await User.find();
//         res.json(users);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

// // ✅ POST: Create a new user
// app.post('/users', async (req, res) => {
//     try {

//         const { name, age , group} = req.body;
//         if (!name || !age) {
//             return res.status(400).json({error: "Name and age are required"})
//         }
//         const newUser = new User({ name, age, group });
//         await newUser.save();
        
//         res.status(201).json(newUser); // ✅ Fix: Send response after saving
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

// const PORT = 3000;
// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });
const express = require('express')
const mongoose = require('mongoose')
const bodyParser =  require('body-parser')

const app = express()
const PORT = 3000;

mongoose.connect('mongodb://localhost:27017/greatDB')
.then(console.log("This is after connection success with mongoDb"))
.catch(err=> (console.log("Here is the error , ", err)))


const UserSchema = new mongoose.Schema({
    name: String,
    age: Number, 
    school: String
})

const user = mongoose.model('User', UserSchema)

app.get('/users',async (req, res)=>{
    try {
        const usersData = await user.find()
        res.json(usersData)
    } catch (error) {
        console.log("this error occur due to data could not find",error);
        
    }
})

app.post('/users',async (req, res)=>{
    try {
        const {name, age, school} = req.body;
        const userData = {name, age, school}
        await userData.save()
        console.log(userData);
    } catch (error) {
        console.log("this is the error related to the userData", error);
    }
})

app.listen(PORT, ()=>{
    console.log("App is working on this port localhost://3000");
})