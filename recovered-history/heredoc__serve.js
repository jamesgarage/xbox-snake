const http = require('http'), fs = require('fs'), path = require('path');
const FILE = path.join(__dirname, '.deploy-v26.js');
http.createServer((req, res) => {
  const body = fs.readFileSync(FILE);
  res.writeHead(200, {
    'Content-Type': 'application/javascript',
    'Access-Control-Allow-Origin': '*',
    'Cache-Control': 'no-store'
  });
  res.end(body);
}).listen(8731, '127.0.0.1', () => console.log('serving .deploy-v26.js on http://127.0.0.1:8731/rig.js'));