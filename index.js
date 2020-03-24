const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

const port = process.env.PORT || config.serverPort;

// Set mongoose 'userFindAndModify' setting to false, so mongoose does not use this function.
mongoose.set('useFindAndModify', false);

// mongoose.connect('mongodb://localhost/' + config.dbName, {useNewUrlParser: true});
// if (process.env.NODE_ENV == 'testCloud' || process.env.NODE_ENV == 'production') {
mongoose.connect('mongodb://bestel:' + config.dbPassword + '@cluster0-shard-00-00-hvp0q.mongodb.net:27017,cluster0-shard-00-01-hvp0q.mongodb.net:27017,cluster0-shard-00-02-hvp0q.mongodb.net:27017/' + config.dbName + '?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true', {
    useNewUrlParser: true
})
// } else if (process.env.NODE_ENV !== 'test') {
//     mongoose.connect('mongodb://localhost/' + config.dbName, {
//         useNewUrlParser: true
//     })
// }

mongoose.connection
    .once('open', () => {
        console.log('Message:', 'The ' + config.dbName + ' database is connected');
    })
    .on('error', (error) => {
        console.warn('Warning', error);
    });

// Returns middleware that only parses urlencode bodies.
app.use(bodyParser.urlencoded({
    extended: true
}));

// Returns middleware that only parses json,
// and only looks at requests where the Content-Type header matches the type option.
app.use(bodyParser.json());

app.use(cors());
//
// app.use('/api', require('./routes/authentication'));
// app.use('/api/products', require('./routes/products'));
// app.use('/api/orders', require('./routes/order'));

module.exports = app;