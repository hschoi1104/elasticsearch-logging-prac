import express from 'express';
import { logger, stream } from './config/winston';
import morgan from 'morgan';
import path from 'path';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import indexRouter from './routes/index';
import cors from 'cors';

var app = express();
dotenv.config();

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('dev', { stream }));

app.use('/api/v1', indexRouter);

global.logger = logger;

// errorHandler
// eslint-disable-next-line no-unused-vars
app.use(function (err, req, res, next) {
  logger.error(err.message);
  return res.status(err.statusCode || 500).json({
    statusCode: err.statusCode,
    status: 'Error',
    message: err.message,
  });
});

// Connect Mongodb
const db = mongoose.connection;
db.on('error', console.error);
db.once('open', function () {
  logger.info('Connected to mongod server');
});
mongoose.connect(process.env.MONGO_URI, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

module.exports = app;
