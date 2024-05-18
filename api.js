const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');
const config = require('config');
const helmet = require('helmet');
const morgan = require('morgan');
const Joi = require('joi');
const express = require('express');
const courses = require('./routes/courses');
const app = express();

app.set('view engine', 'pug');
app.set('views', './views'); //default value

app.use(express.json());
app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/api/courses', courses);

console.log('Application name: ' + config.get('name'));
console.log('Mail Server: ' + config.get('mail.host'));
// console.log('Mail Password: ' + config.get('mail.password'));


if( app.get('env') === 'development'){
    app.use(morgan('tiny'));
    startupDebugger('Morgan Enabled....');
}


//Dummy data of courses



// Handling GET request using express

app.get('/', (req, res) => {
    res.render('index', {title: "My Express App", message: "Please search for /api/courses."});
});


// Deining a port number and listning on that port

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Listning on port ${port}...`)
});