import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import logger from 'morgan';
import index from '../server/routes/index.route';

const app = express();

// parse body params and attache them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// enable CORS - Cross Origin Resource Sharing
app.use(cors());
app.use(cors({
  // origin: 'http://localhost:8080',
  credentials: true,
  exposedHeaders: ['Content-Disposition']
}));

// HTTP request logger middleware for node.js
if (process.env.NODE_ENV === 'development') {
  app.use(logger('dev'));
}

// prevent GET /favicon.ico
app.use((req, res, next) => {
  if (req.originalUrl === '/favicon.ico') {
    res.status(204).json({ nope: true });
  } else {
    next();
  }
});

// mount all routes on /api path
app.use('/', index);


export default app;
