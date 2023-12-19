import QuoteFilter from "../filters/QuoteFilter";

export default class QuotesNotFoundError extends Error {
	constructor(filter: QuoteFilter) {
		super(`No quotes match the filter ${filter}.`);
	}
}
