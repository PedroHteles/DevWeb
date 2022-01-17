import './style.css';
import React from 'react';
import {IndexContext} from '../../context/index'
import Card from "../Card/cardCarrinho";
function Produto() {
  const { product,select} = React.useContext(IndexContext);
  try {
    const productToShow = product ? product.filter(item => item?.categoria == select) : null
    return (
      <>
      {(productToShow == null || productToShow.length == 0) && select != 0 ? <h2 className="nenhumProduto">Nenhum produto encontrado</h2> : 
      <div className="produtoMain">
        <Card className="cardProduto" produto={!select || select === '0' ? product : productToShow}/>
      </div>
    }
    </>
    )
  } catch (error) {
    console.log(error)
    return (
      <div className="produtoMain">
      </div>
    )
  }

  }
export default Produto;

