import AddVehicleToInsurancePolicyInput from "../domain/contracts/input/AddVehicleToInsurancePolicyInput";
import AddVehicleToInsurancePolicyOutput from "../domain/contracts/output/AddVehicleToInsurancePolicyOutput";
import UseCase from "./UseCase";
import Validator from "./Validator";

export default class AddVehicleToInsurancePolicyUseCase extends UseCase<
	AddVehicleToInsurancePolicyInput,
	AddVehicleToInsurancePolicyOutput
> {
	constructor(validator: Validator) {
		super(validator);
	}

	protected async _execute(input: AddVehicleToInsurancePolicyInput): Promise<AddVehicleToInsurancePolicyOutput> {
		throw new Error("Not yet implemented.");
	}
}
