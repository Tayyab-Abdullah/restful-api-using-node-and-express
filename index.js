const Joi = require('joi');
const express = require('express');
const app = express();
const genres = require('./routes/genres');
const courses = require('./routes/courses');

app.use('/api/genres', genres);
app.use('/api/courses', courses);
app.use(express.json());



const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));