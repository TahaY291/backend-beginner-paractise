const express = require('express')
const mongoose = require('mongoose')
const app = express()

const PORT = 3000;


app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/todo')
    .then(()=> console.log("This is good connection"))
    .catch(error => console.log("The connection is not working here is the error", error))

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    completed: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

const Task = mongoose.model('Task', taskSchema)

app.get('/task',async (req, res)=>{
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks)
    } catch (error) {
        console.log("You are failed to get all data");
        res.status(500).send("get method is not working")
    }
})

app.post('/task',async (req, res)=>{
    try {
        const {title, description, completed, createdAt} = req.body;
        const task = new Task({title, description, completed, createdAt})
        await task.save()
        res.status(200).json(task)
    } catch (error) {
        console.log("This post is not working:", error);
        res.status(500).json({ message: "Failed to create task" });
    }
})

app.get("/task/:id", async (req, res) => {
    try {
      const task = await Task.findById(req.params.id);
      if (!task) {
        return res.status(404).json({ message: "Task not found" });
      }
      res.status(200).json(task);
    } catch (error) {
      console.error("Error fetching task by ID:", error);
      res.status(500).json({ message: "Error retrieving task" });
    }
  });

  app.patch("/task/:id",async (req, res)=>{
    try {
        const task = await Task.findByIdAndUpdate(req.params.id)
        if (!task) {
            return res.status(404).json({message: "Task not found"})
        }
        res.status(200).json(task)
    } catch (error) {
        res.status(500).json({ message: "Failed to update task" });
    }
  })

app.delete('/task/:id', async (req, res)=>{
    try {
        const task = await Task.findByIdAndDelete(req.params.id)
        if (!task) {
            return res.status(404).json({message: "task not found"})
        }
        res.status(200).json(task)
    } catch (error) {
        res.status(500).json({messaga: "cannot able to do this"})
    }
})

app.listen(PORT,()=>{
    console.log("This code working on this port localhost://3000");
})