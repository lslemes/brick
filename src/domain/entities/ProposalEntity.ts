import ProposalStatus from "../enums/ProposalStatus";
import BaseEntity from "./BaseEntity";
import BillEntity from "./BillEntity";
import QuoteEntity from "./QuoteEntity";

export default interface ProposalEntity extends BaseEntity {
	quotes: QuoteEntity[];
	status: ProposalStatus;
	bill: BillEntity;
}
