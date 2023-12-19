import RemoveVehicleFromInsurancePolicyInput from "../domain/contracts/input/RemoveVehicleFromInsurancePolicyInput";
import RemoveVehicleFromInsurancePolicyOutput from "../domain/contracts/output/RemoveVehicleFromInsurancePolicyOutput";
import UseCase from "./UseCase";
import Validator from "./Validator";

export default class RemoveVehicleFromInsurancePolicyUseCase extends UseCase<
	RemoveVehicleFromInsurancePolicyInput,
	RemoveVehicleFromInsurancePolicyOutput
> {
	constructor(validator: Validator) {
		super(validator);
	}

	protected async _execute(
		input: RemoveVehicleFromInsurancePolicyInput,
	): Promise<RemoveVehicleFromInsurancePolicyOutput> {
		throw new Error("Not yet implemented.");
	}
}
