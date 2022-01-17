import React, { createContext, useState} from "react";
import { useHistory } from "react-router-dom";
import api from "../services/api";
export const IndexContext = createContext();

export default function IndexProvider({ children }) {
  let history = useHistory();
  const [flag, setFlag] = useState(false)
  const [user, setUser] = useState(null)
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [select, setSelect] = useState(0)
  const [carrinho, setCarrinho] = React.useState([])

  React.useEffect (async () => {
    async function getProduto(){
    try{
      const res = await api.get('/products')
      setProduct(res.data)
    } 
    catch(err){
      console.log(err)
    }}

    async function getUser(){
      try{
        setLoading(true)
        const res = await api.get('/user', {withCredentials: true})
        setUser(res.data)
        setLoading(false)
      }
      catch(err){
        setLoading(false)
        setUser(null)
    }}

    async function getCarrinho(){
      try {
        const res = await api.get('/carrinho')
        setCarrinho(res?.data)
      } catch (error) {
        setCarrinho(null)
    }}

    await getProduto()
    await getUser()
    await getCarrinho()
    setFlag(!flag)
  },[])


  React.useEffect (async () => {
    async function updateCarrinho(){
      const TempCarrinho = [];
      
      const TempProduct = product? [...product] : null
      TempProduct?.map(item2 => {
        carrinho?.map(item => {
          if(item?.idProduto == item2?.id) {
            item2.unidade = item.quantidade
            TempCarrinho.push(item2)
          }
        })
        try {
          if (!item2?.unidade){
            item2.unidade = 0 
          }   
        } catch (error) {
          console.log(error)
        }
        
      })
      setCarrinho(TempCarrinho)
      setProduct(TempProduct)
    }
    updateCarrinho()
  },[flag])


    const handleLogin = async(dados) =>{
      try{
        const res = await api.post('/login',dados)
        setUser(res.data)
        return window.location.replace("/")

      } catch(err){
        setUser(null)
      }
    }


    const handleCadastro = async(user) => {
        try{
          const res = await api.post('/register',user)
          setUser(res?.data?.message)
          return history.push('/')
        } catch(err){
          setUser(null)
        }
    }

    const handleLogout = async() => {
      try{
        await api.get('/logout', {withCredentials: true})
        setUser(null)
        return window.location.reload(true)
      }
      catch(err){
        setUser(null)
      }
    }

    const handleCarrinho = async(e) => {
      try{
        const res  = await api.post('/addcarrinho',e)
        const TempCarrinho = res?.data?.map(item => {
          item.unidade = item.quantidade
        return item})

        setCarrinho(TempCarrinho)
        setFlag(!flag)
        return 
      }catch(err){
        console.log(err);
      }
    }


return (<IndexContext.Provider value={{handleLogin, handleCadastro, handleLogout,  handleCarrinho, 
                                      setCarrinho, setProduct, setSelect, setUser, 
                                      user, carrinho, product, loading, select
    }}>
    {children}
  </IndexContext.Provider>);
}
