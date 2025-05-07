import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import Blog from './models/Blog.js'; // Ensure this path is correct

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/anotherBlog')
    .then(() => console.log('Here is the successful connection with MongoDB'))
    .catch((err) => console.log(err, "Connection failed"));

app.post('/', async (req, res) => {
    try {
        const { title, content, category, tags } = req.body;

        if (!title || !content || !category) {
            return res.status(400).json({ error: 'Title, content, and category are required' });
        }
        const existingPost = await Blog.findOne({ title });
        if (existingPost) {
            return res.status(409).json({ error: 'A blog post with this title already exists.' });
        }

        const post = new Blog({ title, content, category, tags });
        const newPost = await post.save();
        res.status(201).json(newPost);
    } catch (error) {
        if (error.code === 11000) { // MongoDB duplicate key error
            return res.status(409).json({ error: 'A blog post with this title already exists.' });
        }
        res.status(500).json({ error: 'Something went wrong', details: error.message });
    }
});


app.put('/:id', async (req, res) => {
    try {
        const post = await Blog.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true })
        res.status(200).json(post)
    } catch (error) {
        res.status(500).json(error)
    }
})

app.delete('/:id', async (req, res) => {
    try {
        await Blog.findByIdAndDelete(req.params.id)
        res.status(200).json("The blog is deleted successfuly")
    } catch (error) {
        res.status(500).json(error)
    }
})

app.get('/', async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.status(200).json(blogs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
app.get('/search',async (req, res) => {
    try {
        const { search } = req.query;
        const  post = await Blog.find({
            title  :  { $regex : new RegExp(search, 'i')}
        })
        res.status(200).json(post)
    } catch (error) {
        res.status(500).json(error)
    }
})

app.get('/:id', async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) return res.status(404).json({ error: 'Not found' });
        res.json(blog);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});



app.listen(port, () => {
    console.log(`The server is running on http://localhost:${port}`);
});
