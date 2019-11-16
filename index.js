/*
const http = require('http');

const server = http.createServer((req, res)=>{
    res.status = 200;
    res.setHeader('Content-type','text/plain');
    res.end('Hello world')
});

server.listen(3000, ()=>{
    console.log("Server on port 3000");
});
*/


const express = require("express");
const colors = require("colors");
const morgan = require("morgan")

const app = express();


// settings
app.set('appName', 'Fazt express tutorial');
app.set('port',5000);
app.set('view engine', 'ejs');


// Midleware se ejecutan antes de las rutas
// importante para reconocer json post
app.use(express.json());
app.use(morgan('dev'));


// Routes
app.get('/', (req, res) => {
    const users = [{name: 'jhon'}, {name: 'joe'}, {name: 'cameron'}, {name: 'ryan'}];
    res.render('index.ejs',{users:users});
});

app.all('/user', (req, res, next)=>{
    console.log("Por aqui paso");
    next();
});

app.get('/user', (req, res) => {
    res.json({
        username : "Cameron",
        lastname : "Howe"
    });
});

app.post('/user', (req, res) => {
    console.log(req.body); // app.use express json
    res.send("POST REQUEST RECEIVED");
});

app.post('/user/:id', (req, res) => {
    console.log(req.body);
    console.log(req.params);
    res.send("POST REQUEST RECEIVED");
});

app.delete('/user/:id',(req, res) =>{
    res.send(`User ${req.params.id} was deleted`);
});

app.put('/contact', (req, res) => {
    res.send("PUT REQUEST RECEIVED");
});

app.delete('/test', (req, res) => {
    res.send("DELETE REQUEST RECEIVED");
});


app.use(express.static('public'));

app.listen(app.get('port'), () => {
    console.log(app.get('appName'));
    console.log(`Server on port ${app.get('port')}`.blue);
});
