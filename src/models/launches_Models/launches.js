const axios = require('axios');
const Launch = require('./launchModel');
const AppError = require('../../utils/AppError');
const response = require('../../utils/response');
const planets = require('../planets_Models/planetModel');

const DEFAULT_FLIGHT_NUMBER = 100;

const SPACEX_API_URL = 'https://api.spacexdata.com/v4/launches/query';

const launch = {
  flightNumber: 100,
  mission: 'Kepler Exploration X ',
  rocket: 'Explorer IS1',
  launchDate: new Date('December 27,2030'),
  target: 'Kepler-1652 b',
  customers: ['ZTM', 'NASA'],
  upcoming: true,
  success: true,
};
saveLaunch(launch);
async function getLatestFlightNumber() {
  const latestLaunch = await Launch.findOne().sort('-flightNumber');
  if (!latestLaunch) return DEFAULT_FLIGHT_NUMBER;
  return latestLaunch.flightNumber;
}
async function saveLaunch(launch) {
  await Launch.findOneAndUpdate(
    {
      flightNumber: launch.flightNumber,
    },
    launch,
    {
      upsert: true,
    }
  );
}
async function findLaunch(filter) {
  return await Launch.findOne(filter);
}
async function populateLaunches() {
  console.log('Downloading launches data ....');
  const response = await axios.post(SPACEX_API_URL, {
    query: {},
    options: {
      pagination: false,
      populate: [
        {
          path: 'rocket',
          select: {
            name: 1,
          },
        },
        {
          path: 'payloads',
          select: {
            customers: 1,
          },
        },
      ],
    },
  });

  response.data.docs.forEach(async (doc) => {
    const customers = doc.payloads.flatMap((payload) => {
      return payload.customers;
    });
    const launch = {
      flightNumber: doc.flight_number,
      mission: doc.name,
      rocket: doc.rocket.name,
      launchDate: doc.date_local,
      customers,
      upcoming: doc.upcoming,
      success: doc.success,
    };
    await saveLaunch(launch);
    if (response.status !== 200) {
      console.error('Problem loading space X data');
      throw new Error('space x data download failed');
    }
  });
}

async function loadSpaceLaunchData() {
  await populateLaunches();
}

async function scheduleNewLaunch(launch) {
  const planet = await planets.findOne({ kepler_name: launch.target });
  if (!planet) {
    throw new AppError('No matching planet(s) found', 404);
  }
  const newFlightNumber = (await getLatestFlightNumber()) + 1,
    newLaunch = Object.assign(launch, {
      success: true,
      upcoming: true,
      flightNumber: newFlightNumber,
      customers: ['Zero to Mastery', 'NASA'],
    });
  await saveLaunch(newLaunch);
}

async function httpAddNewLaunch(req, res, next) {
  try {
    const launch = req.body;
    if (
      !launch.target ||
      !launch.mission ||
      !launch.rocket ||
      !launch.launchDate
    )
      return next(new AppError('Missing required launch property', 400));
    launch.launchDate = new Date(launch.launchDate);
    if (isNaN(launch.launchDate))
      return next(new AppError('Invalid Launch Date', 400));
    await scheduleNewLaunch(launch);
    return response(res, 201, 'success', launch);
  } catch (err) {
    return next(new AppError('kindly try again', 400));
  }
}

async function getAllLaunches(req, res, next) {
  const query = req.query;

  const launches = await Launch.find({}, { __v: 0, _id: 0 })
    .sort('-flightNumber')
    .limit(+req.query.limit)
    .skip(+(req.query.page - 1) * req.query.limit);
  if (!launches) return next(new AppError('No Launch found', 404));
  return response(res, 200, 'success', launches);
}

async function abortLaunch(req, res, next) {
  const launchExist = await findLaunch({ flightNumber: req.params.id });
  if (!launchExist) return next(new AppError('launch not found', 404));
  const aborted = await Launch.updateOne(
    { flightNumber: req.params.id },
    {
      success: false,
      upcoming: false,
    }
  );
  if (!aborted) return next(new AppError('cannot abort launch', 400));
  return response(res, 200, 'success', aborted.modifiedCount);
}

module.exports = {
  httpAddNewLaunch,
  getAllLaunches,
  abortLaunch,
  loadSpaceLaunchData,
};
