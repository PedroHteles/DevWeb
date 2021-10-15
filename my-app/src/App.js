import React from 'react';
import Pagelogin from './pages/login'
import Novoproduto from './pages/novoProduto'
import FormControl from '@material-ui/core/FormControl';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

import {IndexContext} from './context/index'
import './index.css'
function App() {
  // const[ pesquisa , setPesquise] = React.useState([]);
  const {produtos} = React.useContext(IndexContext)


  console.log(produtos)

	return (
    <>
    <div className="header">
      <a href="#">HOME</a>
      <a href="#">ABOUT</a>
      <a href="#">JOIN</a>
      <a href="#">LOGIN</a>
    </div>
      <Pagelogin/>
      <Novoproduto/>
        <div className="teste">
          {produtos?.map((e) =>{
            console.log(e)
            return(
              <div key={e.produtoId} className='teste1'>
                <h1>{e.nomeProduto}</h1>
                <h1>{e.descricaoProduto}</h1>
                <h1 className="preco">{e.precoProduto}</h1>
              </div>
            )})}
        </div>
        <div className="footer"> 
          <a href="#">HOME</a>
          <a href="#">ABOUT</a>
          <a href="#">JOIN</a>
          <a href="#">LOGIN</a>
        </div>
    </>
	);
}

export default App;