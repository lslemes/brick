import AddVehicleToInsurancePolicyInput from "../domain/contracts/input/AddVehicleToInsurancePolicyInput";
import CancelledInsurancePolicyError from "../domain/errors/CancelledInsurancePolicyError";
import EquivalentQuoteExistsError from "../domain/errors/EquivalentQuoteExistsError";
import InactiveInsurancePolicyError from "../domain/errors/InactiveInsurancePolicyError";
import InsurancePolicyNotFoundError from "../domain/errors/InsurancePolicyNotFoundError";
import QuoteAlreadyExistsError from "../domain/errors/QuoteAlreadyExistsError";
import QuoteNotFoundError from "../domain/errors/QuoteNotFoundError";
import QuotesNotFoundError from "../domain/errors/QuotesNotFoundError";
import VehicleNotFoundError from "../domain/errors/VehicleNotFoundError";
import InsurancePolicyRepository from "../domain/repositories/InsurancePolicyRepository";
import QuoteRepository from "../domain/repositories/QuoteRepository";
import VehicleRepository from "../domain/repositories/VehicleRepository";
import TransactionManager from "./TransactionManager";
import UseCase from "./UseCase";
import Validator from "./Validator";

export default class AddVehicleToInsurancePolicyUseCase extends UseCase<AddVehicleToInsurancePolicyInput, void> {
	constructor(
		private readonly transactionManager: TransactionManager,
		private readonly insurancePolicyRepository: InsurancePolicyRepository,
		private readonly quoteRepository: QuoteRepository,
		private readonly vehicleRepository: VehicleRepository,
		validator: Validator,
	) {
		super(validator);
	}

	protected async _execute({
		vehicleId,
		quoteIds,
		insurancePolicyId,
	}: AddVehicleToInsurancePolicyInput): Promise<void> {
		const quotesFilter = { quoteId: { in: quoteIds } };
		const [quotes, insurancePolicy, vehicle] = await Promise.all([
			this.quoteRepository.findAll(quotesFilter),
			this.insurancePolicyRepository.findById(insurancePolicyId),
			this.vehicleRepository.findById(vehicleId),
		]);

		if (quotes.length === 0) throw new QuotesNotFoundError(quotesFilter);
		const foundQuoteIds = new Set(quotes.map((quote) => quote.id));
		const notFoundQuoteIds = quoteIds.filter((quoteId) => !foundQuoteIds.has(quoteId));
		if (notFoundQuoteIds.length > 0) throw new QuoteNotFoundError(notFoundQuoteIds.join(", "));
		if (!insurancePolicy) throw new InsurancePolicyNotFoundError(insurancePolicyId);
		if (!vehicle) throw new VehicleNotFoundError(vehicleId);
		if (insurancePolicy.cancelled) throw new CancelledInsurancePolicyError(insurancePolicy);
		const now = new Date();
		const inactiveInsurancePolicy = now < insurancePolicy.start || now > insurancePolicy.end;
		if (inactiveInsurancePolicy) throw new InactiveInsurancePolicyError(insurancePolicy);
		const quoteAlreadyExists = insurancePolicy.quotes.find((quote) => quoteIds.includes(quote.id));
		if (quoteAlreadyExists) throw new QuoteAlreadyExistsError(quoteAlreadyExists);
		const equivalentQuote = insurancePolicy.quotes.find((quote) =>
			quotes.find((q) => q.coverage === quote.coverage && q.vehicle.id === quote.vehicle.id),
		);
		if (equivalentQuote) throw new EquivalentQuoteExistsError(equivalentQuote);

		await this.transactionManager.runInTransaction(async (transaction) => {
			await Promise.all(quotes.map((quote) => this.quoteRepository.create(quote, transaction)));
		});
	}
}
