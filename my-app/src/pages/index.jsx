import React from 'react';
import PageProdutos from '../pages/produtos';
import '.././index.css'
import { useHistory } from "react-router-dom"


function App() {
    
  const history = useHistory()

	return (
    <>
    <div className="header">
      <button href="#">HOME</button>
      <button href="#">ABOUT</button>
      <button onClick={(e) =>  history.push("/registrar")}>REGISTAR</button>
      <button onClick={(e) =>  history.push("/login")}>LOGIN</button>
    </div>
      <PageProdutos/>
    <div className="footer"> 
      <button href="#">HOME</button>
      <button href="#">ABOUT</button>
      <button href="#">JOIN</button>
      <button href="#">LOGIN</button>
    </div>
    </>
	);
}

export default App;