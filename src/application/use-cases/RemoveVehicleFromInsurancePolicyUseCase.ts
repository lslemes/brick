import RemoveVehicleFromInsurancePolicyInput from "../../domain/contracts/input/RemoveVehicleFromInsurancePolicyInput";
import CancelledInsurancePolicyError from "../../domain/errors/CancelledInsurancePolicyError";
import InactiveInsurancePolicyError from "../../domain/errors/InactiveInsurancePolicyError";
import InsurancePolicyNotFoundError from "../../domain/errors/InsurancePolicyNotFoundError";
import VehicleNotFoundError from "../../domain/errors/VehicleNotFoundError";
import VehicleOutOfInsurancePolicyError from "../../domain/errors/VehicleOutOfInsurancePolicyError";
import InsurancePolicyRepository from "../../domain/repositories/InsurancePolicyRepository";
import QuoteRepository from "../../domain/repositories/QuoteRepository";
import VehicleRepository from "../../domain/repositories/VehicleRepository";
import TransactionManager from "../TransactionManager";
import UseCase from "../UseCase";
import Validator from "../Validator";

export default class RemoveVehicleFromInsurancePolicyUseCase extends UseCase<
	RemoveVehicleFromInsurancePolicyInput,
	void
> {
	constructor(
		private readonly transactionManager: TransactionManager,
		private readonly vehicleRepository: VehicleRepository,
		private readonly insurancePolicyRepository: InsurancePolicyRepository,
		private readonly quoteRepository: QuoteRepository,
		validator: Validator,
	) {
		super(validator);
	}

	protected async _execute({ vehicleId, insurancePolicyId }: RemoveVehicleFromInsurancePolicyInput): Promise<void> {
		const [vehicle, insurancePolicy, quotes] = await Promise.all([
			this.vehicleRepository.findById(vehicleId),
			this.insurancePolicyRepository.findById(insurancePolicyId),
			this.quoteRepository.findAll({ vehicleId, insurancePolicyId }),
		]);

		if (!vehicle) throw new VehicleNotFoundError(vehicleId);
		if (!insurancePolicy) throw new InsurancePolicyNotFoundError(insurancePolicyId);
		if (quotes.length === 0) throw new VehicleOutOfInsurancePolicyError(vehicle, insurancePolicy);
		if (insurancePolicy.cancelled) throw new CancelledInsurancePolicyError(insurancePolicy);
		const now = new Date();
		const inactiveInsurancePolicy = now < insurancePolicy.start || now > insurancePolicy.end;
		if (inactiveInsurancePolicy) throw new InactiveInsurancePolicyError(insurancePolicy);

		await this.transactionManager.runInTransaction(async (transaction) => {
			await Promise.all(quotes.map((quote) => this.quoteRepository.delete(quote.id, transaction)));
		});
	}
}
