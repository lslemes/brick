import QuoteEntity from "../entities/QuoteEntity";

export default class QuoteNotFoundError extends Error {
	constructor(id: QuoteEntity["id"]) {
		super(`Quote ${id} not found.`);
	}
}
