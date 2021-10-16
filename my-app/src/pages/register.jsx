import React from 'react';
import { IndexContext } from '../context/index'

function PageRegister() {
  const {enviaFormRegister} = React.useContext(IndexContext);
  const[user,setUser] = React.useState('');
  const[passwd,sePasswd] = React.useState('');
  const[passwd1,sePasswd1] = React.useState('');

	return (
    <div className="App">
      <header className="App-header">
      <form onSubmit={(e) => {
        e.preventDefault()
        const dados = {user,passwd,passwd1}
        enviaFormRegister(dados)}}>
            <h1>user</h1>
            <input type='text' required value={user} onChange={(e) => setUser(e.target.value)}></input>
            <h1>senha</h1>
            <input type='password' required value={passwd} onChange={(e) => sePasswd(e.target.value)}></input>
            <h1>Confirmar senha</h1>
            <input type='password' required value={passwd1} onChange={(e) => sePasswd1(e.target.value)}></input>
            <button>Confirmar</button>
        </form>
      </header>
    </div>
	);
}

export default PageRegister;