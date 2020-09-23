const express = require("express");
const ClientesController = require("../controllers/ClientesController");

const clientesRouter = express.Router();

clientesRouter.get("/", ClientesController.index);
clientesRouter.get("/:id", ClientesController.show);
clientesRouter.post("/", ClientesController.store);
clientesRouter.put("/:id", ClientesController.update);
clientesRouter.delete("/:id", ClientesController.destroy);

module.exports = clientesRouter;
