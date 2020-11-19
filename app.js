const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

var cors = require('cors');

app.use(cors());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Header',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );

    // if (req.method === 'OPTIONS') {
    //     res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    //     return res.status(200).send({});
    // }
    // app.use(cors());
    next();
});


//importando rotas
const rotaUsuario = require('./routes/usuario-route');





app.use(morgan('dev'));
app.use(bodyParser.urlencoded({parameterLimit: 100000,
    limit: '50mb', extended: true }));  // apenas dados simples
app.use(bodyParser.json()); // isso faz com que a app só utilize json

//rotas
app.use('/usuario',rotaUsuario);


module.exports = app;