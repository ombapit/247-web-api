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

const port = process.env.PORT || config.server.port;
app.listen(port);
console.log('Node + Express REST API skeleton server started on port: ' + port);

module.exports = app;