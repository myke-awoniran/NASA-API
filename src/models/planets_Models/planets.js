const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse');
const planets = require('./planetModel');

function isHabitablePlanet(planet) {
  return (
    planet['koi_disposition'] === 'CONFIRMED' &&
    planet['koi_insol'] > 0.36 &&
    planet['koi_insol'] < 1.11 &&
    planet['koi_prad'] < 1.6
  );
}

async function getPlanets() {
  return new Promise((resolve, reject) => {
    fs.createReadStream(
      path.join(__dirname, '..', '..', 'data', 'kepler_data.csv')
    )
      .pipe(
        parse({
          comment: '#',
          columns: true,
        })
      )
      .on('data', async (data) => {
        if (isHabitablePlanet(data)) {
          savePlanets(data);
        }
      })
      .on('error', (err) => {
        reject(err);
      })
      .on('end', () => {
        resolve();
      });
  });
}

async function getAllPlanets() {
  return await planets.find({}, { kepler_name: 1, _id: 0 });
}

async function savePlanets(planet) {
  try {
    return await planets.updateOne(
      {
        kepler_name: planet.kepler_name,
      },
      {
        kepler_name: planet.kepler_name,
      },
      { upsert: true }
    );
  } catch (err) {
    console.log(err.message);
  }
}

module.exports = {
  getPlanets,
  getAllPlanets,
};
