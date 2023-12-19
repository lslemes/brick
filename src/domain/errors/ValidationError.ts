export default class ValidationError extends Error {
	constructor(cause: unknown) {
		super("", { cause });
	}
}
