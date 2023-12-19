import ProposalEntity from "../entities/ProposalEntity";

export default class UnsignedProposalError extends Error {
	constructor({ id }: ProposalEntity) {
		super(`Proposal ${id} has not been signed.`);
	}
}
