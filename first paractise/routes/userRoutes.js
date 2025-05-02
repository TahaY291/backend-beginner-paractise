const express = require('express')
const User =  require('../models/user.js')
const router = express.Router();

router.post('/', async (req, res)=>{
    try {
        const {name, email, age} = req.body;
        const user =  new User({name , email, age});
        await user.save();
        res.send(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})

// READ all users
router.get('/', async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // READ a single user
  router.get('/:id', async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) return res.status(404).json({ error: 'User not found' });
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // UPDATE a user
  router.put('/:id', async (req, res) => {
    try {
      const { name, email, age } = req.body;
      const user = await User.findByIdAndUpdate(req.params.id, { name, email, age }, { new: true });
      if (!user) return res.status(404).json({ error: 'User not found' });
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // DELETE a user
  router.delete('/:id', async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      if (!user) return res.status(404).json({ error: 'User not found' });
      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  module.exports = router;