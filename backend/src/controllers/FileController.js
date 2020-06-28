const Box = require("../models/Box")
const File = require("../models/File")

class FileController  {
    async store(req, res) {
        // O file está sendo enviado com o Id do Box por isso da busca pelo box abaixo
        const box = await Box.findById(req.params.id);
        // Criado o arquivo onde o título e o path vem LÁ do multer via req.file
        const file = await File.create({
            title: req.file.originalname,
            path: req.file.key
        });
        // Empurra para dentro do array o nosso objeto file criado, salva e retorna.
        box.files.push(file);
        await box.save();

        // Estamos informando a todos os usuários que estão conectados na box em que o arquivo 
        //está sendo salvo para receberem a notificação/atualização do novo arquivo criado
        req.io.sockets.in(box._id).emit("file", file)

        return res.json(file);
    }
};

module.exports = new FileController();