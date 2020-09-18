const express = require("express");

const app = express();
app.use(express.json());

const clientes = [];

//Index
app.get("/clientes", (request, response) => {
  response.json(clientes);
});

//Show / Detail
app.get("/clientes/:id", (request, response) => {
  const { id } = request.params;

  const cliente = clientes.find((c) => c.id === +id);

  if (cliente) {
    response.json(cliente);
  } else {
    response.sendStatus(404);
  }
});

//Store
app.post("/clientes", (req, res) => {
  const { nome, email } = req.body;

  const ids = clientes.map((c) => {
    return c.id;
  });

  const maxId = clientes.length > 0 ? Math.max(...ids) : 0;

  const novoCliente = {
    id: maxId + 1,
    nome,
    email,
  };

  clientes.push(novoCliente);

  res.send();
});

//Update
app.put("/clientes/:id", (req, res) => {
  const { id } = req.params;

  const { nome, email } = req.body;

  const indice = clientes.findIndex((c) => c.id === +id);

  if (indice >= 0) {
    const clienteCadastrado = clientes[indice];

    const novasInformacoes = { email, nome };

    Object.assign(clienteCadastrado, novasInformacoes);

    clientes[indice] = clienteCadastrado;

    res.send();
  } else {
    res.sendStatus(404);
  }
});

//Destroy
app.delete("/clientes/:id", (req, res) => {
  const { id } = req.params;

  const indice = clientes.findIndex((c) => c.id === +id);

  if (indice >= 0) {
    clientes.splice(indice, 1);
    res.send();
  } else {
    res.sendStatus(404);
  }
});

app.listen("3000", () => {
  console.log("Servidor iniciou na porta 3000");
});
