var FtpDeploy = require('ftp-deploy');
var ftpDeploy = new FtpDeploy();

config = require('./deploySettings.json')
config.localRoot = __dirname,

// use with promises
ftpDeploy.deploy(config)
    .then(res => console.log('finished:', res))
    .catch(err => console.log(err))
    
// use with callback
ftpDeploy.deploy(config, function(err, res) {
    if (err) { 
      console.log(err);
    } else {
      console.log('finished:', res);
    }
    ftpDeploy.end();
});

ftpDeploy.on('uploading', function(data) {
  data.totalFilesCount;
  data.transferredFileCount;
  data.filename;
});
ftpDeploy.on('uploaded', function(data) {
  console.log(data);
  ftpDeploy.end();
});
ftpDeploy.on('log', function(data) {
  console.log(data);
});
