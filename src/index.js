require("dotenv").config();

const http = require('http');
const app = require('./server');
const server = http.createServer(app);

require('./database');
require('./sockets').connection(server);

server.listen(3000);
console.log("Server on port", 3000);
