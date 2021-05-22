const express= require('express');


const favicon= require('serve-favicon');
const createError= require('http-errors');
const path=require('path')
const app=express();




const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
//app.use(express.static('public'));  //tell express to use static things like ,logo and css
app.use(express.json());
const connectDB = require('./config/db');
connectDB();

app.use(favicon(path.join(__dirname,'public', 'favicon.ico')));
//template engine
app.set('views', path.join(__dirname, '/views'));
app.set('view engine','ejs');
app.engine('html', require('ejs').renderFile);

//routes
app.use('/api/files', require('./routes/files'));
app.use('/files', require('./routes/show'));
app.use('/files/download', require('./routes/download'));

//catch 404 and forward

app.use((req,res, next)=>{
    next(new createError.NotFound());
});

//error handler
app.use((err,req,res, next)=>{
    res.status(err.status || 500);
    res.render('error.html',{err});
});



app.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}`);
})