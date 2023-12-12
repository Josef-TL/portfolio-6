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
    password:"Tipsbladet!1997",
    database:"cafes"
});

app.get('/cafes',(req,res)=>{

    const q = "SELECT * FROM cafes";

    connection.query(q, (error, results)=>{
        res.send(results);
    })
});

    app.get('/signin', (req, res) => {
        res.sendFile(__dirname + '/index.html');
    });

app.get('/cafes/search',(req,res)=>{
    let queryParameterName = "";
    let queryParameterCity = "";

    if (req.query.cafename !== undefined) queryParameterName = req.query.cafename;
    if (req.query.cafecity !== undefined) queryParameterCity = req.query.cafecity;
    const q = "select *, business_hours.`day`, business_hours.open_time, business_hours.close_time from cafes inner join business_hours on cafes.cafe_id=business_hours.cafe_id WHERE (cafe_name LIKE ?) AND (location LIKE ?);";

    connection.query(q,[queryParameterName+"%",queryParameterCity+"%"], (error, results)=>{
        res.send(results);
    })
});



app.get('/users',(req,res)=>{
    let queryParameter = ""
    if (req.query.username !== undefined) queryParameter = req.query.username

    const q = "SELECT * FROM users WHERE (user_name LIKE ?)";
    connection.query(q,[queryParameter+"%"], (error, results)=>{
        res.send(results);
    })
});

app.get('/cafes/id/:id',(req,res)=>{
    const queryParameter = req.params.id;
    connection.query(`SELECT * FROM cafes WHERE cafe_id = ?`,[queryParameter], (error, results)=>{
        res.send(results);
    })
});

app.get('/cafes/hours',(req,res)=>{
    connection.query(`SELECT * FROM business_hours`, (error, results)=>{
        res.send(results);
    })
});

app.get('/users/id/:id',(req,res)=>{
    const queryParameter = req.params.id;
    connection.query(`SELECT * FROM users WHERE user_id = ?`,[queryParameter], (error, results)=>{
        res.send(results);
    })
});

    app.post('/favorites/user_id', (req, res) => {
        const user_id = req.body.id
        const cafe_id = req.body.id

connection.query('insert into favorites(user_id, cafe_id) VALUES(?,?)',
    [user_id, cafe_id],
    (error, result) =>{
    res.send("Successful POST request")
    }
    )})

app.post('/cafes/new',(req,res)=>{

    const name = req.body.cafe_name
    const loc  = req.body.location
    const cost = req.body.cost
    const wifi = req.body.wifi
    const noise = req.body.noise
    const food = req.body.food
    const group  = req.body.group
    const gluten  = req.body.gluten
    const veg  = req.body.veg
    const pet = req.body.pet


    connection.query('insert into cafes(cafe_name, location, cost, wifi, noise, food, `group`, gluten, vegetarian, pets) VALUES(?,?,?,?,?,?,?,?,?,?)',
        [name,loc,cost,wifi,noise,food,group,gluten,veg,pet],
        (error,result)=>{
            res.send("Successful POST request");
        });
});

app.post('/users/new',(req,res)=>{

    const user = req.body.user_id;
    const uName =  req.body.uName;
    const fName =  req.body.fName;
    const lName =  req.body.lName;
    const email =  req.body.email;

    // Dette er opgave A
    connection.query('INSERT INTO users(user_id,user_name,first_name,last_name,email)  VALUES(?,?,?,?,?)',
        [user,uName,fName,lName,email],
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

app.get('/favorites/user_id/:id', (req, res) => {
    const userId = req.parms.id;

    connection.query(
        'SELECT cafes.cafe_name FROm favorites INNER JOIN cafes on favorites.cafe_id = cafes.cafe_id WHERE favorites.user_id = ?'
            [userId],
        (error, results) => {
            if (error) {
                console.error("Error fetching user's favorite cafes:", error);
                res.status(500).json([]);
            } else {
                res.status(200).json(results);
            }
        }
    )
})