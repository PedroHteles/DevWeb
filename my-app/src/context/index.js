import React, { createContext, useState} from "react";
import api from "../services/api";
import Cookies from 'universal-cookie'
const cookies = new Cookies()
export const IndexContext = createContext();



const USER = {
    user: null
};

export default function IndexProvider({ children }) {
    const [ user, setUser] = React.useState(USER);

    
    const enviaFormLogin = async(dadosForm) =>{
        console.log(dadosForm)
        const  res = await api.post('/login', dadosForm); 
        const token = res.data.token
        cookies.set('a', token, { path: '/',  httpOnly: true })
        console.log(res.data.token)
        
    }
    return (
        <IndexContext.Provider
          value={{user,enviaFormLogin}}
        >{children}
        </IndexContext.Provider>
    );
}