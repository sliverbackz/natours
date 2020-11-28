const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT_EXCEPTION!! 😓 Shutting Down');
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('DB connection successful!'));

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION!! 😓 Shutting Down');
  console.log(err.name, err.message);
  //server will close gracefully
  server.close(() => {
    process.exit(1);
  });
});

//heroku shutdown app coz sigterm condition
process.on('SIGTERM', () => {
  console.log(' 😿 SIGTERM RECEVIED! Shutting Down gracefully');
  server.close(() => {
    console.log('😇 Process terminated!');
  });
});
