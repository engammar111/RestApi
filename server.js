require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect(
  process.env.DATABASE_URL,
  { useNewUrlParser: true },
  { useUnifiedTopology: true }
);

const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('connected to  new database '));

app.use(express.json());
const membersRouter = require('./routes/members');
app.use('/members', membersRouter);
// localhost:3000/members/sgfs

app.listen(3000, () => console.log('server started at port 3000'));
