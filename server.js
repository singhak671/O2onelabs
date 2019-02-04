const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const port = process.env.port || 8000;

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cors());

app.use('/api/v1', require('./routes/userRoute'));

mongoose.connect('mongodb://localhost/o2onelabs', (err, connect) => {
    if (err) {
        console.log('Db not connected !!')
    } else {
        console.log('Db connected');
    }
})

app.listen(port, () => {
    console.log(`server is running at http://127.0.0.1:${port}`);
})