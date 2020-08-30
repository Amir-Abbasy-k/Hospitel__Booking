const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
app.use(cors());

const port = process.env.PORT || 4000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Create connection
const db = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'booking'
});

// Connect
db.connect((err) => {
  if(err){
      throw err;
  }
  console.log('MySql Connected...');
});


app.get('/', (req, res)=>{
    res.send('Hospitewl')
})




app.get('/book', (req, res) => {
    const {name, age, place, phone,tocken} = req.query
    let post = {name: name, age: age, place: place, phone: phone, tockenNum: tocken};
    let sql = 'INSERT INTO book SET ?';
    let query = db.query(sql, post, (err, result) => {
        if(err) throw err;
        console.log(result);
    });
    givetocken(tocken)
  });

function givetocken(tocken){
const sql = `UPDATE hospitel SET tocken='${tocken}'`; 
db.query(sql, (err, results) => {
    if(err){ return console.log( err + 'Tocken error');}
    else { return console.log( results + 'Tocken Updated');}
    })
}





app.get('/getStatus', (req, res)=>{
    const sql = `SELECT tocken FROM hospitel`;
    db.query(sql, (err, results) => {
    if(err){ return res.send(err) }
    else { return res.json({data: results})}
    })
})




app.get('/getList', (req, res)=>{
const sql = `SELECT * FROM book`;
db.query(sql, (err, results)=>{
    if(err){return res.send(err)}
    else {return res.json({data: results})}
})
})



app.get('/checkOut', (req, res) => {
  const {id} = req.query
  let sql = `DELETE from book WHERE id=${id}`;
  let query = db.query(sql, (err, result) => {
      if(err) throw err;
      console.log(result);
      res.send('Tocken successfully checkouted...');
  });
});




app.listen(port, () => console.log(`Listening on port ${port}`));