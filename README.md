## Steps to get started:

#####Step 1 : Clone the project

#####Step 2 : Navigate to the project home directory and run command 'npm install'

#####Step 3 : use command 'node cssfinder.js' to start the server and browse to "http://localhost:8081/"

By default the application tries to load the css files from its home directory (CSS_FINDER_HOME), So to load the CSS files from a different directory you need to follow the following steps:

####To change the css files directory
You need to change the value of "cssFileDirectory" property in file CSS_FINDER_HOME/config.json, Its value should specify the path to the directory containing CSS files, one thing to note here is that the application loads the css files recursively from the cssFileDirectory.

####To change the server application port
#####Step 1 : You need to change the value of "serverPort" property in file CSS_FINDER_HOME/config.json
   
#####Step 2 : Change the "hostName" property in CSS_FINDER_HOME/client.js file according to the "serverPort" property value of CSS_FINDER_HOME/config.json file.


See [wiki](https://github.com/bverma0808/CSS-FINDER/wiki) pages to know more about the application
