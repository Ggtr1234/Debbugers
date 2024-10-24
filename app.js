var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const { log } = require('console');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;

const db = require('knex')({
    client:'sqlite3',
     connection: './QRBD.sqlite',
});

////////////////////////////////////////// WEB //////////////////////////////////////
            //////////////////////////// PILOTOS ///////////////////////////////

// INDEX
app.get('/', async (req, res) => {
    const dia = req.params.dia; // Obtener el día de la URL

    const query = await db.select('*').from('DAM2')
    // console.log(query)
    const params = {
        title: 'DAM 2',
        clases: query,
        dia: dia
    }
    console.log(dia)
    res.render('index', params)
});

// app.get('/contact', (req, res) => {
//     res.render('contact',{title:'Contacto'})
// });
// app.get('/about', (req, res) => {
//     res.render('about',{title:'About'})
// });

// app.get('/equipos/detalles/:id',async (req, res) => {
//     const id = req.params.id
//     const query = await equipo.findById(id);
//     console.log(query)
//     const params = {
//         title: 'Detalles Equipo',
//         equipo: query
//     }
//     res.render('detalles_equipo', params)
// });

// app.get('/pilotos/detalles/:id',async (req, res) => {
//     const id = req.params.id
//     const query = await piloto.findById(id);
//     console.log(query)
//     const params = {
//         title: 'Detalles Piloto',
//         piloto: query
//     }
//     res.render('detalles_piloto', params)
// });

// Show ALL Items
app.get('/AulaEx', async (req, res) => {
    const dia = req.params.dia; // Obtener el día de la URL

    const query = await db.select('*').from('AulaEx').orderBy('hora','asc')
    // console.log(query)
    const params = {
        title: 'AulaEx',
        clases: query,
        dia: dia
    }
    console.log(params)
    res.render('pilotos', params);
    
});
app.get('/AulaEx/:dia', async (req, res) => {
    const dia = req.params.dia; // Obtener el día de la URL
    const query = await db.select('hora',dia).from('AulaEx').orderBy('hora', 'asc');
    
    const params = {
        title: 'AulaEx',
        clases: query,
        dia: dia // Pasar el día como parámetro
    };
    res.render('pilotos', params);
});
// UPDATE ITEM
// app.get('/pilotos/update/:id', async (req,res)=>{
//     const id = req.params.id
//     const query = await piloto.findById(id);
//     console.log(query)
//     const params = {
//         title: 'Update Piloto',
//         pilotos: query
//     }
//     res.render('update_piloto', params)
// });

// // Update quipo
// app.post("/pilotos/update", async (req, res)=>{
//     const {_id,apellidospiloto,idequipo,nacionpiloto,nombrepiloto,imagenpiloto,titulospiloto} = req.body
//     console.log('params',{_id,apellidospiloto,idequipo,nacionpiloto,nombrepiloto,imagenpiloto,titulospiloto})
//     try {
//         const result = await piloto.findByIdAndUpdate(_id,{_id,apellidospiloto,idequipo,nacionpiloto,nombrepiloto,imagenpiloto,titulospiloto},{new:true});
//         console.log('insertado!', result)
//         res.redirect('/pilotos')
//     }catch (e) {
//         console.log(e)
//         res.status(500).send('error en el servidor')
//     }
// });
// // INSERT ITEM GET: show form
// app.get('/pilotos/insert', (req,res)=>{
//     res.render('insert_piloto',
//         {title:'insert piloto'}
//     )
// });

// //Insertar piloto
// app.post('/pilotos/insert',async (req, res)=>{
//     const {_id,apellidospiloto,idequipo,nacionpiloto,nombrepiloto,imagenpiloto,titulospiloto} = req.body
//     console.log('params',{_id,apellidospiloto,idequipo,nacionpiloto,nombrepiloto,imagenpiloto,titulospiloto})
//     try {
//         const result = await piloto.create({apellidospiloto,idequipo,nacionpiloto,nombrepiloto,imagenpiloto,titulospiloto})
//         console.log('insertado!', result)
//         res.redirect('/pilotos')
//     }catch (e) {
//         console.log(e)
//         res.status(500).send('error en el servidor')
//     }
// });

//         //////////////////////////// EQUIPOS ///////////////////////////////

// // Show ALL Items
// app.get('/equipos', async (req, res) => {
//     const query = await equipo.find({})
//     // console.log(query)
//     const params = {
//         title: 'Equipos',
//         equipos: query
//     }
//     console.log(params)
//     res.render('equipos', params);
// });
// // Update quipo
// app.post("/equipos/update", async (req, res)=>{
//     const {_id, equinombre,nacionequipo,nombrepiloto,idequipo,nacionespilotos} = req.body;
//     console.log('params',{_id, equinombre,nacionequipo,nombrepiloto,idequipo,nacionespilotos})
//     try {
//         const result = await equipo.findByIdAndUpdate(_id, {equinombre,nacionequipo,nombrepiloto,idequipo,nacionespilotos},{new:true});
//         console.log('insertado!', result)
//         res.redirect('/equipos')
//     }catch (e) {
//         console.log(e)
//         res.status(500).send('error en el servidor')
//     }
// });
// // INSERT ITEM GET: show form
// app.get('/equipos/insert', (req,res)=>{
//     res.render('insert_equipo',
//         {title:'insert equipo'}
//     )
// });
// // INSERT ITEM POST: get params and do your mojo!
// app.post('/equipos/insert',async (req, res)=>{
//     const {_id, equinombre,nacionequipo,nombrepiloto,idequipo,nacionespilotos} = req.body;
//     console.log('params',{_id, equinombre,nacionequipo,nombrepiloto,idequipo,nacionespilotos})
//     try {
//         const result = await equipo.create({equinombre,nacionequipo,nombrepiloto,idequipo,nacionespilotos})
//         console.log('insertado!', result)
//         res.redirect('/equipos')
//     }catch (e) {
//         console.log(e)
//         res.status(500).send('error en el servidor')
//     }
// });
// // UPDATE ITEM
// app.get('/equipos/update/:id', async (req,res)=>{
//     const id = req.params.id
//     const query = await equipo.findById(id);
//     console.log(query)
//     const params = {
//         title: 'Update Equipo',
//         item: query
//     }
//     res.render('update_equipo', params)
// });



// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});
// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

