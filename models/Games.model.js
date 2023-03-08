const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const games = new Schema(
    {
        
        hasBeenPlayed: {
            type: Boolean,
            default: false,
        },
        user: [
            { type: Schema.Types.ObjectId }
        ],
        points:{
            type: Number
        }
    },
);


module.exports = model("Games", gamesSchema)