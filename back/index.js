
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const cors = require('cors');
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

const connection = require("./banco/banco");
connection.authenticate().then(() => {console.log("conectado ao mysql")}).catch((erro) =>{ console.log(erro)})
const User = require("./banco/users");


app.use(express.json());
app.use(cookieParser());


const middlewareValidarJWT = (req, res, next) => {
    const jwt = req.cookies.token
    console.log(jwt)
    const chavePrivada = 'secret';
    const jwtService = require("jsonwebtoken");
    jwtService.verify(jwt, chavePrivada, (err, userInfo) => {
        if (err) {
            res.status(403).end();
            return;
        }
        req.userInfo = userInfo;
        next();
    });
};

app.post('/login', async(req, res) => {
    const {user,passwd} = req.body
    const userWithEmail = await User.findOne({ where:{user}}).catch((err) =>{console.log(err) });

    if (userWithEmail) {
        const password = await bcrypt.compare(passwd, userWithEmail.senha);
        if(password === true){
            const users = await User.findOne({where:{user}}).catch((err) =>{console.log(err) });
            const userid = users.dataValues.user_id
            const tokenjwt = jwt.sign({user_id: userid},'secret',{expiresIn:'15s'});
            User.update({token: tokenjwt},{where: {user_id:userid}})
            res
                .status(202)
                .cookie('token', tokenjwt, {
                    sameSite: 'strict',
                    path: '/',
                    expires: new Date(new Date().getTime() + 15000),
                    httpOnly: true,
                }).send(users.dataValues)
        }else{
            res
                .status(401)
                .clearCookie("token").send('users.dataValues')
        }
    } 

});
app.get(
    "/user",
    middlewareValidarJWT,
    (req, res) => {
        console.log(req.userInfo)
        res.json(req.userInfo);
    }
);

app.listen(8080);