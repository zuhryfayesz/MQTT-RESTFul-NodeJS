// MQTT-MySQL-Restful   : An Open Source Project
// Author               : Zuhry Fayesz
// Project Repositories : https://github.com/zuhryfayesz/MQTT-RESTFul-NodeJS.git


// Import required Node dependencies and modules
var app   	   = require('express')();
var http       = require('http').Server(app);
var mysql      = require('mysql');
var bodyParser = require("body-parser");
var mqtt       = require('mqtt');

// Initialize the mqtt client
var client     = mqtt.connect('tcp://iot.eclipse.org');

// MQTT onConnect function
client.on('connect', function () {
   	 client.subscribe('zuhry');
     client.publish('zuhry', 'Hello Zuhry');
});

// Initialize the MySQL database connectivity
var connection = mysql.createConnection({
		host     : 'localhost',
		user     : 'root',
		password : '',
		database : 'books',
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// MQTT message callback function
client.on('message', function (topic, message) {
      // message is Buffer convert to String 
	  console.log(topic.toString());
	  console.log(message.toString());
	  var payload = message.toString();
	  var message_topic = topic.toString();

	  var data = {
		"error":1,
		"Books":""
	};

	  connection.query("INSERT INTO mqtt VALUES(?,?)",[payload,message_topic],function(err, rows, fields){
			if(!!err){
				client.publich('fayesz', 'Unable to save the data to the database');
			}else{
				client.publish('fayesz', 'saved to database !!!');
			}
			
		});
	  //client.end();
});


// Default index route URL for the API
app.get('/',function(req,res){

	var data     = {
		"Data":""
	};
	data["Data"] = "Welcome to Book Store DEMO...";
	res.json(data);

});


// API call to list down all available books
app.get('/book',function(req,res){

	var data = {
		"error":1,
		"Books":""
	};
	
	connection.query("SELECT * from book",function(err, rows, fields){
		if(rows.length != 0){
			data["error"] = 0;
			data["Books"] = rows;
			res.json(data);
		}else{
			data["Books"] = 'No books Found..';
			res.json(data);
		}
	});

});


// API call to get a specific book detials
app.post('/book/id', function(req,res){
	var Id = req.body.id;
	var data = {
		"error":1,
		"Books":""
	};

	connection.query("SELECT * from book WHERE id=?",[Id],function(err, rows, fields){
		if(rows.length != 0){
			data["error"] = 0;
			data["Books"] = rows;
			res.json(data);
		}else{
			data["Books"] = 'No book Found in this id ... ';
			res.json(data);
		}
	});
});


// API call to ADD a new book to the database
app.post('/book',function(req,res){

	var Bookname   = req.body.bookname;
	var Authorname = req.body.authorname;
	var Price      = req.body.price;

	var data = {
		"error":1,
		"Books":""
	};

	if(!!Bookname && !!Authorname && !!Price){
		connection.query("INSERT INTO book VALUES('',?,?,?)",[Bookname,Authorname,Price],function(err, rows, fields){
			if(!!err){
				data["Books"] = "Error Adding data";
			}else{
				data["error"] = 0;
				data["Books"] = "Book Added Successfully";
			}
			res.json(data);
		});
	} else {
		data["Books"] = "Please provide all required data (i.e : Bookname, Authorname, Price)";
		res.json(data);
	}

});


// API call to UPDATE an existing book
app.put('/book',function(req,res){

	var Id         = req.body.id;
	var Bookname   = req.body.bookname;
	var Authorname = req.body.authorname;
	var Price      = req.body.price;
	
	var data = {
		"error":1,
		"Books":""
	};

	if(!!Id && !!Bookname && !!Authorname && !!Price){
		connection.query("UPDATE book SET BookName=?, AuthorName=?, Price=? WHERE id=?",[Bookname,Authorname,Price,Id],function(err, rows, fields){
			if(!!err){
				data["Books"] = "Error Updating data";
			}else{
				data["error"] = 0;
				data["Books"] = "Updated Book Successfully";
			}
			res.json(data);
		});
	} else {
		data["Books"] = "Please provide all required data (i.e : id, Bookname, Authorname, Price)";
		res.json(data);
	}

});



// API call to DELETE an existing book
app.delete('/book',function(req,res){

	var Id   = req.body.id;
	var data = {
		"error":1,
		"Books":""
	};
	if(!!Id){
		connection.query("DELETE FROM book WHERE id=?",[Id],function(err, rows, fields){
			if(!!err){
				data["Books"] = "Error deleting data";
			}else{
				data["error"] = 0;
				data["Books"] = "Delete Book Successfully";
			}
			res.json(data);
		});
	} else {
		data["Books"] = "Please provide all required data (i.e : id )";
		res.json(data);
	}

});

// Start and initialize the node server on local host port 8080
http.listen(8080,function(){
	console.log("Connected & Listen to port 8080");
});
