const axios = require("axios").default;
const express = require("express");

const app = express();

async function chamarApi(req, res) {
  const { usuario } = req.params;

  const response = await axios.get(`https://api.github.com/users/${usuario}`);

  const { data } = response;

  res.json(data);
}

app.get("/:usuario", chamarApi);

app.listen("8080", () => {
  console.log("Servidor iniciou na porta 8080");
});
