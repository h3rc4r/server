const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const miniJuegoSchema = new Schema(
    {
        name: {
            type: String,
            enum: ["ruleta", "quePrefieres", "cuantoConoces"]
        },
        
        hasBeenPlayed: {
            type: Boolean,
            default: false,
        },

        points: {
            type: Number
        },

        pregunta: {
            type: String,
        },

        respuesta: {
            type: String,
        },

        user:
            { type: Schema.Types.ObjectId },

        opciones: [{
            type: String
        }]
    }
);


module.exports = model("MiniJuego", miniJuegoSchema)