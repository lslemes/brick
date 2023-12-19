import InsurancePolicyEntity from "../entities/InsurancePolicyEntity";

export default class CancelledInsurancePolicyError extends Error {
	constructor({ id }: InsurancePolicyEntity) {
		super(`Insurance policy ${id} is cancelled.`);
	}
}
