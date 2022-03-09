const router = require('express').Router();
const {
  httpGetAllLaunches,
  httpCreateLaunch,
  httpAbortLaunch,
} = require('../controllers/launchController');

router.get('/', httpGetAllLaunches);
router.post('/', httpCreateLaunch);
router.delete('/:id', httpAbortLaunch);

module.exports = router;
