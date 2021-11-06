import React from "react";
import { Redirect, Route } from "react-router";
import { IndexContext } from "../../context/index";
import CircularProgress from '@mui/material/CircularProgress';


function PrivateRoute({component, path}) {
    const {user, loading} = React.useContext(IndexContext);
    if(!loading){
        if(!user){
            return(
                <Redirect to="/login" />
            )
        }
        else{
            return(
                <Route component = { component } path={path} />
            )
        }
    }
    return(<CircularProgress/>)
}

export default PrivateRoute