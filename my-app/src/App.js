import React from 'react';
import Pagelogin from './pages/login'
import Novoproduto from './pages/login'
import api from './services/api'
function App() {


	return (
    <>
    <Novoproduto/>
    <button onClick={(e) => {
      try {
       const res =  api.get('/user',{withCredentials: true})
       console.log(res)
      } catch (e) {
        console.log(e)
      }
      
      
      }}>Caregar produtos</button>
      </>
	);
}

export default App;