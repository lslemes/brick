import InsurancePolicyEntity from "../entities/InsurancePolicyEntity";

export default class CancelledInsurancePolicyError extends Error {
	constructor(id: InsurancePolicyEntity["id"]) {
		super(`Insurance policy ${id} is cancelled.`);
	}
}
