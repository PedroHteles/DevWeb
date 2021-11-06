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
    const [admin, setAdmin] = useState(null)

    React.useEffect (async () => {
      async function getProduto(){
      try{
        const res = await api.get('/product')
        setProduct(res.data)
      } 
      catch(err){
        console.log(err)
      }
      }

      async function getUser(){
        try{
          setLoading(true)
          const res = await api.get('/user', {withCredentials: true})
          setUser(res.data.message)
          setLoading(false)

        }
        catch(err){
          setLoading(false)
          setUser(null)
        }
      }

      async function getCarrinho(){
        try {
          const res = await api.get('/carrinho')
          setCarrinho(res?.data)
        } catch (error) {
          console.log(error)
        }

      }

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
            if(item?.id_produto == item2?.id) {
              item2.unidade = item.quantidade
              TempCarrinho.push(item2)
            }

            
          })
          if (!item2.unidade) item2.unidade = 0   
        })
        setCarrinho(TempCarrinho)
        setProduct(TempProduct)
      }
      updateCarrinho()
    },[flag])

    React.useEffect (async () => {
      async function checkAdmin(){
        if(user?.nome === "Artur Gonzalez Luz"){
          setAdmin(true)
          console.log(admin)
          console.log(user?.nome)
        }
        
      }
      checkAdmin()
    })


    const handleLogin = async(dados) =>{
      try{
        const res = await api.post('/login',dados)
        setUser(res.data.message)
        return(
          window.location.replace("/")
        )
      } catch(err){
        setUser(null)
      }
    }

    const handleProduto = async(produtos) => {
        try{
          await api.post('/criarprod',produtos)
          alert("foi")
        } catch(err){
          console.log(err);
        }
    }

    const handleSearchUser = async (event) => {
      event.preventDefault();
      if(!user){
          history.push('/login')
      }
    }

    const handleCadastro = async(user) => {
        try{
          const res = await api.post('/register',user)
          setUser(res?.data?.message)
          history.push('/')
        } catch(err){
          setUser(null)
        }
    }

    const handleLogout = async() => {
      try{
        await api.get('/logout', {withCredentials: true})
        setUser(null)

        console.log(" entrou no Logout")

        window.location.reload(true)
  
      }
      catch(err){
        setUser(null)
        console.log(err.response, "caiu no catch do Logout")
      }
    }

    const handleCarrinho = async(e) => {
      console.log(e)
      try{
        const res  = await api.post('/addcarrinho',e)
        const TempCarrinho = res?.data?.map(item => {
          item.unidade = item.quantidade
          return item
        }
          )

        setCarrinho(TempCarrinho)
        setFlag(!flag)

      } catch(err){
        console.log(err);
      }
    }


return (<IndexContext.Provider value={{handleSearchUser, handleLogin, handleCadastro, handleLogout, handleProduto, handleCarrinho, setCarrinho, setProduct, setSelect, setUser, admin, user, carrinho, product, loading, select}}>
    {children}
  </IndexContext.Provider>);
}
