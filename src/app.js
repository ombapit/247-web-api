import cluster from 'cluster';
import numCPUs from 'os';
import path from 'path';
import express from 'express';
import morgan from 'morgan';
import jwt from 'jsonwebtoken';

// import User from './models/user';
// import Item from './models/item';

import config from 'config';
// import db from './db/db';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));
app.use(require('expressjs.routes.autoload')(path.join(__dirname, './routes'), true));

// const cpu = numCPUs.cpus().length
const cpu = 1
const port = process.env.PORT || config.server.port;

if (cluster.isMaster) {
  console.log('Express REST API started on port: ' + port + `, Primary ${process.pid} started`);

  // Fork workers.
  for (let i = 0; i < cpu; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {  
  app.listen(port);

  console.log('Express REST API started on port: ' + port + `, Worker ${process.pid} started`);
}

module.exports = app;