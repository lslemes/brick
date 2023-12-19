import GetInsurancePolicyInput from "../domain/contracts/input/GetInsurancePolicyInput";
import GetInsurancePolicyOutput from "../domain/contracts/output/GetInsurancePolicyOutput";
import InsurancePolicyNotFoundError from "../domain/errors/InsurancePolicyNotFoundError";
import InsurancePolicyRepository from "../domain/repositories/InsurancePolicyRepository";
import UseCase from "./UseCase";
import Validator from "./Validator";

export default class GetInsurancePolicyUseCase extends UseCase<GetInsurancePolicyInput, GetInsurancePolicyOutput> {
	constructor(
		private readonly insurancePolicyRepository: InsurancePolicyRepository,
		validator: Validator,
	) {
		super(validator);
	}

	protected async _execute({ insurancePolicyId }: GetInsurancePolicyInput): Promise<GetInsurancePolicyOutput> {
		const insurancePolicy = await this.insurancePolicyRepository.findById(insurancePolicyId);
		if (!insurancePolicy) throw new InsurancePolicyNotFoundError(insurancePolicyId);
		return {
			bills: insurancePolicy.bills.map((bill) => ({
				amount: bill.amount,
				createdAt: bill.createdAt,
				due: bill.due,
				id: bill.id,
				paid: bill.paid,
			})),
			cancelled: insurancePolicy.cancelled,
			end: insurancePolicy.end,
			id: insurancePolicy.id,
			quotes: insurancePolicy.quotes.map((quote) => ({
				coverage: quote.coverage,
				id: quote.id,
				price: quote.price,
				vehicle: {
					id: quote.vehicle.id,
					manufacturer: quote.vehicle.manufacturer,
					model: quote.vehicle.model,
					plate: quote.vehicle.plate,
					year: quote.vehicle.year,
				},
			})),
			start: insurancePolicy.start,
		};
	}
}
