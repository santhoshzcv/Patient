var express     =  require('express');
var app         =  express();
var port        =  process.env.PORT || 3000;
var morgan      =  require('morgan')
const mongoose  =  require('mongoose');
var router      =  express.Router();
var appRoutes   =  require('./app/routes/api')(router)
var bodyParser  =  require('body-parser');
var cors        =  require('cors')

app.use(express.static('static'));
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev'));
app.use('/api',appRoutes);


mongoose.connect('mongodb://localhost:27017/patient', {useNewUrlParser: true},function(err){
    if(err){
     console.log("not connected to the database",+err);
    }else{
      console.log("connected to the mongoDB");
    }
});
mongoose.set('useCreateIndex', true)
app.listen(port,function(){
    console.log('running  the server',+port)
});