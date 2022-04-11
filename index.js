const express = require("express");
const app = express();
const fetch = require("node-fetch");
const Database = require("nego.db");
const db = new Database.Json("./links.json")
const path = require('path');
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.set('view engine', 'ejs');

let up = db.fetch(`link`);
setInterval(() =>{
   up.forEach(x => {
  fetch(x.link)
    .then(res => res.text())
    .then(text => console.log(text));
   })
}, 5000) 
app.use(bodyParser())
app.get('/', function(req, res) {
  res.render(path.join(__dirname, './public/index.ejs'));
});
app.post('/post', jsonParser, function (req, res) {
  db.push("link", req.body)
  res.redirect('back');
});
app.listen(3000)
