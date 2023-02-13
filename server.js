const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const userRoutes = require('./routes/Users');

const app = express()
const port = process.env.PORT || 5050

app.use(cors())
app.use(express.json());

const uri = "mongodb+srv://test:test123@cluster0.hi7zdj7.mongodb.net/?retryWrites=true&w=majority";

const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

mongoose.connect(uri, connectionParams)
.then(() => {
    console.log("Connected to db");
}).catch(err => {
    console.log("Error while connecting to mongodb: ", err);
})

app.use('/users', userRoutes);

app.listen(port, () => {
    console.log("app is listening on", port);
})