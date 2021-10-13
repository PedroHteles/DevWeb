import React from 'react';
import { IndexContext } from './context/index'
import api from './services/api';
function App() {
  const {usuario, enviaFormLogin} = React.useContext(IndexContext);
  const[user,setUser] = React.useState('');
  const[passwd,sePasswd] = React.useState('');


	return (
    <div className="App">
      <header className="App-header">
      <form onSubmit={(e) => {
        e.preventDefault()
        const dados = {user,passwd}
        enviaFormLogin(dados)}}>
            <input type='text' required value={user} onChange={(e) => setUser(e.target.value)}></input>
            <input type='text' required value={passwd} onChange={(e) => sePasswd(e.target.value)}></input>
            <input type='submit'></input>
        </form>
          <button onClick={(e) => {
            try {
             const res =  api.get('/user',{withCredentials: true})
             console.log(res)
            } catch (e) {
              console.log(e)
            }
            
            
            }}>{usuario.user}</button>
      </header>
    </div>
	);
}

export default App;