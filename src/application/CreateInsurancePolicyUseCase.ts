import { randomUUID } from "crypto";
import CreateInsurancePolicyInput from "../domain/contracts/input/CreateInsurancePolicyInput";
import CreateInsurancePolicyOutput from "../domain/contracts/output/CreateInsurancePolicyOutput";
import ProposalStatus from "../domain/enums/ProposalStatus";
import ProposalNotFoundError from "../domain/errors/ProposalNotFoundError";
import UnpaidProposalError from "../domain/errors/UnpaidProposalError";
import UnsignedProposalError from "../domain/errors/UnsignedProposalError";
import InsurancePolicyRepository from "../domain/repositories/InsurancePolicyRepository";
import ProposalRepository from "../domain/repositories/ProposalRepository";
import UseCase from "./UseCase";
import Validator from "./Validator";

export default class CreateInsurancePolicyUseCase extends UseCase<
	CreateInsurancePolicyInput,
	CreateInsurancePolicyOutput
> {
	constructor(
		private readonly proposalRepository: ProposalRepository,
		private readonly insurancePolicyRepository: InsurancePolicyRepository,
		validator: Validator,
	) {
		super(validator);
	}

	protected async _execute({ proposalId }: CreateInsurancePolicyInput): Promise<CreateInsurancePolicyOutput> {
		const proposal = await this.proposalRepository.findById(proposalId);

		if (!proposal) throw new ProposalNotFoundError(proposalId);
		if (proposal.status !== ProposalStatus.SIGNED) throw new UnsignedProposalError(proposal);
		if (!proposal.bill.paid) throw new UnpaidProposalError(proposal);

		const now = new Date();
		const end = new Date();
		end.setFullYear(now.getFullYear() + 1);
		const insurancePolicy = await this.insurancePolicyRepository.create({
			bills: [proposal.bill],
			cancelled: false,
			start: now,
			end,
			createdAt: now,
			id: randomUUID(),
			quotes: proposal.quotes,
		});

		return { id: insurancePolicy.id };
	}
}
