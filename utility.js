var fs = require('fs'),
    path = require('path');

/**
 * This function returns names of all the files of the directory
 * whose extension matches the fileType param.
 * @params : 
 *    dir : String,
 *    fileType: String,
 *    files_ : Array of Strings
 *
 * @returns:
 *    Array of Strings
 */
function getFiles (dir, fileType, files_){
    files_ = files_ || [];
    var files = fs.readdirSync(dir);
    for (var i in files){
        var name = dir + '/' + files[i];
        if (fs.statSync(name).isDirectory()){
            getFiles(name, fileType, files_);
        } else{
            var extension = path.extname(name);
            if(extension == fileType){
               files_.push(name);
            } 
        }
    }
    return files_;
}

exports.getFiles = getFiles;