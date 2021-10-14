import React from 'react';
import Pagelogin from './pages/login'
import Novoproduto from './pages/novoProduto'
import api from './services/api'
function App() {
  const [ teste, setTeste] = React.useState([]);

	return (
    <>
      <Pagelogin/>
      <Novoproduto/>
      <button onClick={async(e) => {
        try {
        const res =  await api.get('/produtos',{withCredentials: true})
        setTeste(res.data)
        } catch (e) {
          console.log(e)
        }
        }}>Caregar produtos</button>
        {teste?.map((e) =>{
          console.log(e)
          return(
            <div key={e.produtoId}>
              <h1>{e.nomeProduto}</h1>
              <h1>{e.precoProduto}</h1>
              <h1>{e.descricaoProduto}</h1>
            </div>
          )
          
        })}

    </>
	);
}

export default App;