const express = require('express');
const cors = require("cors")
const session = require('express-session');
const helmet = require("helmet")
require("./libs/initialSetup")

//inicializaciones
const bodyParser = require('body-parser');
const app = express();
require('./database')

const path = require('path');
const morgan = require('morgan');

//configuraciones
app.set('port', process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(
    cors({
      // origin: "http://localhost:3000",
    })
)
app.use(helmet());

//middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(session({
    secret:'misessionsecreta',
    resave:true,
    saveUninitialized:true
}));

//rutas
app.use('/api/user', require('./rutas/index'));
app.use('/api/forgot', require('./rutas/forgotpassword'))


app.listen(app.get('port'), () => {
    console.log('Servidor en puerto', app.get('port'));
});

