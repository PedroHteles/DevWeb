import React from 'react';
import "../login/style.css";
import CancelIcon from '@mui/icons-material/Cancel';
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import {IndexContext} from '../../context/index'


function Login() {
  let history = useHistory();
  const  [ senha, setSenha] = useState('');
  const  [cpf , setCpf]  = useState('');

  const { logado, handleLogin } = React.useContext(IndexContext);
  

  const enviaForm = async (event) => {
    event.preventDefault();
    const dados = ({cpf,senha})
    handleLogin(dados)

  }

  return (
    <div className="login_body">
      <Button color="inherit" onClick = {() => history.push("/")}><CancelIcon color="success"/></Button>
      <div className="login_main">
        <h1 className="login_title"> Compre Arcom </h1>
        <form className="loginForm" onSubmit={enviaForm}>
          <input name="usuario" className="loginInput" onChange={(e) => setCpf(e.target.value) } placeholder="CPF"></input>
          <input name="senha" className="loginInput" onChange={(e) =>  setSenha(e.target.value)} type="password" placeholder="Senha"></input>
          <button type="submit" variant="contained" color="success" className="login_entrar">Entrar</button>
          <Link to="/register" className="cadastro">
            Cadastre-se
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Login;
