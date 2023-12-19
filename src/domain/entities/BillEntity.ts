import BaseEntity from "./BaseEntity";

export default interface BillEntity extends BaseEntity {
	paid: boolean;
	due: Date;
	amount: number;
}
