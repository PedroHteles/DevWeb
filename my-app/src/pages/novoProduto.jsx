import React from 'react';
import { IndexContext } from '../context/index'

function Novoproduto() {
  const {enviaFormNewProduto} = React.useContext(IndexContext);
  const[nomeProduto,setNomeProduto] = React.useState('');
  const[precoProduto,setPrecoProDuto] = React.useState('');
  const[descricaoProduto,setDescricaoProduto] = React.useState('');

	return (
    <div className="App">
      <header className="App-header">
      <form onSubmit={(e) => {
        e.preventDefault()
        const dados = {nomeProduto,precoProduto,descricaoProduto}
        enviaFormNewProduto(dados)}}>
            <input type='text' required value={nomeProduto} onChange={(e) => setNomeProduto(e.target.value)}></input>
            <input type='text' required value={precoProduto} onChange={(e) => setPrecoProDuto(e.target.value)}></input>
            <input type='text' required value={descricaoProduto} onChange={(e) => setDescricaoProduto(e.target.value)}></input>
            <input type='submit'></input>
            <h1>a</h1>
        </form>
      </header>
    </div>
	);
}

export default Novoproduto;