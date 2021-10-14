import React from 'react';
import { IndexContext } from '../context/index'

function Pagelogin() {
  const {enviaFormLogin} = React.useContext(IndexContext);
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
      </header>
    </div>
	);
}

export default Pagelogin;