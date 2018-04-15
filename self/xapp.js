const http2 = require('http2');
const fs = require('fs');
const fU = require('./fileUpload.js')
const express = require('express');
const app = new express();



const server = http2.createSecureServer({
  key: fs.readFileSync('localhost-privkey.pem'),
  cert: fs.readFileSync('localhost-cert.pem')
});

server.on('error', (err) => console.error(err));

server.on('stream', (stream, headers) => {
  // stream is a Duplex
  stream.respond({
    'content-type': 'text/html',
    ':status': 200
  });
  stream.end(app.get('/', function(request, response){
    response.sendfile('index.html');}))
});

server.listen(8443);