const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const game = new Schema(
    {
        minigame: {type:String,
        enum:[ "ruleta","quePrefieres","cuantoConoces"]
        },
        hasBeenPlayed: {
            type: Boolean,
            default: false,
        },
    },
);


module.exports = model("Game", gameSchema)