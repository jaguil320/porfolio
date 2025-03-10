const express = require('express');
const app = express.Router();
const bodyparser = require('body-parser');
const nodemailer = require('nodemailer');
const axios = require('axios');
const path = require('path');

app.use('/', express.static(path.resolve('src', 'views', 'home')));
app.use('/', express.static(path.resolve('src', 'views', 'about')));
app.use('/', express.static(path.resolve('src', 'views', 'notificacion')));

app.use(express.json());
app.use(bodyparser.urlencoded({extended: true}));

app.post("/send-email", (req,res)=>{
    const {name, email, telefono, mensaje} = req.body;
    //console.log(mensaje, name, email,telefono)

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'Jaguil320@gmail.com',
            pass: 'rvpg nyco trir sluv',
        },
    });

    const mailOptions = {
        from: email,
        to: req.body.name,
        cc:'Jaguil320@gmail.com',
        subject: 'Mensaje de contacto ' + name,
        html: 
        `<h1>informacion del contacto</h1>
        <p>Nombre: ${name}</p>
        <p>Email: ${email}</p>
        <p>Telefono: ${telefono}</p>
        <p>Mensaje: ${mensaje}</p>`, 
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
          return res.status(500).send('Error al enviar el correo');
        } else {
          console.log('Correo enviado: ' + info.response);
          res.status(200).redirect('/succed.html');
        }    
      });

});

app.get('/external-data', async (res) => {
    try {
      // Hacemos la solicitud a la URL externa
      const response = await axios.get(
        'https://www.linkedin.com/in/jaguil2024/',
        'https://github.com/jaguil320', 
        '//www.twitch.tv/kidjt20', 
        'https://www.instagram.com/jaguil.vzla/profilecard/?igsh=MTd3b2wyY3VrdWpjcA=='
      );
  
      // Enviamos los datos recibidos al cliente
      res.json(response.data);
    } catch (error) {
      console.error('Error al obtener los datos:', error);
      res.status(500).send('Error al obtener los datos');
    }
  });
  
  module.exports = app;