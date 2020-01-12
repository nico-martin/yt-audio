import {getInfo, chooseFormat} from 'ytdl-core';
import express from 'express';
const PORT = process.env.PORT || 2005;

let app = express();
app.get('/', (req, res) => {
	getInfo(req.query.v, (err, info) => {
		res.redirect(chooseFormat(info.formats, {filter: "audioonly"}).url);
	});
});

app.listen(PORT, () => console.log(`APP listening to ${PORT}!`));
