import InsurancePolicyEntity from "../entities/InsurancePolicyEntity";

export default interface InsurancePolicyRepository {
	findById(id: InsurancePolicyEntity["id"]): Promise<InsurancePolicyEntity | null>;
	update(id: InsurancePolicyEntity["id"], insurancePolicy: Partial<InsurancePolicyEntity>): Promise<void>;
}
