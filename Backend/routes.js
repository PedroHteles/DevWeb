var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = require("./infraestrutura/tabelaUsers");
const Produtos = require("./infraestrutura/tabelaProdutos");
const Categorias = require("./infraestrutura/tabelaCategorias");
const Carrinho = require("./infraestrutura/tabelaCarts");

//Middle ware that is specific to this router
router.use(function timeLog(req, res, next) {
  let date_ob = new Date();
  // console.log('Time: ', date_ob.getDate(),date_ob.getMonth(),date_ob.getFullYear(), date_ob.getHours(),date_ob.getMinutes(),date_ob.getSeconds());
  const token = req.cookies.access_token
  if(token){
    jwt.verify(token, 'YOUR_SECRET_KEY', (error, userJWT) => {   
      if (error){
        return res.status(500).clearCookie("access_token").send({ auth: false, message: 'Token inválido/User Sem Token' });
      }else{
        req.userJWT = userJWT;
        next();
      }
    })
  }
  else{
    next();
  }
});

// Define the home page route
router.get('/', function(req, res) {
  res.send('home page');
});

router.post("/register",  async (req, res) => {
  const {eMail, passwd} = req.body
  const user = await User.findOne({ where: {eMail}  }).catch((err) =>{console.log(err)});

  if(user){ 
    return res.json({ message: "Email ou usuiario ja existe!"})
  }else{
    let senha = await bcrypt.hash(passwd, 8);
    const resposta = await User.create({ eMail, senha });

    const token = jwt.sign({ id: resposta.dataValues.id, eMail:resposta.dataValues.eMail ,role:"captain" }, "YOUR_SECRET_KEY", { expiresIn: '1h' });
    User.update({token: token},{where: {id:resposta.dataValues.id}});
    return res
    .cookie("access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        expires: new Date(new Date().getTime() + 3600000)
      })
    .json({eMail})
  }
});

router.post("/login", async (req, res) => {
    const {eMail,passwd} = (req.body)
    console.log(eMail,passwd)

    const user = await User.findOne({ where: {eMail}  }).catch((err) =>{console.log(err)});
    const password = await bcrypt.compare(passwd, user.senha);

    if(user && password){
      const token = jwt.sign({ id: user.dataValues.id, eMail:user.dataValues.eMail ,role:"captain" }, "YOUR_SECRET_KEY", { expiresIn: '1h' });
      User.update({token: token},{where: {id:user.dataValues.id}});
      console.log('testelogin')
      return res
      .cookie("access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        expires: new Date(new Date().getTime() + 3600000)
      })
      .status(200)
      .json({message: user.nome, email:user.eMail})
    }
  else{
    return res.status(401).send('Login inválido!')
  }
 });

router.get('/user', async function(req, res) {
  const eMail = (req.userJWT.eMail)
  const user = await User.findOne({ where: {eMail}  }).catch((err) =>{console.log(err)});
  res.json({message: user.dataValues.nome, email:user.dataValues.eMail})
});

router.get('/products', async function (req, res) {
  const produtoCriado = await Produtos.findAll().catch((err) =>{console.log(err);});
  res.json(produtoCriado);
});

router.post('/criarprod',async (req, res) => {
  const {nomeProduto, valor, urlImg, descricao, quantidade, categoria} = req.body
  eMail = req.userJWT.eMail
  const user = await User.findOne({ where: {eMail}  }).catch((err) =>{console.log(err);});

  try {
    if (user.dataValues.admin == 1){
      const produtoCriado = await Produtos.findOne({ where: {nomeProduto} }).catch((err) =>{console.log(err)});
      if(!produtoCriado){
        await Produtos.create({ nomeProduto, valor, urlImg, descricao, quantidade, categoria});
        return res.status(200).send('Criado ok');
      }else{
        return res.json({ message: "Este produto ja existe!"})
      }
    }else{
      return res.send(`o usuario ${user.dataValues.eMail} nao possui permissao!`) 
    }
  } catch (error) {
    console.log('teste')
  }
});

router.get("/carrinho", async (req, res) => {
  const id_usuario = (req.userJWT.eMail)
  const pesquisaCarrinho = await Carrinho.findAll({ where: {id_usuario:id_usuario}  });
  if(pesquisaCarrinho){
      res.json(pesquisaCarrinho);
  }})
module.exports = router;