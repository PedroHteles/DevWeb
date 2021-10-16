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

    
    const enviaFormRegister = async(dadosForm) =>{
        try {
           const res = await api.post('/register',dadosForm,{withCredentials: true})
           setUser(res.data)
        } catch (e) {
            if(e.response?.status == 401){
                alert('Usuario ja Registrado!')
            }
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
          value={{usuario,enviaFormLogin,enviaFormNewProduto,enviaFormRegister,produtos}}
        >{children}
        </IndexContext.Provider>
    );
}