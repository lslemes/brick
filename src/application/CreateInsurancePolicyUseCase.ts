import CreateInsurancePolicyInput from "../domain/contracts/input/CreateInsurancePolicyInput";
import CreateInsurancePolicyOutput from "../domain/contracts/output/CreateInsurancePolicyOutput";
import UseCase from "./UseCase";
import Validator from "./Validator";

export default class CreateInsurancePolicyUseCase extends UseCase<
	CreateInsurancePolicyInput,
	CreateInsurancePolicyOutput
> {
	constructor(validator: Validator) {
		super(validator);
	}

	protected async _execute(input: CreateInsurancePolicyInput): Promise<CreateInsurancePolicyOutput> {
		throw new Error("Not yet implemented.");
	}
}
