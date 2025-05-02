const express =  require('express')
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const helmet =  require('helmet')
const  morgan  = require('morgan')
const userRoute = require('./routes/user')
const authRoute = require('./routes/auth')
const postRoute = require('./routes/posts')
const app = express()
dotenv.config()

const PORT = process.env.PORT || 8800;

console.log("MONGO_URI is:", process.env.MONGO_URI);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

app.use(express.json())
app.use(helmet())
app.use(morgan("common"))


app.use('/api/users', userRoute)
app.use('/api/auth', authRoute)
app.use('/api/posts', postRoute)
  
// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});