import Paper from '@material-ui/core/Paper';
import './styles.scss'
import React from 'react';
import { useHistory } from "react-router-dom";
import { IndexContext } from "../../context/index";


function Card(props) {
    let history = useHistory();

    const {handleCarrinho, user} = React.useContext(IndexContext);
    console.log(props?.produto);
    return (
        <>
            {props?.produto?.map((e, index) =>{
                return ( <>
                    {props?.className === "cardProduto" ?
                    <Paper className={props?.className} key={index}>
                        <img className="cardImg2" src="https://cdn.discordapp.com/attachments/861433906355240971/905518793843933184/Vector.png"/>
                        <div >
                            <img className="cardImg" src={e.urlImg} onClick={() => history.push("produto",{msg:e})}></img>
                        </div>
                        <p>{e.nomeProduto}</p>
                        <p>R$ {e.valor}</p>
                        <div className="cardB2">
                            <button onClick={() => {
                                if(!user){
                                    history.push("/login")
                                }

                                if(e.unidade > 0){
                                    const id_produto = ({id_produto:e.id, metodo:false})
                                    handleCarrinho(id_produto)
                                }
                                }}>-</button>
                            <input id="input" min="0" max={`${e.quantidade}`} value={ e?.unidade ? e?.unidade : 0} />
                            <button onClick={() => {
                                if(!user){
                                    history.push("/login")
                                }
                                if(e.unidade < 20 ){
                                    const id_produto = ({id_produto:e.id, metodo:true})
                                    handleCarrinho(id_produto)

                                }
                                }}>+</button>
                        </div>
                    </Paper> : 
                    <Paper className={props?.className} key={index}>
                        <div >
                            <img className="cardImg" src={e.urlImg} onClick={() => history.push("produto",{msg:e})}></img>
                        </div>
                        <aside>
                            <p>{e.nomeProduto}</p>
                            <p>R$ {e.valor}</p>
                            <div className="cardB2">
                                <button onClick={() => {
                                    if(!user){
                                        history.push("/login")
                                    }
                                    if(e.unidade > 0){
                                        const id_produto = ({id_produto:e.id, metodo:false})
                                        handleCarrinho(id_produto)
                                    }
                                    }}>-</button>
                                <input id="input" min="0" max={`${e.quantidade}`} value={ e?.unidade ? e?.unidade : 0} />
                                <button onClick={() => {
                                    if(!user){
                                        history.push("/login")
                                    }
                                    if(e.unidade < 20 ){
                                        const id_produto = ({id_produto:e.id, metodo:true})
                                        handleCarrinho(id_produto)
                                    }
                                    }}>+</button>

                            </div>
                        </aside>
                    </Paper>} </>
                )})
            }
        </>
    );
}
export default Card;