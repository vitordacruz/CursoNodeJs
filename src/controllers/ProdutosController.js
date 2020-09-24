const { v4: uuidv4 } = require("uuid");

const produtos = [];

class ProdutoController {
    index (req, res) {
        res.json(produtos);
    }

    show(req, res) {
        const { id } = req.params;

        const produto = produtos.find((prod) => prod.id === id);
        
        if (produto) {
            res.json(produto);
        } else {
            res.sendStatus(404);
        }

    }
    
    store(req, res) {
        const {nome, preco, quantidade} = req.body;

        if (isNaN(preco) || isNaN(quantidade)) {
            res.sendStatus(400);
            return;
        }

        const novoProduto = {
            "id": uuidv4(),
            nome,
            preco,
            quantidade
        }
        
        produtos.push(novoProduto);

        res.send();

    }

    update(req, res) {
        const { id } = req.params;

        const {nome, preco, quantidade} = req.body;

        const indice = produtos.findIndex((prod) => prod.id === id);

        if (indice) {

            const produtoCadastrado = produtos[indice];

            const novasInformacoes = { preco, nome, quantidade};

            Object.assign(produtoCadastrado, novasInformacoes);

            produtos[indice] = produtoCadastrado;

            res.send();

        } else {
            res.sendStatus(404);
        }
    }

    destroy(req, res) {
        const { id } = req.params;        

        const produtoIndice = produtos.findIndex((prod) => prod.id === id);

        if (produtoIndice) {

            produtos.splice(produtoIndice, 1);

            res.send();

        } else {
            res.sendStatus(404);
        }
    }
}

module.exports = new ProdutoController();