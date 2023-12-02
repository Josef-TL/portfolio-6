const express = require('express');
const cors = require('cors');
const db = require('mysql2');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const connection = db.createConnection({
    host:"localhost",
    user:"root",
    password:"c@_@*u-YGTKcxrc4Fp!6",
    database:"cafes"
});

app.get('/cafes',(req,res)=>{
    const queryParameter = req.query.type;
    const q = "SELECT * FROM cafes";
    connection.query(q, (error, results)=>{
        res.send(results);
    })
});

app.get('/users',(req,res)=>{
    const queryParameter = req.query.type;
    const q = "SELECT * FROM users";
    connection.query(q, (error, results)=>{
        res.send(results);
    })
});

app.post('cafes/new',(req,res)=>{
    const id = req.body.name;
    const name = req.body.primary;


    // Dette er opgave A
    connection.query('INSERT INTO cafes(cafe_id,cafe_name) VALUES(?,?)',
        [id,name],
        (error,result)=>{
            res.send("Successful POST request");
        });
});

app.post('users/new',(req,res)=>{
    const id = req.body.name;
    const name = req.body.primary;


    // Dette er opgave A
    connection.query('INSERT INTO cafes(cafe_id,cafe_name) VALUES(?,?)',
        [id,name],
        (error,result)=>{
            res.send("Successful POST request");
        });
});

app.get('*',(req,res) =>{
    res.sendStatus(404);
});

app.listen(port, ()=>{
    console.log("Hey guys we are officially LIVE !!!!");
});