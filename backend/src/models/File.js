const mongoose = require("mongoose")

const File = new mongoose.Schema(
    {
        title: {
            type: String, 
            require:true,
        },
        path:{
            type:String,
            require: true
        }
    }, 
    {
        timestamps:true,
        toObject: {virtuals:true}, // Converte para objeto
        toJSON: {virtuals:true} // Converte para JSON
    }
);

// Converte em um URL utilizável a string de ID do arquivo que está sendo enviado para o DB.
File.virtual("url").get(function() {
    const url = process.env.URL || "http://localhost:3333"
    return `${url}/files/${encodeURIComponent(this.path)}`;
})

module.exports = mongoose.model("File", File);