const { v4: uuidv4 } = require("uuid");
const Yup = require("yup");
const BusinessException = require("../common/exceptions/BusinessException");
const db = require("../config/db");

const validadorCreateUpdate = Yup.object().shape({
  nome: Yup.string().min(4).required(),
  email: Yup.string().email(),
});

class ClientesController {
  async index(req, res) {

    const result = await db.query("SELECT * FROM CLIENTES");

    res.json(result.rows);
  }

  async show(req, res) {
    const { id } = req.params;

    const result = await db.query(`SELECT * FROM CLIENTES WHERE ID = '${id}'`);

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

    const { nome, email } = req.body;

    const result = await db.query(`SELECT COUNT(ID) FROM CLIENTES WHERE EMAIL = '${email}'`);

    if (result.rows[0].count > 0) { 
      throw new BusinessException("E-mail já utilizado", "CLI_ERR_01");
    }

    const newId = uuidv4();

    await db.query(`INSERT INTO CLIENTES(ID, NOME, EMAIL) VALUES('${newId}', '${nome}', '${email}')`);

    res.sendStatus(201);
  }

  async update(req, res) {

    await validadorCreateUpdate.validate(req.body, {
      abortEarly: false,
    });

    const { id } = req.params;

    const { nome, email } = req.body;

    const result = await db.query(`SELECT * FROM CLIENTES WHERE ID = '${id}'`);

    if (result.rowCount > 0) {

      const resultClientePorEmail = await db.query(
        `SELECT count(ID) FROM CLIENTES WHERE ID <> '${id}' AND EMAIL = '${email}'`
      );

      if (resultClientePorEmail.rows[0].count > 0) {
        throw new BusinessException('E-mail já em uso', "CLI_ERR_02");
      }

      await db.query(
        `UPDATE CLIENTES SET NOME = '${nome}', EMAIL = '${email}' WHERE ID = '${id}'`
      );

      res.send();

    } else {
      res.sendStatus(404);
    }
  }

  async destroy(req, res) {
    const { id } = req.params;

    const result = await db.query(
      `SELECT COUNT(ID) AS qtd FROM CLIENTES WHERE ID = '${id}'`
    );

    if (result.rows[0].qtd > 0) {
      await db.query(`DELETE FROM CLIENTES WHERE ID = '${id}'`);
      res.send();
    } else {
      res.sendStatus(404);
    }
  }
}

module.exports = new ClientesController();
