const express = require('express');

const router = express.Router();

router.use('/owner', require('./owner.route'));
router.use('/player', require('./player.route'));
router.use('/contact', require('./contact.route'))
router.use('/stadium', require('./stadium.route'))
router.use('/reservation', require('./reservation.route'));

module.exports = router;