
var app = require('../app'); //Require our app
 
app.set('port', process.env.PORT || 3000);
 
var server = app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + server.address().port);
});; var employee= require('../models/employee');
var express = require('express');
var router = express.Router();


router.route('/employees')

   .get(function(req, res) {
  employee.find(function(err, data) {
    if (err) {
	  // insert correct status code	
      return res.send(err);
    } 
	console.log("/employees : JSON response body : " + data);
    res.json(data);
	res.end();
  });
})


//router.route('/employees')
   .post(function(req, res) {

var emp = new employee(req.body);
 emp.name = req.body.name;
 emp.salary = req.body.salary;
 emp.department = req.body.department;

   //res.end(JSON.stringify(emp));
   
   emp.save(function(err,data) {
    if (err) {
      return res.send(err);
    }
 
    res.send({ message: 'employee Added'});
   res.json(data);


  });
//res.end();
  
});


  
router.route('/employees/:id')
.put(function(req,res){
employee.findOne({ _id: req.params.id }, function(err,emp) {
  

	emp.name = req.body.name;
    emp.salary = req.body.salary;
     emp.department = req.body.department;
    
		 emp.save(function(err) {
      if (err) {
        return res.send(err);
		
                }
         
         console.log("name"+emp._id);
         console.log("name"+emp.name);
         res.json({ message: 'employee updated!' });
		   
    });
  });
  //res.end();
})
  



//router.route('/employees/:id')
.delete(function(req, res) {
  employee.remove({
    _id: req.params.id
  }, function(err) {
    if (err) {
      return res.send(err);
    }
 
    res.json({ message: 'Successfully deleted' });
  });
});



module.exports = router;
;
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var employees = require('./routes/employees'); //routes are defined here
var app = express(); //Create the Express app

app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//app.use(bodyParser.text({ type: 'text/html' }))

app.use(bodyParser.urlencoded( { extended : true}));
app.use('/api', employees); //This is our route middleware



var dbName = 'empdb';
var connectionString = 'mongodb://localhost:27017/' + dbName;
 mongoose.connect(connectionString);

module.exports = app;
