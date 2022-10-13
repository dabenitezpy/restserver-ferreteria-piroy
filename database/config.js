const mongoose = require('mongoose');

const dbConnection = async() => {

    try {

        mongoose.connect(process.env.MONGODB_CNN);

        console.log('Base de datos online!!');

        
    } catch (error) {
        throw new Error('Error en la conexión de base de datos');

    }

}

module.exports = {
    dbConnection
}