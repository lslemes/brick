import QuoteEntity from "../entities/QuoteEntity";

export default class EquivalentQuoteExistsError extends Error {
	constructor({ id, vehicle, coverage, price }: QuoteEntity) {
		super(
			`There is an equivalent quote ${id} covering ${coverage} for the vehicle ${vehicle.id} priced at ${price} for this insurance policy.`,
		);
	}
}
