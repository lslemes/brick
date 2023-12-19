import InsurancePolicyEntity from "../entities/InsurancePolicyEntity";

export default class InactiveInsurancePolicyError extends Error {
	constructor({ id, start, end }: InsurancePolicyEntity) {
		super(`Insurance policy ${id} starts at ${start} and ends at ${end}.`);
	}
}
