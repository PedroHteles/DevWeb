import { ReactComponent as LogoArcom } from "../../SVGS/LogoSVG.svg";
import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import Button from "@material-ui/core/Button";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import LogoutIcon from '@mui/icons-material/Logout';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import { InputBase } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { IndexContext } from "../../context/index";
import "./styles.scss";


function Header() {
  let history = useHistory();
  const { handleLogout, user, admin, setSelect} = React.useContext(IndexContext);

  const handleSearchUser = async (event) => {
    event.preventDefault();
    if(!user){
        history.push('/login')
    }
  }
  
  return (
    <div className="navbar">
      <AppBar position="static">
        <Toolbar className="header">
          
          <a onClick = {() => history.push("/")}><LogoArcom className="title"></LogoArcom></a>
          <Paper component="form" className="input searchbar">
            <InputBase className="input" placeholder="Pesquisar mercadoria." />
            <IconButton
              type="submit"
              className="iconButtons"
              aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>
          
          <div>

          {admin == true ? <Button color="inherit"><AddBusinessIcon onClick={() => history.push("/addproduto")} /></Button> : <></>}
          {user? <Button color="inherit" onClick = {handleLogout}><LogoutIcon/></Button> : <Button color="inherit" onClick = {handleSearchUser}>
                <AccountBoxIcon></AccountBoxIcon>
              </Button>}
                <Button color="inherit" onClick = {() => history.push("/carrinho")}>
                  <ShoppingCartIcon></ShoppingCartIcon>
                </Button>
          </div>
        </Toolbar>
      </AppBar>
      <AppBar position="static">
        <div className="categorias">
          <div className="innerCategories">
            <button onClick={() => {
              history.push("/"); setSelect("0")}} className="buttons">PROMOÇÕES</button>
            <button onClick={() => {
              history.push("/"); setSelect("4")}} className="buttons">BAZAR & UTILIDADES</button>
            <button onClick={() => {
              history.push("/"); setSelect("2")}} className="buttons">HIGIENE & BELEZA</button>
            <button onClick={() => {
              history.push("/"); setSelect("5")}} className="buttons">MATERIAL DE CONTRUÇÃO & ELÉTRICO</button>
            <button onClick={() => {
              history.push("/"); setSelect("3")}} className="buttons">MATERIAL ESCOLAR & ESCRITÓRIO</button>
            <button onClick={() => {
              history.push("/"); setSelect("1")}} className="buttons">PRODUTOS ALIMENTÍCIOS</button>
          </div>
        </div>
      </AppBar>
    </div>
  );
}

export default Header;
