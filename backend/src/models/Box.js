const mongoose = require("mongoose")

const Box = new mongoose.Schema(
    {
        title: {
            type: String, 
            require:true,
        },
        // Aqui, files é um array que vai receber do model File os arquivos relacionados a esta box via ObjectId.
        files:[{ 
            type: mongoose.Schema.Types.ObjectId, // Aqui utiliza-se do método do próprio mongoose para trazer via "ref" o valor que queremos que será o ObjectId
            ref: "File" // E aqui a referência que é o model File
        }] 
    }, 
    {timestamps:true} // Método do mongoose para criar o createdAt e o updatedAt além do __v que é o indicador de quantas atualizações teve.
);

module.exports = mongoose.model("Box", Box);