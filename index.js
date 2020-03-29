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
mongoose.connect(config.v2ConnectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
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

app.use('/api/users', require('./routes/users'));
app.use('/api/posts', require('./routes/posts'));

app.listen(port, function () {
    console.log('http://localhost:', port)
});

module.exports = app;