import ProposalEntity from "../entities/ProposalEntity";

export default interface ProposalRepository {
	findById(id: ProposalEntity["id"]): Promise<ProposalEntity | null>;
}
