const router = require('express').Router();
const Post = require('../models/Post');

router.post('/', async (req, res) => {
    const newPost = new Post(req.body);
    try {
        const post = await newPost.save();
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.put('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if (post.username === req.body.username) {
            try {
                const updatedPost = await Post.findByIdAndUpdate(
                    req.params.id,
                    {
                        $set: req.body,
                    },
                    { new: true }
                );
                res.status(200).json(updatedPost);
            } catch (error) {
                res.status(500).json(err);
            }
        } else {
            res.status(401).json("you can on;y update on you account")
        }
    } catch (error) {
        res.status(500).json(error)
    }
})

router.delete("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.username === req.body.username) {
            try {
                await post.delete();
                res.status(200).json("Post has been deleted...");
            } catch (err) {
                res.status(500).json(err);
            }
        } else {
            res.status(401).json("You can delete only your post!");
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/', async (req, res) => {
    const username = req.query.username;
    const catName = req.query.cat;
    try {
        let posts;
        if (username) {
            posts = await Post.find({ username })

        } else if (catName) {
            posts = await Post.find({
                categories: {
                    $in: [catName],
                }
            })
        } else {
            posts = await Post.find()
        }
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json(err)
    }
})


module.exports = router;
