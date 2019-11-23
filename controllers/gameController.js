var Game = require('../models/videogame');
var debug = require('debug')('restful-api:user_controller');

// Search a Game
module.exports.getOne = (req, res, next) => {
    debug("Search Game", req.params);
    Game.findOne({
            nombre: req.params.nombre
        })
        .then((foundGame) => {
            console.log(foundGame)
            debug("Found Game", foundGame);
            if (foundGame)
                return res.status(200).json(foundGame);
            else
                return res.status(400).json(null)
        })
        .catch(err => {
            next(err);
        });
}

module.exports.getAll = (req, res, next) => {
    var perPage = Number(req.query.size) || 10,
        page = req.query.page > 0 ? req.query.page : 0;

    var sortProperty = req.query.sortby || "año_lanzamiento",
        sort = req.query.sort || "desc";

    debug("Games List", {
        size: perPage,
        page,
        sortby: sortProperty,
        sort
    });

    Game.find({})
        .limit(perPage)
        .skip(perPage * page)
        .sort({
            [sortProperty]: sort
        })
        .then((games) => {
            debug("Found games", games);
            return res.status(200).json(games)
        }).catch(err => {
            next(err);
        });

}

// New Game

module.exports.create = (req, res, next) => {
    debug("New Game", {
        body: req.body
    });
    Game.findOne({
            nombre: req.body.nombre
        })
        .then((foundGame) => {
            if (foundGame) {
                debug("EL juego ya existe");
                throw new Error(`Juego duplicado ${req.body.nombre}`);
            } else {
                let newGame = new Game({
                    nombre: req.body.nombre,
                    genero: req.body.genero,
                    consola: req.body.consola,
                    precio_lanzamiento: req.body.precio_lanzamiento,
                    año_lanzamiento: req.body.año_lanzamiento,
                    descripcion: req.body.descripcion
                });
                return newGame.save();
            }
        }).then(game => {
            return res
                .header('Location', '/games/' + game.nombre)
                .status(201)
                .json({
                    game: game.nombre
                });
        }).catch(err => {
            next(err);
        });
}


// Update game

module.exports.update = (req, res, next) => {
    debug("Update game", {
        nombre: req.params.nombre,
        ...req.body
    });

    let update = {
        ...req.body
    };

    Game.findOneAndUpdate({
            nombre: req.params.nombre
        }, update, {
            new: true
        })
        .then((updated) => {
            if (updated)
                return res.status(200).json(updated);
            else
                return res.status(400).json(null);
        }).catch(err => {
            next(err);
        });
}

module.exports.delete = (req, res, next) => {

    debug("Delete game", {
        nombre: req.params.nombre,
    });

    Game.findOneAndDelete({nombre: req.params.nombre})
    .then((data) =>{
        if (data) res.status(200).json(data);
        else res.status(404).send();
    }).catch( err => {
        next(err);
    })
}