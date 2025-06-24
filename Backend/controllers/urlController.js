const { nanoid } = require('nanoid');
const Url = require('../models/Url');


exports.shortenUrl = async (req, res) => {
    try {
        const { originalUrl } = req.body;

        if (!originalUrl || !/^https?:\/\//.test(originalUrl)) {
            return res.status(400).json({ error: 'Invalid or missing URL' });
        }

        let shortId = nanoid(6);
        let existing = await Url.findOne({ where: { shortId } });
        while (existing) {
            shortId = nanoid(6);
            existing = await Url.findOne({ where: { shortId } });
        }

        const newUrl = await Url.create({ shortId, originalUrl });
        const baseUrl = `${req.protocol}://${req.get('host')}`;
        res.json({ shortUrl: `${baseUrl}/${shortId}`, id: shortId });
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
