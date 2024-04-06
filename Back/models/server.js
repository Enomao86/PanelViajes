const express = require("express");
const cors = require("cors");
const dbConnection = require("../database/database");
const session = require("express-session");
//5-4 nueva linea para crud viajes


class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usuarioPath = "/api/usuarios";
    this.authPath = "/api/auth";
    

    //5-4 nueva linea para crud viajes
    this.viajePath = "/api/viajes";

    //Middlewares
    this.middlewares();
    //Rutas de nuestra app
    this.routes();
    //Se inicia la base de datos
    this.conectarDB();
  }

  async conectarDB() {
    await dbConnection();
  }

  middlewares() {
    this.app.use(cors());

    this.app.use(express.json());

    this.app.use(express.static("public"));

    this.app.use(
      session({
        secret: process.env.SESSION_SECRET,
        resave: true,
        saveUninitialized: true,
      })
    );
  }

  routes() {
    this.app.use(this.usuarioPath, require("../routes/usuarios"));
    this.app.use(this.authPath, require("../routes/auth"));
    this.app.use(this.viajePath, require("../routes/viajeRoute"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Servidor corriendo en puerto ${this.port}`);
    });
  }
}

module.exports = Server;
