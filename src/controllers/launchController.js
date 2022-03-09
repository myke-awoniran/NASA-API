const {
  httpAddNewLaunch,
  getAllLaunches,
  abortLaunch,
} = require('../models/launches_Models/launches');

async function httpGetAllLaunches(req, res, next) {
  getAllLaunches(req, res, next);
}
function httpCreateLaunch(req, res, next) {
  httpAddNewLaunch(req, res, next);
}
function httpAbortLaunch(req, res, next) {
  abortLaunch(req, res, next);
}

module.exports = {
  httpGetAllLaunches,
  httpCreateLaunch,
  httpAbortLaunch,
};
