import { NextFunction, Request, Response } from "express";
import CancelledInsurancePolicyError from "../../../domain/errors/CancelledInsurancePolicyError";
import EquivalentQuoteExistsError from "../../../domain/errors/EquivalentQuoteExistsError";
import InactiveInsurancePolicyError from "../../../domain/errors/InactiveInsurancePolicyError";
import InsurancePolicyNotFoundError from "../../../domain/errors/InsurancePolicyNotFoundError";
import ProposalNotFoundError from "../../../domain/errors/ProposalNotFoundError";
import QuoteAlreadyExistsError from "../../../domain/errors/QuoteAlreadyExistsError";
import QuoteNotFoundError from "../../../domain/errors/QuoteNotFoundError";
import UnpaidProposalError from "../../../domain/errors/UnpaidProposalError";
import UnsignedProposalError from "../../../domain/errors/UnsignedProposalError";
import ValidationError from "../../../domain/errors/ValidationError";
import VehicleNotFoundError from "../../../domain/errors/VehicleNotFoundError";
import VehicleOutOfInsurancePolicyError from "../../../domain/errors/VehicleOutOfInsurancePolicyError";
import EndpointNotFoundError from "../EndpointNotFoundError";
import HttpStatusCode from "../HttpStatusCode";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
	console.error(error);
	if (error instanceof EndpointNotFoundError || error instanceof ValidationError)
		return res.status(HttpStatusCode.BAD_REQUEST).json({ message: error.message });
	if (
		error instanceof QuoteNotFoundError ||
		error instanceof QuoteNotFoundError ||
		error instanceof VehicleNotFoundError ||
		error instanceof ProposalNotFoundError ||
		error instanceof InsurancePolicyNotFoundError
	)
		return res.status(HttpStatusCode.NOT_FOUND).json({ message: error.message });
	if (
		error instanceof CancelledInsurancePolicyError ||
		error instanceof EquivalentQuoteExistsError ||
		error instanceof InactiveInsurancePolicyError ||
		error instanceof QuoteAlreadyExistsError ||
		error instanceof UnpaidProposalError ||
		error instanceof UnsignedProposalError ||
		error instanceof VehicleOutOfInsurancePolicyError
	)
		return res.status(HttpStatusCode.UNPROCESSABLE_CONTENT).json({ message: error.message });
	return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).end();
};
export default errorHandler;
