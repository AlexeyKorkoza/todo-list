const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const flash = require('connect-flash');
const expressSession = require('express-session');
const nconf = require('./config');
const tables = require('./create_tables');
const routes = require('./routes');
const passport = require('passport');
const app = express();

const port = nconf.get('port');
app.set('port', (process.env.PORT || port));

tables.create_tables();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extend: false
}));

app.use(morgan('dev'));
app.use(cors());

app.use(passport.initialize());
app.use(passport.session());
app.use(expressSession({
    secret: 'keyboard cat'
}));
app.use(flash());

require('./passport/passport')(passport);

app.use('/', routes);

app.listen(app.get('port'));

module.export = app;