const mysql = require('mysql');

// coneccion a la BD
const mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'app_inci',
    multipleStatements: true
});


mysqlConnection.connect(function(err) {
    if (err) throw err;

    console.log('Estado de BD : \x1b[32m%s\x1b[0m', 'online');

});


// const dbConnection = async() => {
//     try{
//         await mysql.createConnection({
//             host: 'localhost',
//             user: 'root',
//             password: '',
//             database: 'app_inci',
//             multipleStatements: true
//         });
//         console.log('Estado de BD : \x1b[32m%s\x1b[0m', 'online');

//     } catch ( error ) {
//         console.log(error);
//         throw new Error('Error a la hora de iniciar la BD ver logs');        
//     }
// }

// module.exports = {
//     mysqlConnection
// }
module.exports = mysqlConnection;