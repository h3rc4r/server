const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const quePreferieresSchema = new Schema(
    {
        result: {
            type: String,
            enum: value
        }
    }
);


module.exports = model("JuegoDos", quePreferieresSchema)