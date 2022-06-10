const express = require('express');
const app = express();
const cors = require('cors');

const whitelist = ['http://localhost:3000'];

app.set('port', process.env.PORT || 3000);
app.use(express.json());
app.use(require('./rutas/deudores'));
app.use(require('./rutas/cobradores'));
app.use(require('./rutas/sucursales'));
app.use(require('./rutas/access'));
app.use(cors());

app.listen(app.get('port'),()=>{
    console.log('Server on port', app.get('port'))
})