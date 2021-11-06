import React from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import Home from '../pages/home/Home'
import Carrinho from '../pages/cart/Carrinho';
import Cadastro from '../pages/register';
import Login from '../pages/login';
import AdmProdutos from '../pages/admin/produtos';
import ProdutoMain from '../pages/main produto';
import PrivateRoute from "../components/privateRoute/PrivateRoute";

const Routes = () => {
   return(
       <BrowserRouter>
        <Switch>
           <Route component = { Home }  path="/" exact />
           <PrivateRoute component = { Carrinho } path='/carrinho' />
           <Route component = { Cadastro } path ='/register' />
           <Route component = { Login } path='/login' />
           <Route component = { AdmProdutos } path='/addproduto' />
           <Route component = { ProdutoMain } path='/produto' />
        </Switch>
       </BrowserRouter>
   )
}
export default Routes;