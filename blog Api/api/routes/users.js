const router = require('express').Router()
const Post = require('../models/Post');
const User = require('../models/User')
const bcrypt = require('bcrypt')

router.put("/:id", async (req, res) => {
    if (req.body.userId === req.params.id) {
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
        }
        try {
            const updatedUser = await User.findByIdAndUpdate(
                req.params.id,
                {
                    $set: req.body,
                },
                { new: true }
            );
            res.status(200).json(updatedUser);
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(401).json("You can update only your account!");
    }
});
router.delete('/:id', async (req, res) => {
    if (req.body.userId === req.params.id) {
        try {
            const  user  = await User.findById(req.params.id)
            try {
                await Post.deleteMany({username: user.username})
                await User.findByIdAndDelete(req.params.id);
                res.status(200).json("The user is deleted successfuly")
            } catch (error) {
                res.status(500).json(error);
            }
        } catch (error) {
            res.status().json("user not found!")
        }
    } else {
        res.status(401).json("you can delete only your account")
    }
});

router.get('/:id',async (req, res)=>{
    try {
        const user  =  await User.findById(req.params.id)
        const {password, ...others}  = user._doc;
        res.status(200).json(others)
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router;