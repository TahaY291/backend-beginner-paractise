const router = require('express').Router();
const User = require('../models/User')
const bcrypt =  require('bcrypt')

router.post('/register',async (req, res)=>{

    try {
        const salt = await bcrypt.genSalt(10);
        const  hashPassword = await bcrypt.hash(req.body.password, salt)
        const user =  new  User({
            username: req.body.username,
            email:  req.body.email,
            password: hashPassword,
    
        })
        const newuser  = await user.save()
        res.status(200).json(newuser)
    } catch (error) {
        res.status(500).json(error)
        
    }
})

router.post('/login', async (req, res)=>{
    try {
        const  user = await User.findOne({email: req.body.email})
        !user && res.status(404).send("user not found")

        const  validPassword = bcrypt.compare(req.body.password, user.password)
        !validPassword && res.status(400).send("wrong password")

        res.status(200).json(user)
    } catch (error) {
        res.status(500).json(error)
    }

})
module.exports = router;