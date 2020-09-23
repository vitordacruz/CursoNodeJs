const express = require("express");
const clientesRouter = require("./routes/clientesRouter");

const app = express();
app.use(express.json());

app.use("/clientes", clientesRouter);

app.listen("3000", () => {
  console.log("Servidor iniciou na porta 3000");
});
