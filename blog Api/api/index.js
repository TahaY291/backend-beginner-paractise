const express = require("express")
const app = express()
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const authRoute = require('./routes/auth')
const userRoute = require('./routes/users')
const postRoute = require('./routes/posts')
const CategoryRoute = require('./routes/categories')
const multer = require('multer')
dotenv.config()

app.use(express.json())
app.use("/images", express.static(path.join(__dirname, "/images")));


mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("mongo is  connected"))
    .catch((err) => console.log(err))

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images");
    },
    filename: (req, file, cb) => {
        cb(null, "hello");
    },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
    res.status(200).json("File has been uploaded");
});


app.use('/api/auth', authRoute)
app.use('/api/users', userRoute)
app.use('/api/posts', postRoute)
app.use('/api/categories', CategoryRoute)

app.listen(5000, () => {
    console.log("the server is  running on the port 5000")
})