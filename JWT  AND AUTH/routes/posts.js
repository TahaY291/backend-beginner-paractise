const Post = require('../models/Post');
const { updateOne } = require('../models/User');

const router = require('express').Router();

router.post('/',async (req, res)=>{
    const newPost = new Post(req.body)
    try {
        const savePost = await newPost.save()
        res.status(200).json(savePost)
    } catch (error) {
        res.status(500).json(error);
    }
})
router.put('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.userId === req.body.userId) {
            await post.updateOne({ $set: req.body });
            res.status(200).json("The post has been updated");
        } else {
            res.status(403).json("You can only update your own post");
        }
    } catch (error) {
        res.status(500).json({ message: "Something went wrong", error: error.message });
    }
});
router.delete('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.userId === req.body.userId) {
            await post.deleteOne();
            res.status(200).json("The post has been deleted");
        } else {
            res.status(403).json("You can only delete your own post");
        }
    } catch (error) {
        res.status(500).json({ message: "Something went wrong", error: error.message });
    }
});

router.put('/:id/like',async (req,  res)=>{
    try {
        const post = await  Post.findById(req.params.id)
        if(!post.likes.includes(req.body.userId)){
            await  post.updateOne({$push: {likes: req.body.userId}})
            res.status(200).json("the post has  been liked")
        }else{
            await post.updateOne({$pull:  {likes: req.body.userId}})
            res.status(200).json("the has  been desliked successfuly")
        }
    } catch (error) {
        res.status(500).json(error)
    }
})

router.get('/:id',async (req, res)=>{
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json(error);
    }
})

router.get('/timeline/all',async (req, res)=>{
    try {
        const currectUser = await User.findById(req.body.userId)
        const  userPost = await Post.find({userId: currectUser._id})
        const friendPosts  = await Promise.all(
            currectUser.followins.map((friendId)=>{
                return Post.find({userId: friendId})
            })
        )
        res.json(userPost.concat(...friendPosts))
    } catch (error) {
        res.status(500).json(error)
    }
})


module.exports  = router;
