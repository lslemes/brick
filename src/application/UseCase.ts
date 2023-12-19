import Validator from "./Validator";

export default abstract class UseCase<Input, Output> {
	constructor(private readonly validator: Validator) {}

	protected abstract _execute(input: Input): Promise<Output>;

	async execute(input: Input): Promise<Output> {
		this.validator.validateInput(input);
		const output = await this._execute(input);
		this.validator.validateOutput(output);
		return output;
	}
}
