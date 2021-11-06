import './style.css';
import React from 'react';
import {IndexContext} from '../../context/index'
import Card from "../Card/cardCarrinho";
function Produto() {
  const { product,select} = React.useContext(IndexContext);
  const productToShow = product ? product.filter(item => item?.categoria == select) : null
  console.log(productToShow)
    return (
      <>
      {(productToShow == null || productToShow.length == 0) && select != 0 ? <h2 className="nenhumProduto">Nenhum produto encontrado</h2> : 
      <div className="produtoMain">
        <Card className="cardProduto" produto={!select || select === '0' ? product : productToShow}/>
      </div>
    }
    </>
    )}
export default Produto;

