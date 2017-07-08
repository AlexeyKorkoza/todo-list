const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nconf = require('./config');
const app = express();

const port = nconf.get('port');
app.set('port', (process.env.PORT || port));

app.use(bodyParser.json());

app.use(cors());

app.listen(app.get('port'));

module.export = app;