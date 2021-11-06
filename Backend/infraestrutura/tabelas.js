class Tabelas {
    init(conexao) {
        this.conexao = conexao

        this.criarProdutos()
        this.criarUsuarios()
    }

    criarProdutos() {
        const sql = 'CREATE TABLE IF NOT EXISTS produtos (id int NOT NULL AUTO_INCREMENT, nome varchar(50) NOT NULL, valor varchar(20), imagem varchar(20) NOT NULL, estoque varchar(50) NOT NULL, dataCriacao datetime NOT NULL, PRIMARY KEY(id))'

        this.conexao.query(sql, erro => {
            if(erro) {
                console.log(erro)
            }
        })
    }

    criarUsuarios() {
        const sql = 'CREATE TABLE IF NOT EXISTS usuarios (nome VARCHAR(40) NOT NULL, rua VARCHAR(40) NOT NULL, bairro VARCHAR(40) NOT NULL, numero VARCHAR(40) NOT NULL, cpf VARCHAR(255) PRIMARY KEY , senha VARCHAR(255) NOT NULL)'
        this.conexao.query(sql, erro => {
            if(erro) {
                console.log(erro)
            }
        })
    }
}

module.exports = new Tabelas