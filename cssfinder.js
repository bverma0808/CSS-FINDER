// This is application's main file which contains the code to start the server

//************* Dependencies *****************//
var express = require("express"),
    app = express(),
    fs = require('fs'),
    css = require('css'),
    cssDataStore = require("./cssDataStore"),
    config  = require('./config.json'),
    utility = require('./utility');
//*********************************************//



//*******  Reading css filenames *******//
var filenames = utility.getFiles(config.cssFileDirectory, ".css");

if(filenames && filenames.length==0){
  console.log("No CSS file found in the directory specified. Please change the directory which contains some css file and restart the server.");
  process.exit(0);
}
//******************************************************************//



//************** code to load all the css files in memory *************//
var data = '';
for(var i=0; i<filenames.length; i++){
   console.log("loading file:====> " + filenames[i]);
   data += fs.readFileSync(filenames[i]).toString();
}
var cssParsedObject = css.parse(data);
var cssPropertyObject = cssDataStore.getCssPropertyObject(cssParsedObject);
var cssClassObject = cssDataStore.getCssClassObject(cssParsedObject);

//******************************************************************//


//**********************************************************//
//************** EXPRESS-SERVER APIS ***********************//
//**********************************************************//
    /***** api to serve home page ****/
    app.get("/", function(req, res) {
       res.sendfile('home.html');
    });

    app.get("/fetchCssPropertyObject", function(req, res) {
       res.json(cssPropertyObject);
    });

    app.get("/fetchCssClassObject", function(req, res) {
       res.json(cssClassObject);
    });

    /*** api to serve all the static files ***/
    app.get(/^(.+)$/, function(req, res){ 
       //console.log('static file request : ' + req.params);
       res.sendfile( __dirname + req.params[0]); 
    });

    var port = process.env.PORT || config.serverPort || 8080;

    //---------- START SERVER -----------//
    app.listen(port, function() {
     console.log("Server started on port: " + port);
     console.log("Browse to http://localhost:" + port + "/");
    });
//**********************************************************//
//**********************************************************//
//**********************************************************//
