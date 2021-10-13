import React, { createContext} from "react";
import api from "../services/api";
export const IndexContext = createContext();

export default function IndexProvider({ children }) {
    const [ usuario, setUser] = React.useState([]);


    const enviaFormLogin = async(dadosForm) =>{
        try {
           const res = await api.post('/login',dadosForm,{withCredentials: true})
           setUser(res.data)
        } catch (e) {
            console.log(e.response?.status)
        }
}
    return (
        <IndexContext.Provider
          value={{usuario,enviaFormLogin}}
        >{children}
        </IndexContext.Provider>
    );
}