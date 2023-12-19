import ProposalEntity from "../../domain/entities/ProposalEntity";
import ProposalRepository from "../../domain/repositories/ProposalRepository";

export default class ProposalMockRepository implements ProposalRepository {
	findById(id: string): Promise<ProposalEntity | null> {
		throw new Error("Method not implemented.");
	}
}
