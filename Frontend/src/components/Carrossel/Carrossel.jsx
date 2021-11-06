import './styles.scss'

// function scrollLeft(){
//     var carrossel = document.getElementById('carrossel');
//     scrollLeft = carrossel.scrollLeft;
//     carrossel.scroll((scrollLeft - 1180), 0);
//   }

// function scrollRight(){
//     var carrossel = document.getElementById('carrossel');
//     scrollLeft = carrossel.scrollLeft;
//     carrossel.scroll((scrollLeft + 1180), 0);
//   }

function Carrossel() {
    return (
        <div className="carrosselMarcasContainer">
            <button className="arrow left" onClick={scrollLeft}></button>
                <div id="carrossel" className="carrosselMarcas">
                    <img alt="img" src="https://cdn.awsli.com.br/1265/1265121/marca/None/0e551a9bc8.png"></img>
                    <img alt="img" src="https://cdn.awsli.com.br/1265/1265121/marca/2836525/e71f8aea9a.png"></img>
                    <img alt="img" src="https://cdn.awsli.com.br/1265/1265121/marca/2039602/2217b2dd46.jpg"></img>
                    <img alt="img" src="https://cdn.awsli.com.br/1265/1265121/marca/2039411/6545f2dd66.png"></img>
                    <img alt="img" src="https://cdn.awsli.com.br/1265/1265121/marca/2039410/4cd40be9c9.png"></img>
                    <img alt="img" src="https://cdn.awsli.com.br/1265/1265121/marca/1955318/e40818ab1a.png"></img>
                    <img alt="img" src="https://cdn.awsli.com.br/1265/1265121/marca/1955317/f4e9dae218.png"></img>
                    <img alt="img" src="https://cdn.awsli.com.br/1265/1265121/marca/1955313/064a8e1ff2.png"></img>
                    <img alt="img" src="https://cdn.awsli.com.br/1265/1265121/marca/1952536/17085c1011.jpg"></img>
                    <img alt="img" src="https://cdn.awsli.com.br/1265/1265121/marca/1945283/76c102b5ff.png"></img>
                    <img alt="img" src="https://cdn.awsli.com.br/1265/1265121/marca/1945282/087b70b74f.png"></img>
                    <img alt="img" src="https://cdn.awsli.com.br/1265/1265121/marca/1944274/c0d0d8809e.png"></img>
                    <img alt="img" src="https://cdn.awsli.com.br/1265/1265121/marca/1944265/8d557e8cbc.png"></img>
                    <img alt="img" src="https://cdn.awsli.com.br/1265/1265121/marca/2830959/91a4867fca.png"></img>
                    <img alt="img" src="https://cdn.awsli.com.br/1265/1265121/marca/2275670/554b1ddff7.png"></img>
                </div>
            <button className="arrow right" onClick={scrollRight}></button>
        </div>
    );
}

export default Carrossel;