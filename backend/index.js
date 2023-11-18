const express = require('express');
const cors = require("cors")
require("./src/libs/initialSetup")

//inicializaciones
const bodyParser = require('body-parser');
const app = express();
require('./database')

const path = require('path');
const morgan = require('morgan');

//configuraciones
app.set('port', process.env.PORT || 3000);
app.use('/uploads', express.static(path.resolve('uploads')));
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

//middlewares
app.use(morgan('dev'));

//rutas
app.use('/api/user', require('./src/rutas/index'));

app.listen(app.get('port'), () => {
    console.log('Servidor en puerto', app.get('port'));
});
