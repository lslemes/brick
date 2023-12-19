import AddVehicleToInsurancePolicyInput from "../domain/contracts/input/AddVehicleToInsurancePolicyInput";
import CancelledInsurancePolicyError from "../domain/errors/CancelledInsurancePolicyError";
import EquivalentQuoteExistsError from "../domain/errors/EquivalentQuoteExistsError";
import InactiveInsurancePolicyError from "../domain/errors/InactiveInsurancePolicyError";
import InsurancePolicyNotFoundError from "../domain/errors/InsurancePolicyNotFoundError";
import QuoteAlreadyExistsError from "../domain/errors/QuoteAlreadyExistsError";
import QuoteNotFoundError from "../domain/errors/QuoteNotFoundError";
import InsurancePolicyRepository from "../domain/repositories/InsurancePolicyRepository";
import QuoteRepository from "../domain/repositories/QuoteRepository";
import UseCase from "./UseCase";
import Validator from "./Validator";

export default class AddVehicleToInsurancePolicyUseCase extends UseCase<AddVehicleToInsurancePolicyInput, void> {
	constructor(
		private readonly insurancePolicyRepository: InsurancePolicyRepository,
		private readonly quoteRepository: QuoteRepository,
		validator: Validator,
	) {
		super(validator);
	}

	// TODO: allow insertion of multiple quotes
	protected async _execute({ quoteId, insurancePolicyId }: AddVehicleToInsurancePolicyInput): Promise<void> {
		const [quote, insurancePolicy] = await Promise.all([
			this.quoteRepository.findById(quoteId),
			this.insurancePolicyRepository.findById(insurancePolicyId),
		]);

		if (!quote) throw new QuoteNotFoundError(quoteId);
		if (!insurancePolicy) throw new InsurancePolicyNotFoundError(insurancePolicyId);
		if (insurancePolicy.cancelled) throw new CancelledInsurancePolicyError(insurancePolicyId);
		const now = new Date();
		if (now < insurancePolicy.start || now > insurancePolicy.end)
			throw new InactiveInsurancePolicyError(insurancePolicy);
		const quoteAlreadyExists = !!insurancePolicy.quotes.find((q) => q.id === quoteId);
		if (quoteAlreadyExists) throw new QuoteAlreadyExistsError(quoteId);
		const equivalentQuote = insurancePolicy.quotes.find(
			(q) => q.coverage === quote.coverage && q.vehicle.id === quote.vehicle.id,
		);
		if (equivalentQuote) throw new EquivalentQuoteExistsError(equivalentQuote);

		insurancePolicy.quotes.push(quote);
		await this.insurancePolicyRepository.update(insurancePolicyId, insurancePolicy);
	}
}
