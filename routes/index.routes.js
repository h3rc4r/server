const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.json("All good in here");
});
// // const profileRoutes = require("./routes/profile.routes");
// // app.use("/avatar", profileRoutes);

// router.post('/avatar', multer.single('avatar'), async (req, res) => {
//   const { userId } = req.body; // ID del usuario
//   const imageUrl = req.file.path; // la URL de la imagen cargada en Cloudinary

//   try {
//     // buscar el usuario correspondiente a la solicitud
//     const user = await User.findById(userId);

//     if (!user) {
//       return res.status(404).json({ message: 'No se encontró el usuario.' });
//     }

//     // actualizar el campo "avatar" del usuario con la URL de la imagen cargada
//     user.avatar = imageUrl;
//     await user.save();

//     res.json({ imageUrl }); // responder con la URL de la imagen cargada
//   } catch (error) {
//     console.error('Hubo un error al cargar la imagen', error);
//     res.status(500).json({ message: 'Hubo un error al cargar la imagen.' });
//   }
// });
// module.exports = router;
// const express = require("express");
// const router = express.Router();
// const multer = require("multer");
// const { CloudinaryStorage } = require("multer-storage-cloudinary");
// const cloudinary = require("cloudinary").v2;
// const { cloudinaryConfig } = require("../config/cloudinary.config");

// router.post("/upload", cloudinaryConfig, (req, res) => {
//   const storage = new CloudinaryStorage({
//     cloudinary: cloudinary,
//     params: {
//       folder: "ladiaria-project",
//       allowed_formats: ["jpg", "png"],
//     },
//   });
//   const upload = multer({ storage }).single("avatar");

//   upload(req, res, (err) => {
//     if (err) {
//       return res.status(400).json({ message: err.message });
//     }
//     res.json({ imageUrl: req.file.path });
//   });
// });

module.exports = router;
