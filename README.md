# La Diaria - Back
## About us
------------
## Description 
La Diaria es una plataforma de gestion de tareas para parejas, interactiva y con concepto de juego, con la finalidad de que la pareja se asignen  una serie de tareas domesticas
y a medida que se vayan marcando como completadas se
iran sumando cierta cantidad de puntos dependiento de 
la tarea.

las tareas del juego tienen una duracion de un mes y
al final de cada mes se cuentan el total de puntos de
cada de  los dos miembros y quien obtenga mas puntos obtendra
un "trofeo" que sera una recompensa previamente definida por la pareja al iniciar, y el que haya obtenido menos puntos tendrá que  cumplir esa recompensa.

Tambien tendra otro sistema de obtencion de puntos que serán 
mini juegos de pareja.

Cada jugador tendra una vista con los resultados de los minijuegos, victorias o derrotas o conflictos aún por resolver.

--------------
## Deployment 

Puede verificar la applicacion completamente implementada  [aqui]()

## Work Structure
Usamos la plataforma [Trello](https://trello.com/b/hpGY6UqD/ladiaria) para la distribución de tareas

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
    username: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    points:{ type: number},
    couple:[{ type:Schema.types.ObjectId}],
    isAdmin: { type:Boolean},
    trophy: { type: String}
})
````

Couple.model.js
````js
const CoupleSchema= new Schema({
    users: [{ type:Schema.types.ObjectId}],
    task:[{ type:Schema.types.ObjectId}],
    coupleName: { type: String}
})
````
Tasks.model.js
````js
const TaskSchema= new Schema({
    title: { type: String},
    checked: {type: Boolean, default: false}
    value: { type: Number}
})
````
Roulette.model.js
````js
const RouletteSchema= new Schema({
    hasBeenPlayed: { type: Boolean, default: false},
    user: [{ type: Schema.types.ObjectId}],
    points: { type: Number}
})
````
## User roles
| Role  | Capabilities                                                                                                                               | Property       |
| :---: | ------------------------------------------------------------------------------------------------------------------------------------------ | -------------- |
| User  | por definir.                                                                       | isAdmin: false |
| Admin | por definir. | isAdmin: true  |
---
## Routes back-end/API
| Method | Endpoint                    | Require                                             | Response (200)                                                        | Action                                                                    |
| :----: | --------------------------- | --------------------------------------------------- |---------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| POST   | /signup                     | const { username, email, password } = req.body      | json({user: user})                                                    | Registra al usuario en la base de datos y devuelve el usuario conectado.        |
| POST   | /login                      | const { email, password } = req.body                | json({authToken: authToken})                                          | logea al usuario ya registrado                                        |
 GET    | /profile                    | -                                                   | json({thisUser})                                                      | Devuelve el currentUser Object|
 GET    | /task                    | const { title, checked,value}= req.params                                                   | json({thisUserTask})                                                      | Devuelve las tasks objects del currentUser
 POST    | /task                  | -                                                   | json({thisTaskAdd})                                                      | 
 Añadir una tarea
 | POST   | /task/:id/edit                    | const { title, checked,value}= req.params      | json({taskId})                                                    | Editar una tarea        |

---
