import "./style.scss";
import { useHistory } from "react-router-dom";
import React from 'react';
import {IndexContext} from '../../../context/index'

function AdmProdutos() {
  let history = useHistory();
  const produto = {
    nomeProduto:null,
    valor:null,
    urlImg:null,
    descricao:null,
    quantidade:null,
    categoria:null,
  }

  const {handleProduto} = React.useContext(IndexContext)

  const [produtos, setProdutos] = React.useState(produto)

  const enviaProduto = async (event) => {
    event.preventDefault();
    handleProduto(produtos)
  }

  return (
    <div className="login_body">
      <button onClick = {() => history.push("/")}>Cancelar</button>
      <div className="login_main">
        <form className="loginForm" onSubmit={enviaProduto}>
          <input className="loginInput" name="nomeProduto" placeholder="Nome do Produto" onChange={(e) => {setProdutos({...produtos,nomeProduto:e.target.value})}}  ></input>
          <input className="loginInput" name="valor" placeholder="Valor" onChange={(e) => {setProdutos({...produtos,valor:e.target.value})}} ></input>
          <input className="loginInput" name="urmImg" placeholder="URL da Imagem" onChange={(e) => {setProdutos({...produtos,urlImg:e.target.value})}} ></input>
          <input className="loginInput" name="descricao" placeholder="Descrição" onChange={(e) => {setProdutos({...produtos,descricao:e.target.value})}} ></input>
          <input className="loginInput" name="quantidade" placeholder="Quantidade" onChange={(e) => {setProdutos({...produtos,quantidade:e.target.value})}} ></input>
          <input className="loginInput" name="categoria" placeholder="Categoria" onChange={(e) => {setProdutos({...produtos,categoria:e.target.value})}} ></input>
          <button to="/" className="login_entrar">
            Criar produto
          </button>
        </form>

      </div>
    </div>
  );
}

export default AdmProdutos;
