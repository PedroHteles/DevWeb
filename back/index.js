const express = require("express");
const ep = express();
const dotenv = require('dotenv')
const connection = require("./banco/banco");
const User = require("./banco/users");
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

connection.authenticate().then(() => {console.log("conectado ao mysql")}).catch((erro) =>{ console.log(erro)})
dotenv.config({path: './.env'});
ep.set('view engine', 'ejs');
ep.use(express.static('public'));
ep.use(express.urlencoded({extended: false}));
ep.use(express.json());

ep.post("/auth/register",  async (req, res) => {
    const {user, password, passwordConfirm} = req.body
    const userWithEmail = await User.findOne({ where: {user}  }).catch((err) =>{console.log(err);});

    if(userWithEmail){ 
        return res.json({ message: "Email ou usuiario ja existe!"})
    }

    if (password == passwordConfirm){
        let senha = await bcrypt.hash(password, 8);
        const newUser = new User({user,senha});
        
        const savedUser = await newUser.save().catch((err) =>{
            console.log(err);
            res.json({ error : "nao foi"});
        })
        
        if(savedUser){
            const userid = savedUser.dataValues.user_id
            const tokenjwt = jwt.sign({token: userid}, 'secret', { expiresIn: '1h' });
            User.update({token: tokenjwt},{where: {user_id:savedUser.dataValues.user_id}});
            console.log(savedUser.dataValues.user_id,tokenjwt)   ;
            res.json({message: "foi"});
        } 
    }else{
        res.json({message: "Senhas erradas!"}),401 
    }
})

ep.post("/login",  async (req, res) => {
    const {user} = req.body

    const userWithEmail = await User.findOne({ where:{user}}).catch((err) =>{console.log(err) });
    
    if(!userWithEmail){ return res.json({ message: "Email ou usuiario ja existe!"}) }

    if (userWithEmail) {
        const password = await bcrypt.compare(req.body.password, userWithEmail.senha);
        if(password === true){
            const users = await User.findOne({where:{user}}).catch((err) =>{console.log(err) });
            const userid = users.dataValues.user_id
            const tokenjwt = jwt.sign({token: userid},'secret',{expiresIn:'1h'});
            User.update({token: tokenjwt},{where: {user_id:userid}})
            res.json({ token: tokenjwt})
        }
        else{
            res.json({message:"Credencias incorretas"}),401
        }
    } 
})

ep.listen(8080 , () => {console.log('servidor aqui na porta http://127.0.0.1:8080/')});


// console.log(users.dataValues.id)
// try {
//     const token = 'hBFyk1hqQLxO3n3iz50Ivlh_5u1HrB_tCWbDdTaQo'
//     var decoded = jwt.verify(token, 'secret');
//     console.log(decoded) 
// } catch (error) {
//     console.log('token invalido')
// }