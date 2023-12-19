import InsurancePolicyEntity from "../entities/InsurancePolicyEntity";
import QuoteEntity from "../entities/QuoteEntity";
import VehicleEntity from "../entities/VehicleEntity";

export default interface QuoteFilter {
	quoteId?: {
		in: QuoteEntity["id"][];
	};
	vehicleId?: VehicleEntity["id"];
	insurancePolicyId?: InsurancePolicyEntity["id"];
}
