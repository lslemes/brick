import ProposalEntity from "../entities/ProposalEntity";

export default class UnpaidProposalError extends Error {
	constructor({ id }: ProposalEntity) {
		super(`Proposal ${id} has not been paid.`);
	}
}
