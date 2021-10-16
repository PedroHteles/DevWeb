import { IndexContext } from '../context/index'
import React from 'react';


function PageProdutos() {
    const {produtos} = React.useContext(IndexContext)

    return(
        <>
            {produtos?.map((e) =>{
            console.log(e)
                return(
                <div key={e.produtoId} className='teste1'>
                    <h1>{e.nomeProduto}</h1>
                    <h1>{e.descricaoProduto}</h1>
                    <h1 className="preco">{e.precoProduto}</h1>
                </div>
            )})}
        </>
    );
}
export default PageProdutos;