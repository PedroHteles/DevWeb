import "./style.css";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import React from 'react';
import {IndexContext} from '../../context/index'

function Cadastro() {
  let history = useHistory();
  const usuario = {
    nome:null,
    cpf:null,
    passwd:null,
    rua:null,
    bairro:null,
    numero:null
  }

  const {handleCadastro} = React.useContext(IndexContext)
  const [user, setUser] = React.useState(usuario)

  const enviaCadastro = async (event) => {
    event.preventDefault();
    handleCadastro(user)
  }

  return (
    <div className="login_body">
      <button onClick = {() => history.push("/")}>Cancelar</button>
      <div className="login_main">
        <form className="loginForm" onSubmit={enviaCadastro}>
          <input className="loginInput" name="nome" placeholder="Nome Completo" onChange={(e) => {setUser({...user,nome:e.target.value})}}  ></input>
          <input className="loginInput" name="cpf" placeholder="CPF" onChange={(e) => {setUser({...user,cpf:e.target.value})}} ></input>
          <input className="loginInput" type="password" name="senha" placeholder="Senha" onChange={(e) => {setUser({...user,passwd:e.target.value})}} ></input>
          <input className="loginInput" name="rua" placeholder="Rua" onChange={(e) => {setUser({...user,rua:e.target.value})}} ></input>
          <input className="loginInput" name="Bairro" placeholder="Bairro" onChange={(e) => {setUser({...user,bairro:e.target.value})}} ></input>
          <input className="loginInput" name="Numero" placeholder="Número" onChange={(e) => {setUser({...user,numero:e.target.value})}} ></input>
          <button to="/" className="login_entrar">
            Criar conta
          </button>
          <Link to="/login" className="cadastro">
            Voltar para o login
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Cadastro;
