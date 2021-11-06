import './style.css';
import Header from "../../components/Header/Header";
import React from 'react';
import Card from '../../components/Card/cardCarrinho'

function ProdutoMain(props) {
  
    return (
      <>
      <Header/>
        <div className="cardCarrinho3">
        <img className="produtoImg" src={props?.location?.state?.msg.urlImg}></img>
        <div className="fixed">
          <h2 className="title"> {props?.location?.state?.msg.nomeProduto} </h2>
          <h2 className="detalhes"> {props?.location?.state?.msg.descricao} </h2>
          <div className="preco">
            <h2>R${props?.location?.state?.msg.valor} </h2>
          </div>
          <button className="adicionarCarrinho">
            Adicionar ao carrinho
          </button>
          </div>
        </div>
      <Card/>
      </>
    )
}

export default ProdutoMain;
