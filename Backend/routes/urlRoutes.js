const express = require('express');
const router = express.Router();

const { shortenUrl, redirectUrl } = require('../controllers/urlController');

router.get('/', (req, res) => res.send("Api is Running"))
router.post('/api/shorten', shortenUrl);
router.get('/:shortId', redirectUrl);


module.exports = router;


