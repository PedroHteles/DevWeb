const Produtos = require('../models/produtos')

module.exports = app => {
    app.get('/produtos', (req, res) => {
        Produtos.lista(res)
    })

    app.get('/produtos/:id', (req, res) => {
        const id = parseInt(req.params.id)

        Produtos.buscaPorId(id, res)
    })

    app.post('/produtos', (req, res) => {
       const Produtos = req.body

        Produtos.adiciona(Produtos, res)
    })
    
    app.post('/produtosLoga', (req, res) => {
        console.log("deu post autentica")
        const produto = req.body

        Produto.autentica(produto, res)
    }) 

    app.patch('/produtos/:id', (req, res) => {
        const id = parseInt(req.params.id)
        const valores = req.body

        Produtos.altera(id, valores, res)
    })

    app.delete('/produtos/:id', (req, res) => {
        const id = parseInt(req.params.id)

        Produtos.deleta(id, res)
    })
}