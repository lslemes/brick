import InsurancePolicyEntity from "../entities/InsurancePolicyEntity";

export default interface InsurancePolicyRepository {
	findById(id: InsurancePolicyEntity["id"]): Promise<InsurancePolicyEntity | null>;
}
