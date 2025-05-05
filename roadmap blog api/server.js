const express = require('express')
const mongoose  = require('mongoose')
const cors=  require('cors')
const dotenv = require('dotenv')
const Article = require('./models/Article')
dotenv.config()

const app =  express()
const port =  5000;

mongoose.connect(process.env.MONGO_URI)
.then(()=> console.log("Mongo Db connected"))
.catch((err)=> console.log(err,"The error from mongo  connection"))

app.use(cors())
app.use(express.json())


app.post('/',async (req , res )=>{
    try {
        const { title, content }  =  req.body;
        const newPost = new Article({ title  ,  content })
        const  post = await newPost.save()
        res.status(201).json(post)
    } catch (error) {
        res.status(500).json(error)
    }
})

app.put('/:id',async (req , res )=>{
    try {
        const { title, content }  =  req.body;
        const newPost = await Article.findByIdAndUpdate(req.params.id, {title, content})
        res.status(201).json(newPost)
    } catch (error) {
        res.status(500).json(error)
    }
})
app.delete('/:id',async (req , res )=>{
    try {
        await Article.findByIdAndDelete(req.params.id)
        res.status(201).json("post is  deleted successfuly")
    } catch (error) {
        res.status(500).json(error)
    }
})

app.get('/',async (req, res)=>{
    try {
        const posts  = await  Article.find()
        res.status(200).json(posts)
    } catch (error) {
        res.status(500).json(error)
    }
})
app.get('/:id',async  (req, res)=>{
    try {
        const  post  = await  Article.findById(req.params.id)
        res.status(200).json(post)
    } catch (error) {
        res.status(500).json(error)
    }
})

app.listen(port, ()=>{
    console.log('the serveris running on http://localhost:5000')
})