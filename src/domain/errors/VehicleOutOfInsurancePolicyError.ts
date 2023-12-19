import InsurancePolicyEntity from "../entities/InsurancePolicyEntity";
import VehicleEntity from "../entities/VehicleEntity";

export default class VehicleOutOfInsurancePolicyError extends Error {
	constructor(vehicle: VehicleEntity, insurancePolicy: InsurancePolicyEntity) {
		super(`Vehicle ${vehicle.id} is not in insurance policy ${insurancePolicy.id}.`);
	}
}
