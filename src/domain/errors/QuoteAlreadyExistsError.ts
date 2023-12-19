import QuoteEntity from "../entities/QuoteEntity";

export default class QuoteAlreadyExistsError extends Error {
	constructor(id: QuoteEntity["id"]) {
		super(`Quote ${id} is already in this insurance policy.`);
	}
}
