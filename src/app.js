const express = require("express");
require("express-async-errors");
const { ValidationError } = require("yup");
const BusinessException = require("./common/exceptions/BusinessException");
const clientesRouter = require("./routes/clientesRouter");
const produtosRouter = require('./routes/produtosRouter');

const app = express();
app.use(express.json());

app.use("/clients", clientesRouter);
app.use("/produtos", produtosRouter);

app.use((err, req, res, next) => {
  if (err instanceof BusinessException) {
    const errorDetail = {
      detail: [err.message],
      code: err.code,
      dateTime: new Date().toISOString(),
    }

    // BAD Request
    res.status(400).json(errorDetail);
  } else if (err instanceof ValidationError) {
    const errorDetail = {
      detail: err.errors,
      code: "VAL_01",
      dateTime: new Date().toISOString(),
    }

    //BAD_REQUEST
    res.status(400).json(errorDetail);
  } else {
    // Internal Server Error
    res.sendStatus(500);
  }
});

app.listen("3000", () => {
  console.log("Servidor iniciou na porta 3000");
});
