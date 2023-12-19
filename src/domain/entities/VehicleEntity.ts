import BaseEntity from "./BaseEntity";
import InsurancePolicyEntity from "./InsurancePolicyEntity";

export default interface VehicleEntity extends BaseEntity {
	insurancePolicies: InsurancePolicyEntity[];
	manufacturer: string;
	model: string;
	year: number;
	plate: string;
}
