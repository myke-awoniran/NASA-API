const { getAllPlanets } = require('../models/planets_Models/planets');
async function httpGetAllPlanets(req, res, next) {
  return res.status(200).json(await getAllPlanets());
}
module.exports = {
  httpGetAllPlanets,
};
