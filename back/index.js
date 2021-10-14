
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const cors = require('cors');
const bcrypt = require('bcrypt');
const connection = require("./banco/banco");

const User = require("./banco/users");
const Produto = require("./banco/produtos");
var jwt = require('jsonwebtoken');
connection.authenticate().then(() => {console.log("conectado ao mysql")}).catch((erro) =>{ console.log(erro)})

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));


const middlewareValidarJWT = (req, res, next) => {
    const jwt = req.cookies.token
    const chavePrivada = 'secret';
    const jwtService = require("jsonwebtoken");
    jwtService.verify(jwt, chavePrivada, (err, userInfo) => {
        if (err) {
            res
                .status(403)
                .clearCookie("token")
                .end();
            return;
        }
        req.userInfo = userInfo;
        next();
    });
};

app.post('/login', async(req, res) => {
    const {user,passwd} = req.body
    const userWithEmail = await User.findOne({where:{user}}).catch((err) =>{console.log(err) });

    if (userWithEmail) {
        const password = await bcrypt.compare(passwd, userWithEmail.senha);
        if(password === true){
            const users = await User.findOne({where:{user}}).catch((err) =>{console.log(err) });
            const userid = users.dataValues.user_id
            const tokenjwt = jwt.sign({user_id: userid},'secret',{expiresIn:'1h'});
            User.update({token: tokenjwt},{where:{user_id:userid}})
            res
                .status(202)
                .cookie('token', tokenjwt, {
                    sameSite: 'strict',
                    path: '/',
                    expires: new Date(new Date().getTime() + 3600000),
                    httpOnly: true,
                }).send(users.dataValues)
        }else{
            res
                .status(401)
                .clearCookie("token").send('users.dataValues')
        }
    } 

});


app.post("/novoproduto",middlewareValidarJWT,  async (req, res) => {
    const {nomeProduto,precoProduto,descricaoProduto} = req.body
    const pesquisaProduto = await User.findOne({where:{nomeProduto}}).catch((err) =>{console.log(err);});

    if(pesquisaProduto){ 
        return res.json({message:"Produto ja existe!"})
    }

    const newProduto = new Produto({nomeProduto,precoProduto,descricaoProduto}); 
    const savedProduto = await newProduto.save().catch((err) =>{
        console.log(err);
        res.json({ error : "nao foi"});
    })
 
    if(savedProduto){
        res.json({message: "foi"});
    } 
 
})



app.get(
    "/produtos",
    middlewareValidarJWT,
    async (req, res) => {
        const produtos = await Produto.findAll();
        res.json(produtos);
    }
);

app.listen(8080);