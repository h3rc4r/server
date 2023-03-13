const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const coupleSchema = new Schema(
    {
        users: [
            {
            type: Schema.Types.ObjectId,
            ref:"User"},
            
        ],
        task: [
            { type: Schema.Types.ObjectId,
            ref:"Task" }
        ],
        coupleName: { 
            type: String,
            required:false
        }
    },
);


module.exports = model("Couple", coupleSchema)
