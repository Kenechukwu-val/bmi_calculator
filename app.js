const express = require("express");

const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('', (req, res, next) => {
    const height = req.body.height;
    const weight = req.body.weight;

    const heightInMs = height/100;
    const bmi = weight/(heightInMs*heightInMs);

    let message = "";

    if (height%1==0 && weight%1==0) {
        if ( bmi < 18.5) {
            message = "You are underweight"
        }
        else if ( bmi >= 18.5 && bmi <= 24.9 ) {
            message = "You have a normal weight"
        }
        else if ( bmi > 24.9 && bmi <= 29.9 ) {
            message = "You are overweight"
        }
        else {
            message = "You are obese"
        }
        res.status(200).json({
            bmi: bmi.toFixed(2),
            message: message
        })
    } else {
        res.status(400).json({
            message: "Enter valid Inputs"
        })
    }
})




app.listen(3000, () =>{
    console.log('Starting app');
})