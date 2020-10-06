const { v4: uuidv4 } = require("uuid");
const Yup = require("yup");
const BusinessException = require("../common/exceptions/BusinessException");
const db = require("../config/db");

const validadorCreateUpdate = Yup.object().shape({
    nome: Yup.string().min(4).required(),
    preco: Yup.number().required().positive(),
    quantidade: Yup.number().positive().required().integer(),
  });

class ProdutoController {
    async index (req, res) {

        const result = await db.query("SELECT * FROM PRODUTOS");

        res.json(result.rows);
    }

    async show(req, res) {
        const { id } = req.params;

        const result =  await db.query(`SELECT * FROM PRODUTOS WHERE ID = '${id}'`); 
        
        if (result.rowCount > 0) {
            res.json(result.rows[0]);
        } else {
            res.sendStatus(404);
        }

    }
    
    async store(req, res) {

        await validadorCreateUpdate.validate(req.body, {
            abortEarly: false,
          });

        const {nome, preco, quantidade} = req.body;

        const id = uuidv4();

        await db.query(`INSERT INTO PRODUTOS(ID, NOME, PRECO, QUANTIDADE) VALUES('${id}', '${nome}', ${preco}, ${quantidade})`);

        const novoProduto = {
            id,
            nome,
            preco,
            quantidade
        }

        res.status(201).json(novoProduto);

    }

    async update(req, res) {

        await validadorCreateUpdate.validate(req.body, {
            abortEarly: false,
        });

        const { id } = req.params;

        const {nome, preco, quantidade} = req.body;

        const result = await db.query(`SELECT COUNT(ID) FROM PRODUTOS WHERE ID = '${id}'`);

        if (result.rows[0].count > 0) {

            await db.query(`UPDATE PRODUTOS SET NOME = '${nome}', PRECO = ${preco}, QUANTIDADE = ${quantidade} WHERE ID = '${id}'`);

            res.send();

        } else {
            res.sendStatus(404);
        }
    }

    async destroy(req, res) {
        const { id } = req.params;        

        const result = await db.query(`SELECT COUNT(ID) FROM PRODUTOS WHERE ID = '${id}'`);

        if (result.rows[0].count > 0) {
            
            await db.query(`DELETE FROM PRODUTOS WHERE ID = '${id}'`);

            res.send();

        } else {
            res.sendStatus(404);
        }
    }
}

module.exports = new ProdutoController();