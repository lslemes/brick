import InsurancePolicyEntity from "../entities/InsurancePolicyEntity";

export default class InsurancePolicyNotFoundError extends Error {
	constructor(id: InsurancePolicyEntity["id"]) {
		super(`Insurance policy ${id} not found.`);
	}
}
