const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

app.use(express.static('public'));
var cors = require('cors')


app.use(cookieParser());
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//Routes
app.use(require('./routes'));  //http://127.0.0.1:8000/    http://127.0.0.1:8000/about

//app.use("/user",require('./routes'));  //http://127.0.0.1:8000/user  http://127.0.0.1:8000/user/about

const server = app.listen(5000, function () {
  var host = server.address().address
  var port = server.address().port
  console.log(`App listening at http://localhost:${port}/`)
})
const connection = require("./infraestrutura/conexao");



connection.authenticate().then(() => {console.log("Conectado ao mysql")}).catch((erro) =>{ console.log(erro)})
