import GetInsurancePolicyInput from "../domain/contracts/input/GetInsurancePolicyInput";
import GetInsurancePolicyOutput from "../domain/contracts/output/GetInsurancePolicyOutput";
import UseCase from "./UseCase";
import Validator from "./Validator";

export default class GetInsurancePolicyUseCase extends UseCase<GetInsurancePolicyInput, GetInsurancePolicyOutput> {
	constructor(validator: Validator) {
		super(validator);
	}

	protected async _execute(input: GetInsurancePolicyInput): Promise<GetInsurancePolicyOutput> {
		throw new Error("Not yet implemented.");
	}
}
