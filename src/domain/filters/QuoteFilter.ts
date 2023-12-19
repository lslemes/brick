import InsurancePolicyEntity from "../entities/InsurancePolicyEntity";
import VehicleEntity from "../entities/VehicleEntity";

export default interface QuoteFilter {
	vehicleId: VehicleEntity["id"];
	insurancePolicyId: InsurancePolicyEntity["id"];
}
