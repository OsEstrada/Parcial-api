const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var GameSchema = Schema({
    nombre: {
        type: String,
        required: true,
        unique: true
    },
    genero: String,
    consola: String,
    precio_lanzamiento: String,
    año_lanzamiento: Number,
    descripcion: String
});

module.exports = mongoose.model("Game", GameSchema);
