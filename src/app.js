import cluster from 'cluster';
import numCPUs from 'os';
import express from 'express';
import morgan from 'morgan';
import jwt from 'jsonwebtoken';

// import User from './models/user';
// import Item from './models/item';

import config from 'config';
// import db from './db/db';
import routes from './routes';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));
app.use('/', routes);

const cpu = numCPUs.cpus().length
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