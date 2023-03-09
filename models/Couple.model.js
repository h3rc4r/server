const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const coupleSchema = new Schema(
    {
        users: [
            {
            type: Schema.Types.ObjectId}
        ],
        task: [
            { type: Schema.Types.ObjectId }
        ],
        coupleName: { 
            type: string,
            required: true
        }
    },
);


module.exports = model("Couple", coupleSchema)
