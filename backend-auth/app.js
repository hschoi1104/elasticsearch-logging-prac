import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import indexRouter from './routes/index';
import cors from 'cors';
import { logger } from './config/winston';

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

app.use((req, res, next) => {
  // const {url,method,header} = req;
  logger.info({ req });
  next();
});

app.use('/api/v1', indexRouter);

// errorHandler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
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
