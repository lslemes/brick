import "dotenv/config";
import express from "express";
import EndpointNotFoundError from "./EndpointNotFoundError";
import errorHandler from "./middlewares/errorHandler";

const PORT = process.env.API_PORT;
const app = express();

async function start() {
	try {
		app.use(express.json());
		app.use((req, res, next) => next(new EndpointNotFoundError(req.method, req.path)));
		app.use(errorHandler);

		app.listen(PORT, () => {
			console.log(`Listening at port: ${PORT}.`);
		});
	} catch (error) {
		console.error(error);
		process.exit(1);
	}
}
start();
