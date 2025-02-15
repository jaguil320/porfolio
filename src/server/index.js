const express = require('express');
const app = express();
const router = require('../routes/enviarMensaje');


//ruta del backend 
app.use('/', router);
app.use('/notificacion', router);



app.listen(3000, ()=>{
    console.log('Server is running on port 3000')
});



