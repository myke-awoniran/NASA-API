const router = require('express').Router();
const { httpGetAllPlanets } = require('../controllers/planetController');

router.get('/', httpGetAllPlanets);
module.exports = router;
