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
<<<<<<< HEAD
            { type: Schema.Types.ObjectId,
            ref:"Task" }
=======
            { type: Schema.Types.ObjectId, ref: "Tasks" }
>>>>>>> dev
        ],
        coupleName: { 
            type: String,
            required:false
        }
    },
);


module.exports = model("Couple", coupleSchema)
