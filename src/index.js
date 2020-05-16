const express = require('express');
const morgan = require('morgan');
const { mongoose } = require('./database')
const app = express();

//settings
app.set('port', process.env.PORT || 3000)

//middelwares
app.use(morgan('dev'));
app.use(express.json());

//routes
app.use('/api/tasks', require('./routes/task.routes'));

//static files 
app.use(express.static(__dirname + '/public'));

//start server
app.listen(app.get('port'), ()=> {
	console.log(`Server on port ${app.get('port')}`);
})