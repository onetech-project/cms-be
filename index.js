const env = require('dotenv');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();

// Loading Routes
const routes = [
  require('./app/auth/router'),
  require('./app/banner/router'),
  require('./app/blog/router'),
  require('./app/blogCategories/router'),
  require('./app/general/router'),
  require('./app/users/router'),
];
const sequelize = require('./database');
const error = require('./middleware/error');
const requestNotFound = require('./middleware/requestNotFound');
const currentUser = require('./middleware/currentUser');

env.config();

app.use(helmet());

// parse json request body
app.use(bodyParser.json({ limit: '50mb' }));

// parse urlencoded request body
app.use(bodyParser.urlencoded({ extended: true, limit: '100mb' }));

// enable request file upload
app.use(fileUpload());

// enable cors
app.use(cors());

// parse current user
app.use(currentUser);

routes.forEach((route) => {
  app.use('/api', route);
});

sequelize
  .sync()
  .then(() => {
    app.listen(process.env.PORT);
    if (!fs.existsSync('tmp')) {
      fs.mkdirSync('tmp');
    }
    console.log(`App listening on port ${process.env.PORT}`);
  })
  .catch((err) => {
    console.log(err);
  });

process.on('uncaughtException', (err) => {
  console.error(err);
});

process.on('unhandledRejection', (err) => {
  console.error(err);
});

app.use(requestNotFound);

app.use(error);
