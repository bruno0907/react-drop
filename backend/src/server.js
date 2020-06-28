const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors")

require("dotenv").config({path: "./src/config/.env"});

const app = express();

app.use(cors());

// Criamos nosso server HTTP para uso do socket.io e dizemos que o nosso server é o nosso app
const server = require("http").Server(app);

// Com o socket.io instalado, criamos ele e já atribuímos ele ao nosso servidor
const io = require("socket.io")(server);

// Aqui, as informações de box virão do front-end fazendo com que o socket.io direcione a conexão do usuário para a box solicitada
io.on("connection", socket => {
    socket.on("connectRoom", box => {
        socket.join(box)
    })
});

const _DATABASE = process.env.DB_URI;
const _PORT = process.env.PORT;

mongoose.connect(_DATABASE, 
    {
        useNewUrlParser:true,
        useUnifiedTopology:true
    }
);

// Direcionamento da requisição de fato oriunda do front-end via requisição e então continuando a conexão via next()
app.use((req, res, next) => {
    req.io = io;
    return next();
});

app.use(express.json());
app.use(express.urlencoded({extended:true}));

// Config para toda vez que o usuário requisitar o caminho /files o método static do express direcionar para o caminho resolvido abaixo.
app.use("/files", express.static(path.resolve(__dirname, '..', 'tmp')));

// O app nem perde tempo e já manda o usuário para as rotas.
app.use(require("./routes"));

// Server de pé! O app.listen já ta vindo por parâmetro lá de cima na criação do server.
server.listen(_PORT || 3333, () => {
    console.log(`Server Running on PORT: ${_PORT}`);
});