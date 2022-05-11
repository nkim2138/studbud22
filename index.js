//import package using require syntax
const express = require('express');

//call express function
const app = express();

app.use(express.static('dist'));

//when user lands on root URL then we will run a function which gets the request that user made
app.get('/', function(req, res){
    res.sendFile(__dirname + '/dist/index.html')
})

let server = app.listen(8888, function(){
    console.log("App server is running on port 8888");
});

