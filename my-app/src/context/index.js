import React, { createContext, useState} from "react";
import api from "../services/api";
export const IndexContext = createContext();


const USER = {
    user: null
};

export default function IndexProvider({ children }) {
    const [ user, setUser] = React.useState(USER);

    const editar = async (dadosForm) => {
        console.log(dadosForm)
        try {
            await api.post(dadosForm) || [];
        } catch ( e ) {
            console.log(e)
        }
      };
    return (
        <IndexContext.Provider
          value={{editar}}
        >{children}
        </IndexContext.Provider>
    );
}