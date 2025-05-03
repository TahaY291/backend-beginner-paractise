const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')
const Unit = require('./models/Unit')

dotenv.config()
const app = express()
const port = 5000;

app.use(express.json())
app.use(cors())

mongoose.connect('mongodb://127.0.0.1:27017/unitConverter')
    .then(() => console.log('mongodb Connected'))
    .catch((err) => console.log('here  is the error', err))

app.post('/', async (req, res) => {
    try {
        const { value, from, to, type } = req.body;
        function convert(value, from, to, type) {
            value = parseFloat(value);

            if (type === 'temperature') {
                if (from === 'Celsius' && to === 'Fahrenheit') {
                    return (value * 9 / 5) + 32;
                }
                if (from === 'Fahrenheit' && to === 'Celsius') {
                    return (value - 32) * 5 / 9;
                }
                if (from === 'Celsius' && to === 'Kelvin') {
                    return value + 273.15;
                }
                if (from === 'Kelvin' && to === 'Celsius') {
                    return value - 273.15;
                }
                if (from === 'Fahrenheit' && to === 'Kelvin') {
                    return ((value - 32) * 5 / 9) + 273.15;
                }
                if (from === 'Kelvin' && to === 'Fahrenheit') {
                    return ((value - 273.15) * 9 / 5) + 32;
                }
                if (from === to) {
                    return value; // no conversion needed
                }
            
                throw new Error(`Invalid temperature conversion from ${from} to ${to}`);
            }else if (type === 'length') {
                const units = {
                    millimeter: 0.001,
                    centimeter: 0.01,
                    meter: 1,
                    kilometer: 1000,
                    inch: 0.0254,
                    foot: 0.3048,
                    yard: 0.9144,
                    mile: 1609.34
                };
            
                if (!units[from] || !units[to]) {
                    throw new Error(`Invalid length units: from ${from} to ${to}`);
                }
            
                if (from === to) {
                    return value;
                }
            
                const valueInMeters = value * units[from];
            
                const result = valueInMeters / units[to];
            
                return result;
            }else if (type === 'weight') {
                const units = {
                    milligram: 0.001,
                    gram: 1,
                    kilogram: 1000,
                    ounce: 28.3495,
                    pound: 453.592
                };
            
                if (!units[from] || !units[to]) {
                    throw new Error(`Invalid weight units: from ${from} to ${to}`);
                }
            
                if (from === to) {
                    return value;
                }
            
                const valueInGrams = value * units[from];
            
                const result = valueInGrams / units[to];
            
                return result;
            }else{
                return 'type is not correct'
            }
            
            
        }
        const result = convert(value, from, to, type)
        const answer = new Unit({
            value,
            from,
            to,
            type,
            result
        })
        const newAnswer = await answer.save()
        res.status(200).json(newAnswer)
    } catch (error) {
        res.status(500).json(error)
    }
})

app.delete('/:id', async (req,res)=>{
    try {
        await Unit.findByIdAndDelete(req.params.id)
        res.status(200).json("The  data is deletd  successfuly")
    } catch (error) {
        res.status(500).json(error)
    }
})


app.listen(port, () => {
    console.log("The server is running  on localhost://5000")
})