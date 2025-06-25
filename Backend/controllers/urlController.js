const { nanoid } = require('nanoid');
const Url = require('../models/Url');
const { escapeId } = require('mysql2');


exports.shortenUrl = async (req, res) => {
    try {

        const { originalUrl } = req.body;

        if (!originalUrl || !/^https?:\/\//.test(originalUrl)) {
            return res.status(400).json({ error: 'Invalid or missing URL' });
        }

        const baseUrl = `${req.protocol}://${req.get('host')}`;

        //  Checking if URL is already shortened
        let existing = await Url.findOne({ where: { originalUrl } });

        if (existing) {
            return res.json({ shortUrl: `${baseUrl}/${existing.shortId}`, id: existing.shortId })
        }

        // Otherwise Generating unique shortId of new URL
        let shortId = nanoid(6);

        // Checking if any such shortId exists
        let idExists = await Url.findOne({ where: { shortId } });
        while (idExists) {
            shortId = nanoid(6);
            idExists = await Url.findOne({ where: { shortId } });
        }

        // Save new ShortUrl
        const newUrl = await Url.create({ shortId, originalUrl });

        res.json({ shortUrl: `${baseUrl}/${shortId}`, id: shortId });

    } catch (err) {
        console.log(err, 'err in shorten ')
    }
};

exports.getUrls = async (req, res) => {
    try {
        let urls = await Url.findAll();
        res.json({ urls });
    } catch (err) {
        console.log(err, 'err in shorten ')
    }
};

exports.redirectUrl = async (req, res) => {
    const { shortId } = req.params;
    const urlEntry = await Url.findOne({ where: { shortId } });
    if (!urlEntry) return res.status(404).send('URL not found');
    res.redirect(urlEntry.originalUrl);
};
