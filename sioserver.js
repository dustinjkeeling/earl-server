var app = require('http').createServer()
  , io = require('socket.io').listen(app)
  , fs = require('fs')
  , dt = require('./datetime')
  , logger = require('./util.js');

app.listen(3000);
//app.listen(3500, '192.168.1.101');
//io.set('log level', 1);

function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

io.sockets.on('connection', function (socket) {
  socket.on('command', function (data) {
    console.log(data.command + "  " + dt.getDateTime());
  });
  socket.on('data', function (data) {

    var sp = '';
    var d = data.data;
    console.log(d + dt.getDateTime());
    logger.saveToFile(d);

    switch(d)
    {
      case 'light on':
        sp = 'Light is now on'
        console.log(sp + dt.getDateTime());
        break;
      case 'light off':
        sp = 'Light is now off'
        console.log(sp + dt.getDateTime());
        break;
      case 'temperature':
        sp = 'The temperature is 65 degrees fahrenheit'
        console.log(sp + dt.getDateTime());
        break;
      case 'house status':
      case 'House status':
        sp = 'The doors are closed.  Windows are closed.  The fridge is closed and at 36 degrees fahrenheit'
        console.log(sp + dt.getDateTime());
        break;
      case 'courtney keeling':
      case 'Courtney Keeling':
        sp = 'Courtney Keeling is the best mother and wife around!'
        break;
      case 'beat box':
      case 'Beatbox':
      case 'beatbox':
        sp = "pv zk pv pv zk pv zk kz zk pv pv pv zk pv zk zk pzk pzk pvzkpkzvpvzk kkkkkk bsch"
        break;
    }

    socket.emit('speech', { text:  sp});

  });
});
