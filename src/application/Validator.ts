export default interface Validator {
	validateInput(data: unknown): void;
	validateOutput(data: unknown): void;
}
