import path from 'path';
import { fileURLToPath } from 'url';

import Express from 'express';

const __filename = path.resolve(fileURLToPath(import.meta.url), '..');
const __dirname = path.dirname(__filename);

const hostname = 'localhost';
const port = 8000;
const repository = path.basename(__dirname);
const folder = '/docs';

const app = Express();

app.listen(port, () => {
	console.log(`Server running at http://${hostname}:${port}/${repository}/`);
});

app.use(`/${repository}`, Express.static(path.join(__dirname, folder)));

app.use((req, res) => {
	res.status(404).sendFile(path.join(__dirname, `${folder}/404.html`));
});
