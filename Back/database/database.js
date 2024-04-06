const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.CONECTARDB);
    console.log("Base de datos Online");
  } catch (error) {
    throw new Error("Error al  iniciar bade de datos");
  }
};

module.exports = dbConnection;
