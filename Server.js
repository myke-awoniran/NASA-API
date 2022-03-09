const http = require('http');
const App = require('./App');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const server = http.createServer(App);
dotenv.config({ path: './config.env' });
const { getPlanets } = require('./src/models/planets_Models/planets');
const {
  loadSpaceLaunchData,
} = require('./src/models/launches_Models/launches');

const db = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

async function connectDB() {
  await mongoose
    .connect(db)
    .then((res) => {
      console.log('Database connected successfully');
    })
    .catch((err) => {
      console.log(err.message);
    });
}

const port = process.env.PORT1 || process.env.PORT2;
async function startServer(db) {
  await connectDB();
  await getPlanets();
  await loadSpaceLaunchData();
  server.listen(port, () => {
    console.log(`App running on port ${port}`);
  });
}

startServer();
