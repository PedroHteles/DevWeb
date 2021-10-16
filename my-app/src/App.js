import React from 'react';
import Pagelogin from './pages/login'
import PageNovoProdutos from './pages/novoProduto'
import pageIndex from './pages/index'
import PageRegister from './pages/register'
import { BrowserRouter, Switch, Route } from 'react-router-dom';

function App() {


	return (
    <BrowserRouter>
    <Switch>
      <Route path="/registrar" component={PageRegister} />
      <Route path="/login" component={Pagelogin} />
      <Route path="/addprodutos" component={PageNovoProdutos} />
      <Route path="/" component={pageIndex} />
    </Switch>
  </BrowserRouter>
	);
}

export default App;