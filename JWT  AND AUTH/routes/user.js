const router = require('express').Router();
const bcrypt =  require('bcrypt');
const User = require('../models/User');

router.put('/:id',async (req, res)=>{
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        if (req.body.password) {
            try {
                const salt =  await  bcrypt.genSalt(10)
                req.body.password = await bcrypt.hash(req.body.password, salt)
            } catch (error) {
                return res.status(500).json(error)
            }
        }
        try {
            const user = await User.findByIdAndUpdate(req.params.id,{
                $set: req.body,
            });
            res.status(200).json("Account has been updated")
        } catch (error) {
            res.status(500).json(error)
        }
    }else{
        res.status(403).json('You  update only your account')
    }

})
router.delete('/:id',async (req, res)=>{
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        try {
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json("Account has been deleted")
        } catch (error) {
            res.status(500).json(error)
        }
    }else{
        res.status(403).json('You  can delete only your account')
    }
})

router.get('/:id',async (req, res)=>{
    try{
        const user = await User.findById(req.params.id)
        const {password, updatedAt, ...other}  =  user._doc
        res.status(200).json(other)
    }catch(err){
        res.status(500).json(err)
    }
})

router.put('/:id/follow', async (req, res)=>{
    if (req.body.userId !== req.params.id) {
        try {
            const user = await User.findById(req.params.id)
            const currentUser = await User.findById(req.body.userId)
            if (!user.followers.includes(req.body.userId)) {
                await user.updateOne({$push: {followers : req.body.userId}})
                await currentUser.updateOne({$push: {followins : req.params.id}})
                res.status(200).json("user has been followed")
            }else{
                res.status(403).json('user is already in  your followings')
            }
        } catch (error) {
            res.status(500).json(error)
        }
    }else{
        res.status(403).json("you caqn't follow yourself")
    }
})
router.put('/:id/unfollow', async (req, res) => {
    if (req.body.userId !== req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);

            if (user.followers.includes(req.body.userId)) {
                await user.updateOne({ $pull: { followers: req.body.userId } });
                await currentUser.updateOne({ $pull: { followins: req.params.id } }); 
                res.status(200).json("User has been unfollowed");
            } else {
                res.status(403).json("User is already unfollowed");
            }
        } catch (error) {
            res.status(500).json({ message: "Something went wrong", error: error.message });
        }
    } else {
        res.status(403).json("You can't unfollow yourself");
    }
});


module.exports = router;