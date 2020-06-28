const Box = require("../models/Box")

class BoxController  {
    async store(req, res) {
        const box = await Box.create(req.body);
        return res.json(box);
    }

    async show(req, res) {
        // Busca básica via Id + populate com as infos do path passado e ordenado em ordem decrescente.
        const box = await await Box.findById(req.params.id).populate({
            path: "files",
            options: { sort: {createdAt: -1} }
        });
        return res.json(box)
    }
}

module.exports = new BoxController();