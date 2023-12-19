import BaseEntity from "./BaseEntity";
import BillEntity from "./BillEntity";
import QuoteEntity from "./QuoteEntity";

export default interface InsurancePolicyEntity extends BaseEntity {
	quotes: QuoteEntity[];
	bills: BillEntity[];
	start: Date;
	end: Date;
	cancelled: boolean;
}
