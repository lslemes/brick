import { NextFunction, Request, Response } from "express";
import EndpointNotFoundError from "../EndpointNotFoundError";
import HttpStatusCode from "../HttpStatusCode";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
	console.error(error);
	if (error instanceof EndpointNotFoundError)
		return res.status(HttpStatusCode.BAD_REQUEST).json({ message: error.message });
	return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).end();
};
export default errorHandler;
