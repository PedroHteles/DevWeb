import React from "react";
import Container from "@material-ui/core/Container";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import "./styles.scss";
import '../../static/App.scss'
import Produto from '../../components/Produto/produto' 

const Home = () => {
  return (
    <div id="App">
      <Header/>
      <Container>
        <main>
          <div>
            <h2 className="produtoShow">Produtos</h2>
            <div className="cardDiv">
              <Produto/>
            </div>
          </div>
        </main>
      </Container>
      <Footer/>
    </div>
  );
};
export default Home;
