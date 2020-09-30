const { v4: uuidv4 } = require("uuid");
const Yup = require("yup");
const BusinessException = require("../common/exceptions/BusinessException");

const produtos = [];

const validadorCreateUpdate = Yup.object().shape({
    nome: Yup.string().min(4).required(),
    preco: Yup.number().required().positive(),
    quantidade: Yup.number().positive().required().integer(),
  });

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
    
    async store(req, res) {

        await validadorCreateUpdate.validate(req.body, {
            abortEarly: false,
          });

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

    async update(req, res) {

        await validadorCreateUpdate.validate(req.body, {
            abortEarly: false,
        });

        const { id } = req.params;

        const {nome, preco, quantidade} = req.body;

        console.log("id: ", id);

        console.log(produtos);

        const indice = produtos.findIndex((prod) => prod.id === id);

        console.log(indice);

        if (indice >= 0) {

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