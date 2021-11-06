import React from "react";
import Paper from "@material-ui/core/Paper";
import { IndexContext } from "../../context/index";
import { NativeSelect } from '@mui/material';
import "./styles.scss";

function Checkout() {
    const { handleLogout, user, admin, setSelect, carrinho} = React.useContext(IndexContext);
    const [teste ,setTest] = React.useState(0)

    
    
        let total = 0
        
        carrinho.map((e) => {

            total += (parseFloat(e.valor) * e.unidade)
        })
        
        console.log(total)
    
    return (
    <><Paper className="teste">
            <p className="titles">Checkout</p>
            <div className="dados">
                <p className="nome">{user?.nome}</p> 
                <p>{user?.cpf}</p>
                <p>{user?.rua}, {user?.numero} - {user?.bairro}</p>
            </div>
            <p className="titles3">Forma de Pagamento</p>
            <NativeSelect
                defaultValue={20}
                inputProps={{
                }}
                className="select"
            >
                <option value={10}>CARTÃO DE CRÉDITO - À VISTA</option>
                <option value={20}>BOLETO - À VISTA</option>
                <option value={30}>PIX</option>
            </NativeSelect>
            <div className="espaco">
                <p className="titles4">Subtotal</p>
                <h3>R$ 10</h3>
            </div>
            <div className="espaco">
                <p className="titles4">Juros</p>
                <h3>R$ 0,99</h3>
            </div>
            <div className="espaco">
                <p className="titles4">Valor Total</p>
                <h3>R$ 10,99</h3>
            </div>
            <button className="enviarPedido">
            Enviar Pedido
          </button>
        </Paper></>)
}

export default Checkout;