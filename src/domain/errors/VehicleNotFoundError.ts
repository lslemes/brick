import VehicleEntity from "../entities/VehicleEntity";

export default class VehicleNotFoundError extends Error {
	constructor(id: VehicleEntity["id"]) {
		super(`Vehicle ${id} not found.`);
	}
}
