
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import {config} from 'dotenv';
import {connect, ConnectOptions} from 'mongoose';
const userRoutes = require('./routes/userRoutes');

const app = express();


config();
const MONGO_DB_URI = `mongodb+srv://chat-app-user:${process.env.DB_PASSWORD}@chat-app.dr1avgu.mongodb.net/?retryWrites=true&w=majority`
connect(MONGO_DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
} as ConnectOptions).then(() => {
    console.log('Connected to Mongo');
})
.catch( err => console.log(err));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

app.get('', (req, res) => {
    return res.send('Hello World');
});



app.use('/api/users', userRoutes);



app.listen(8080, () => {
    console.log('Server started on port 8080');
});