const express = require('express');
const router = express.Router();

const { shortenUrl, redirectUrl, getUrls } = require('../controllers/urlController');

router.get('/', (req, res) => res.send("Api is Running"))
router.post('/api/shorten', shortenUrl);
router.get(`/api/urls`, getUrls);
router.get('/:shortId', redirectUrl);


module.exports = router;


