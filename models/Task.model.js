const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const taskSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        checked: {
            type: Boolean,
            default: false,
        },
        user: {
            type: Schema.Types.ObjectId
        },
        value: {
            type: Number,
            required: false
        },
    },
);


module.exports = model("Tasks", taskSchema)
