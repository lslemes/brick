import ProposalEntity from "../entities/ProposalEntity";

export default class ProposalNotFoundError extends Error {
	constructor(id: ProposalEntity["id"]) {
		super(`Proposal ${id} not found.`);
	}
}
