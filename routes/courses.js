const express = require('express');
const router = express.Router();

const courses = [
    { id: 1, name: 'course1'},
    { id: 2, name: 'course2'},
    { id: 3, name: 'course3'},
];



router.get('/', (req, res) => {
    res.send(courses);
});

router.get('/:id', (req, res) =>{
    const course = courses.find( c => c.id == parseInt(req.params.id));
    if(!course) res.status(404).send('The course with given id is not found');
    res.send(course);
});

// Handling POST request using express

router.post('/', (req, res) => {

    const schema = {
        name: Joi.string().min(3).required()
    };

    const result = Joi.validate(req.body, schema);
    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    }

    const course = {
        id: courses.length+1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

// Handling PUT request

router.put('/:id', (req, res) => {
    const course = courses.find( c => c.id == parseInt(req.params.id));

    const schema = {
        name: Joi.string().min(3).required()
    };

    const result = Joi.validate(req.body, schema);
    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    }

    if(!course){
        res.status(404).send('The course with given id is not found');
        return;  
    } 

    if(course){
        course.name = req.body.name;
    }

    res.send(course);
})


// Handling Delete method request

router.delete('/:id', (req,res) => {
    const course = courses.find( c => c.id == parseInt(req.params.id));
    if(!course){
        res.status(404).send('The course with given id is not found');
        return;  
    } 

    const index = courses.indexOf(course);
    courses.splice(index, 1);


    res.send(course);
})

module.exports = router;