const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');

const app = express();



dotenv.config();
const MONGO_DB_URI = `mongodb+srv://chat-app-user:${process.env.DB_PASSWORD}@chat-app.dr1avgu.mongodb.net/?retryWrites=true&w=majority`
mongoose.connect(MONGO_DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to Mongo');
})
.catch( err => console.log(err));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

app.get('', (req, res) => {
    return res.send('Hello World');
});

app.get('/api/messages', (req, res) => {
    res.send(messages);
});


app.use('/api/users', userRoutes);



app.listen(8080, () => {
    console.log('Server started on port 8080');
});