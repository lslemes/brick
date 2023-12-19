import InsurancePolicyEntity from "../../domain/entities/InsurancePolicyEntity";
import InsurancePolicyRepository from "../../domain/repositories/InsurancePolicyRepository";

export default class InsurancePolicyMockRepository implements InsurancePolicyRepository {
	findById(id: string): Promise<InsurancePolicyEntity | null> {
		throw new Error("Method not implemented.");
	}

	create(insurancePolicy: InsurancePolicyEntity): Promise<InsurancePolicyEntity> {
		throw new Error("Method not implemented.");
	}
}
