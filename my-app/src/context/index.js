import React, { createContext} from "react";
import api from "../services/api";
export const IndexContext = createContext();

export default function IndexProvider({ children }) {
    const [ usuario, setUser] = React.useState([]);
    const [ produtos, setProdutos] = React.useState([]);

    React.useEffect(async() =>{
        const res = await api.get('/produtos')
        setProdutos(res.data)
    },[])


    const enviaFormLogin = async(dadosForm) =>{
        try {
           const res = await api.post('/login',dadosForm,{withCredentials: true})
           setUser(res.data)
        } catch (e) {
            console.log(e.response?.status)
        }
    }

    const enviaFormNewProduto = async(dadosForm) =>{
        try {
           const res = await api.post('/novoproduto',dadosForm,{withCredentials: true})
        } catch (e) {
            console.log(e.response?.status)
        }
    }
    
    return (
        <IndexContext.Provider
          value={{usuario,enviaFormLogin,enviaFormNewProduto,produtos}}
        >{children}
        </IndexContext.Provider>
    );
}