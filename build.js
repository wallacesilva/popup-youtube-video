// this require nodejs
// INSTALL 
// npm install easy-zip
function tD(n){return (n < 10) ? '0'+n: n; }
var fs = require('fs');
var datetime = new Date();
var folderBuilds = 'builds/';
var fileBuildName = folderBuilds
    + datetime.getFullYear()
    + tD(datetime.getMonth()+1)
    + tD(datetime.getDate())
    + '-'
    + tD(datetime.getHours())
    + tD(datetime.getMinutes())
    + tD(datetime.getSeconds())
    + '.crx';

if (!fs.exists(folderBuilds)) {
    fs.mkdir(folderBuilds);
}

var EasyZip = require('easy-zip').EasyZip;

var zip2 = new EasyZip();

var files = [
    {source: 'background.js', target:'background.js'},
    {source: 'jquery.js', target:'jquery.js'},
    {source: 'jquery.urldecoder.min.js', target:'jquery.urldecoder.min.js'},
    {source: 'manifest.json', target:'manifest.json'},
    {source: 'youtube-70-2.png', target:'youtube-70-2.png'},
];
// add files
zip2.batchAdd(files, function(){
    zip2.writeToFile(fileBuildName);
});
zip2.writeToFile(fileBuildName);