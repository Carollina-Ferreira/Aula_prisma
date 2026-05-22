require('dotenv').config();

const express = require("express");
const cors = require ("cors");
const app = express();

const usuarioRoute = require("./src/routes/usuario.route.js");

app.use(express.json());
app.use(cors());

app.use("/usuario", usuarioRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log(`Servidor rodando http://localhost:${PORT}`);
})
