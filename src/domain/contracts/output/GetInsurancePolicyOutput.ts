import Coverage from "../../enums/Coverage";

export default interface GetInsurancePolicyOutput {
	id: string;
	quotes: {
		id: string;
		vehicle: {
			id: string;
			manufacturer: string;
			model: string;
			year: number;
			plate: string;
		};
		coverage: Coverage;
		price: number;
	}[];
	bills: {
		id: string;
		createdAt: Date;
		paid: boolean;
		due: Date;
		amount: number;
	}[];
	start: Date;
	end: Date;
	cancelled: boolean;
}
