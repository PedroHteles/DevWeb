import { IndexContext } from './context/index'
import React from "react";



function App() {
  const {editar,enviaFormLogin} = React.useContext(IndexContext);
  const[user,setUser] = React.useState('');
  const[password,sePassword] = React.useState('');
  return (
    <div className="App">
      <header className="App-header">
      <form onSubmit={(e) => {
        e.preventDefault()
        const dados = {user,password}
        enviaFormLogin(dados)}}>
            <input type='text' required value={user} onChange={(e) => setUser(e.target.value)}></input>
            <input type='text' required value={password} onChange={(e) => sePassword(e.target.value)}></input>
            <input type='submit'></input>
        </form>
      </header>
    </div>
  );
}

export default App;
