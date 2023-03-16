# ConviMillas - Back
## Description 
ConviMillas es una plataforma de gestion de tareas para parejas, interactiva y con dinámica de juego, con la finalidad de que la pareja se asignen  una serie de tareas domesticas
y a medida que se vayan marcando como completadas se
iran sumando cierta cantidad de puntos dependiento de 
la tarea.

las tareas del juego tienen una duracion de un mes y
al final de cada mes se cuentan el total de puntos de
cada de  los dos miembros y quien obtenga mas puntos obtendra
un "trofeo" que sera una recompensa previamente definida por la pareja al iniciar, y el que haya obtenido menos puntos tendrá que  cumplir esa recompensa.

Tambien tendra otro sistema de obtencion de puntos que serán 
mini juegos de pareja.

Cada jugador tendra una vista con los resultados de los minijuegos, victorias y derrotas

--------------
## Deployment 

Puede verificar la applicacion completamente implementada  [aqui](https://convimillas.herokuapp.com/)


## Installation Guide
- Bifurcar este repositorio
- Clonar este repositorio
````bash
$ cd server
$ npm install
$ npm start 
````
## Models
User.model.js
````js
const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    points:{ type: number,default:0},
    couple:{ type:Schema.types.ObjectId, ref:"Couple"},
    isAdmin: { type:Boolean,default:false}
})
````

Couple.model.js
````js
const CoupleSchema= new Schema({
        users: [{type: Schema.Types.ObjectId, ref:"User"}],
        task: [{ type: Schema.Types.ObjectId,ref:"Task" }],
        coupleName: { type: string,required: false}
    })
````
Tasks.model.js
````js
const TaskSchema= new Schema({
        title: {type: String, required: true},
        checked: {type: Boolean,default: false},
        user: {type: Schema.Types.ObjectId, ref:"User"},
        value: {type: Number,required: false}
    })
````


## User roles
| Role  | Capabilities                                                                                                                               | Property       |
| :---: | ------------------------------------------------------------------------------------------------------------------------------------------ | -------------- |
| User  |                                                                       | isAdmin: false |
| Admin | Eliminar usuarios. | isAdmin: true  |
---
## Routes back-end/API
| Method | Endpoint                    | Require                                             | Response (200)                                                        | Action                                                                    |
| :----: | --------------------------- | --------------------------------------------------- |---------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| POST   | /signup                     | const { username, email, password } = req.body      | json({user: user})                                                    | Registra al usuario en la base de datos y devuelve el usuario conectado.        |
| POST   | /login                      | const { email, password } = req.body                | json({authToken: authToken})                                          | logea al usuario ya registrado                                        |
 GET    | /profile/:id                    | -                                                   | json({UserProfile})                                                      |Perfil del usuario |
  PUT    | /profile/edit/:id                   | -                                                   | json({UserProfile})
   POST  | /api/upload/:id                   | -                                                   | json({UserProfile})                                                      |Perfil del usuario añadir imagen|                                                      |Editar perfil del usuario |
   DELETE   | /profile/delete/:id                  | -                                                   | json({UserProfile})                                                      |si es admin eliminar usuario |
 POST  | /task/coupleId/new                    | req.params req.body                                                | json({UserTask})                                                      |crea nuevas tareas para la pareja
PUT    | /task/edit/:idTask                    |  req.params                                                   | json({Taskedit})                                                      | editar las tareas
 | DELETE   | /task/delete/:idTask                  |  req.params      | json({taskDelete})                                                    | eliminar una tarea(admin)     |
  POST    | /couple/new                 | -                                                   | json({newCouple})                                                      |crear una pareja|

---
