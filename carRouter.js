const express = require('express');

const router = express.Router();

const db = require('./data/db-config');

router.get('/', async (req,res)=>{
    try {
        let cars = await db('cars');
        res.status(200).json(cars)
    }
    catch (error){
        res.status(500).json({message: `Error occurred retrieving cars ${error}`})
    }
})

router.get('/:id', [validateId], (req,res)=>{
    res.status(200).json(req.car)
})

router.post('/', [validateBody], async (req,res) => {
    try{
        let {VIN, make, model, mileage, transmission_type, status} = req.body;
        let result = await db('cars').insert({VIN, make, model, mileage, transmission_type, status})
        res.status(201).json({message: `Car with id ${result} was created`})
    }
    catch (error){
        res.status(500).json({message: 'An error occurred saving car to db'})
    }
})

router.put('/:id', [validateId,validateBody], async(req,res) => {
    try{
        const id = req.params.id;
        let {VIN, make, model, mileage, transmission_type, status} = req.body;
        let result = await db('cars').where({id: id}).update({VIN, make, model, mileage, transmission_type, status})
        res.status(200).json({message: `${result} row(s) updated`})
    }
    catch(error){
        res.status(500).json({message: `error occurred during update ${error}`})
    }
})

router.delete('/:id', [validateId], async (req,res) => {
    try{
        const id = req.params.id;
        let result = await db('cars').where({id: id}).del()
        res.status(200).json({message: `${result} row(s) deleted`})
    }
    catch(error){
        res.status(500).json({message: `error occurred during delete ${error}`})
    }
    
})

function validateBody(req,res,next){
    if(Object.keys(req.body).length > 0){
        if(req.body.VIN && req.body.make && req.body.model && req.body.mileage){
            next();
        }
        else {
            res.status(400).json({message: 'Missing required VIN, make, model or mileage'})
        }
    } else {
        res.status(400).json({message: 'Missing Car data'})
    }
}

function validateId(req,res,next){
    const id = req.params.id;

    if(parseInt(id)> 0){
        db('cars').where({id: id})
            .then(car => {
                if(car.length > 0){
                    req.car = car
                    next()
                }
                else {
                    res.status(404).json({message: 'car with specified ID could not be retrieved'})
                }
            })
            .catch()
    } else {
        res.status(400).json({message: 'invalid id'})
    }
}

module.exports = router;