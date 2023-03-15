const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required."],
    },
    name: {
      type: String,
      required: [true, "Name is required."],
    },
    points: {type: Number, default: 0},
    prize: String,
    avatar: {
      type: String,
      default: "https://thumbs.dreamstime.com/b/vector-de-perfil-avatar-predeterminado-foto-usuario-medios-sociales-icono-183042379.jpg",
    },
    couple:
      
        {
          type:
            Schema.Types.ObjectId,
            ref:"Couple"
        }
      

  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;


    // userSchema.statics.updatePoints = async function(userId) {
    //   const Task = require('./task.model');
    //   const tasks = await Task.find({ user: userId });
    //   const sum = tasks.reduce((acc, task) => acc + task.value, 0);
    //   await this.findByIdAndUpdate(userId, { points: sum });
    // };