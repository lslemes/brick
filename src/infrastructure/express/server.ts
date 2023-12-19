import "dotenv/config";
import express from "express";
import { insurancePolicyController } from "../../dependencies";
import EndpointNotFoundError from "./EndpointNotFoundError";
import errorHandler from "./middlewares/errorHandler";

const PORT = process.env.API_PORT;
const app = express();

// TODO: https://expressjs.com/en/advanced/best-practice-security.html
// TODO: https://expressjs.com/en/advanced/best-practice-performance.html
// TODO: unit tests with jest
// TODO: request tests with supertest
// TODO: validation with zod
// TODO: ORM with prisma
async function start() {
	try {
		app.use(express.json());
		app.use("/insurance-policies", insurancePolicyController.router);
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
