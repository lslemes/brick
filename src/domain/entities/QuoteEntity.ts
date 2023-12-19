import Coverage from "../enums/Coverage";
import BaseEntity from "./BaseEntity";
import VehicleEntity from "./VehicleEntity";

export default interface QuoteEntity extends BaseEntity {
	vehicle: VehicleEntity;
	coverage: Coverage;
	price: number;
}
