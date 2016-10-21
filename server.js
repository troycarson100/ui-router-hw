var
  express = require('express'),
  app = express(),
  mongoose = require('mongoose'),
  bodyParser = require('body-parser'),
  logger = require('morgan'),
  PORT = process.env.PORT || 3000

mongoose.connect('mongodb://localhost/ui-router-hw', function(err){
  console.log(err || "Mongo Connected")
})

var todoList = mongoose.Schema({
  item: {type: String, required: true},
  status: Boolean
},{timeStamp: true})

var Todo = mongoose.model('Todo', todoList)

app.use(bodyParser.json())
app.use(logger('dev'))
app.use(express.static('public'))

app.get('/', function(req, res){
  res.sendFile('index.html', {root: __dirname})
})

app.get('/api/todos', function(req, res){
  Todo.find({}, function(err, todos){
    if(err) return console.log(err)
    res.json(todos)
  })
})
app.post('/api/todos', function(req, res){
  Todo.create(req.body, function(err){
    if(err) return console.log(err)
    res.json({message: 'A todo list was created'})
  })
})
app.delete('/api/todos/:id', function(req, res){
  Todo.findByIdAndRemove(req.params.id, function(err){
    if(err) return console.log(err)
    res.json({message: 'A todo list was destroyed'})
  })
})


app.listen(PORT, function(err){
  console.log(err || `Server is running on ${PORT}`)
})
