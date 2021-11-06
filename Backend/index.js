const express = require("express");
const ep = express();
const dotenv = require('dotenv')
const connection = require("./infraestrutura/conexao");
const User = require("./infraestrutura/tabelas");
const Produtos = require("./infraestrutura/tabelaProdutos");
const Categorias = require("./infraestrutura/tabelaCategorias");
const Carrinho = require("./infraestrutura/tabelaCart");
const bcrypt = require('bcrypt');
const cookieParser = require("cookie-parser");
var jwt = require('jsonwebtoken');
var cors = require('cors')
ep.use(cookieParser());
ep.use(cors({ origin: 'http://localhost:3000', credentials: true }));
connection.authenticate().then(() => {console.log("conectado ao mysql")}).catch((erro) =>{ console.log(erro)})
dotenv.config({path: './.env'});
ep.set('view engine', 'ejs');
ep.use(express.static('public'));
ep.use(express.urlencoded({extended: false}));
ep.use(express.json());

function verifyJWT (req, res, next){ 
    const token = req.cookies.access_token
    const chavePrivada = 'YOUR_SECRET_KEY';
    if (!token) 
        return res.status(401).send({ auth: false, message: 'Token não informado.' }); 
        jwt.verify(token, chavePrivada, (err, userJWT) => { 
        if (err)
            return res.status(500).clearCookie("access_token").send({ auth: false, message: 'Token inválido.' }); 
            User.findOne({ where: {id:userJWT.id}  }).catch((err) =>{console.log(err);}).then((e) =>{
                if(e.dataValues.token == token){
                    req.userJWT = userJWT;
                    if(e.dataValues.admin == 1){
                        req.userAdmin = true
                    }
                    next();  
                }else{
                    return res.status(500).clearCookie("access_token").send({ auth: false, message: 'Token inválido.' }); 
                } 
        });    
    }); 
}

ep.get("/user",verifyJWT, async (req, res) => {
    const id = (req.userJWT.id)
    const userWithCpf = await User.findOne({ where: {id}  }).catch((err) =>{console.log(err);});
    res.json({ message: {nome:userWithCpf.dataValues.nome,rua:userWithCpf.dataValues.rua,bairro: userWithCpf.dataValues.bairro,numero:  userWithCpf.dataValues.numero, cpf: userWithCpf.dataValues.cpf}});
    
})

ep.get("/product", async (req, res) => {
    const produtoCriado = await Produtos.findAll().catch((err) =>{console.log(err);});
    res.json(produtoCriado);
})

ep.post("/criarprod",verifyJWT,async (req, res) => {
    const {nomeProduto, valor, urlImg, descricao, quantidade, categoria} = req.body
    const userAdmin = (req.userAdmin)
    if(userAdmin){
        const produtoCriado = await Produtos.findOne({ where: {nomeProduto}  }).catch((err) =>{console.log(err);});


        if(produtoCriado){ 
            return res.json({ message: "Este produto ja existe!"})
        }
    
        else{
        await Produtos.create({ nomeProduto, valor, urlImg, descricao, quantidade, categoria});
            return res.json({nomeProduto,valor,descricao,quantidade,categoria})
        }
    }else{
        return res.json({ message: "Este produto ja existe!"})
    }
    
});

ep.post("/register",  async (req, res) => {
    const {nome, cpf, passwd, rua, bairro, numero} = req.body
    const userWithCpf = await User.findOne({ where: {cpf}  }).catch((err) =>{console.log(err);});

    if(userWithCpf){ 
        return res.json({ message: "Email ou usuiario ja existe!"})
    }

    else{
        let senha = await bcrypt.hash(passwd, 8);
        const resposta = await User.create({ nome, cpf, senha, rua, bairro, numero });
        const token = jwt.sign({ id: resposta.dataValues.id, role: "captain" }, "YOUR_SECRET_KEY", { expiresIn: '1h' });
        User.update({token: token},{where: {id:resposta.dataValues.id}});
        return res
        .cookie("access_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            expires: new Date(new Date().getTime() + 3600000)
          }).json({nome,rua,bairro,numero})
    }
});

ep.get('/logout', function(req, res) { 
    res.clearCookie("access_token")
    console.log("chegou no logout")
    return res.json("deslogado")
});

ep.post("/login", async (req, res) => {
    const {cpf,senha} = (req.body)
    const userWithCpf = await User.findOne({ where: {cpf}  }).catch((err) =>{console.log(err);});
    const password = await bcrypt.compare(senha, userWithCpf.senha);

    if (userWithCpf && password){
        const token = jwt.sign({ id: userWithCpf.dataValues.id, role: "captain" }, "YOUR_SECRET_KEY", { expiresIn: '1h' });
        User.update({token: token},{where: {id:userWithCpf.dataValues.id}});
        return res
          .cookie("access_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            expires: new Date(new Date().getTime() + 3600000)
          })
          .status(200)
          .json({message: userWithCpf})
        }
    else{
        return res
            .status(401).send('Login inválido!')
    }
  });

ep.post("/addcarrinho",verifyJWT, async (req, res) => {
    const id_usuario = (req.userJWT.id)
    const userAdmin = (req.userAdmin)
    const {id_produto,metodo} = (req.body)
    console.log(id_produto,id_usuario)
        let quantidade = 1
        console.log(id_produto, id_usuario, quantidade)
        const pesquisaCarrinho = await Carrinho.findOne({ where: {id_usuario,id_produto}  }).catch((err) =>{console.log(err);});
        console.log(pesquisaCarrinho,'a')
        if(!pesquisaCarrinho){
            try {
                await Carrinho.create({ id_produto, id_usuario, quantidade});
                const resp = await Carrinho.findAll({ where: {id_usuario}})
                res.json(resp);
            } catch (error) {
                console.log(error)
            }

        }else{
            if(metodo === true){
                let quantidade  = pesquisaCarrinho.dataValues.quantidade += 1
                try {
                    await Carrinho.update({quantidade},{where: {id_usuario,id_produto}});
                    const resp = await Carrinho.findAll({ where: {id_usuario}})
                    console.log(resp.dataValues)
                    return res.json(resp);
                } catch (error) {
                    return res.status(401).send('erro')
                }
            }
            else if (metodo === false){
                let quantidade  = pesquisaCarrinho.dataValues.quantidade -= 1
                try {
                    if(quantidade >= 0){
                        await Carrinho.update({quantidade},{where: {id_usuario,id_produto}});
                        const resp = await Carrinho.findAll({ where: {id_usuario}})
                        return res.json(resp);
                    }else{
                        await Carrinho.destroy({where: {id_usuario,id_produto}});
                        const resp = await Carrinho.findAll({ where: {id_usuario}})
                        return res.json(resp);
                    }

                } catch (error) {
                    return res.status(401).send('erro')
                }
            }
        
    }  
})

ep.get("/carrinho",verifyJWT, async (req, res) => {
    const id_usuario = (req.userJWT.id)
    const pesquisaCarrinho = await Carrinho.findAll({ where: {id_usuario:id_usuario}  });
    if(pesquisaCarrinho){
        res.json(pesquisaCarrinho);
    }})

ep.listen(5000)
